<template>
    <div>
        <el-descriptions title="服务实时信息" :column="4" border>
            <el-descriptions-item label="运行时长" >{{ serverRunTime }}</el-descriptions-item>
            <el-descriptions-item label="模块名称"> {{ moduleName }}</el-descriptions-item>
            <el-descriptions-item label="启动时间"> {{ launchTime }}</el-descriptions-item>
            <el-descriptions-item label="版本号"> {{ version }}</el-descriptions-item>
            <el-descriptions-item label="启动下标"> {{ index }}</el-descriptions-item>
            <el-descriptions-item label="服务状态"> {{ serverState }}</el-descriptions-item>
            <el-descriptions-item label="退出剩余时间"> {{ exitRemainTime }}</el-descriptions-item>
        </el-descriptions>

        <el-row :gutter="20">
            <el-col :span="6">
                <h3 style="text-align: center;">访问者列表</h3>
                <el-table v-if="sourceList" :data="sourceList" height="250" border style="width: 100%;">
                    <el-table-column prop="name" label="服务名称" border style="width: 50%;"></el-table-column>
                    <el-table-column prop="address" label="服务地址" border style="width: 50%;"></el-table-column>
                </el-table>
            </el-col>

            <el-col :span="4">
                <h3 style="text-align: center;">弱访问者列表</h3>
                <el-table v-if="weekVisitorList" :data="weekVisitorList" height="250" border style="width: 100%;">
                    <el-table-column prop="name" label="服务名称" border style="width: 100%;"></el-table-column>
                </el-table>
            </el-col>

            <el-col :span="14">
                <h3 style="text-align: center;">访问列表</h3>
                <el-table v-if="needVisitorList" :data="needVisitorList" height="250" border style="width: 100%;">
                    <el-table-column prop="name" label="服务名称" width="180"></el-table-column>
                    <el-table-column prop="idsList" label="服务地址列表" border style="width: 75%;"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { serverinfo } from '@/api/monitor'

export default {
    props: {
    cluster: {
        type: String,
        default: ''
    },
    server: {
        type:String,
        default: ''
    }
  },

    data() {
        return {
            run_time : null,
            module_info : null,
            server_state : null,
            exit_remain_time : 0,
            sourceList : [],
            weekVisitorList : [],
            needVisitorList : [],
        }
    },

    computed: {
        serverRunTime() {
            let day = Math.floor(this.run_time / 86400)
            let remain = this.run_time % 86400
            let hour = Math.floor(remain / 3600)
            remain = remain % 3600
            let min = Math.floor(remain / 60)
            return day + ' 天 ' + hour + ' 小时 ' + min + ' 分钟 '
        },
        moduleName() {
            if (!this.module_info) {
                return "普通skynet服务"
            } else {
                return this.module_info.module_name
            }
        },
        launchTime() {
            if (!this.module_info) {
                return "没有记录"
            } else {
                return this.module_info.launch_date
            }
        },
        version() {
            if (!this.module_info) {
                return "没有"
            } else {
                return this.module_info.version
            }
        },
        index() {
            if (!this.module_info) {
                return "没有"
            } else {
                return this.module_info.index
            }
        },
        serverState() {
            if (!this.server_state) {
                return "没有"
            }
            return this.server_state
        },
        exitRemainTime() {
            if (!this.serverState) {
                return "不能退出"
            }
            if (this.serverState != "exited") {
                return "还没退出"
            }

            return this.exit_remain_time
        },
    },

    watch: {
        cluster: {
            handler(val) {
                
                this.getServerInfo()
            }
        },
        server: {
            handler(val) {
                this.getServerInfo()
            }
        }
    },

    methods: {
        async getServerInfo() {
            console.log("serverInfo 1",this.cluster,this.server)
            if (this.cluster == '' || this.server == '') {
                return
            }
            console.log("serverInfo 2",this.cluster,this.server)
            const res = await serverinfo(this.cluster,this.server)
            this.run_time = res.data.run_time
            if (res.data.server_info && res.data.server_info.hot_container) {
                let hot_container = res.data.server_info.hot_container

                this.module_info = hot_container.module_info
                this.server_state = hot_container.server_state
                this.exit_remain_time = hot_container.exit_remain_time
                let source_map = hot_container.source_map
                //来访者列表
                this.sourceList = []
                if (source_map) {
                    for(let address in source_map) {
                        let name = source_map[address]
                        this.sourceList.push({address : address, name : name})
                    }
                }
                
                //弱访问者
                this.weekVisitorList = []
                let week_visitor_map = hot_container.week_visitor_map
                if (week_visitor_map) {
                    for (let name in week_visitor_map) {
                        this.weekVisitorList.push({name : name})
                    }
                }

                //访问列表
                this.needVisitorList = []
                let need_visitor_map = hot_container.need_visitor_map
                if (need_visitor_map) {
                    for (let name in need_visitor_map) {
                        let idsList = need_visitor_map[name]
                        let idsListStr = ""
                        for (let i = 0; i < idsList.length; i++) {
                            idsListStr += '['
                            for (let j = 0; j < idsList[i].length; j++) {
                                idsListStr += idsList[i][j]
                                if (j < idsList[i].length - 1) {
                                    idsListStr += ','
                                }
                            }
                            idsListStr += ']'
                        }
                        this.needVisitorList.push({name : name,idsList : idsListStr})
                    }
                }
            } else {
                this.module_info = null
                this.server_state = null
                this.exit_remain_time = 0
                this.sourceList = []
                this.weekVisitorList = []
                this.needVisitorList = []
            }
            
            console.log("serverInfo 3",this.cluster,this.server,res)
        }
    }
}
</script>