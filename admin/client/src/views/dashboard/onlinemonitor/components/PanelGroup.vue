<template>
    <div>
        <el-select v-model="svr_name" placeholder="请选择服务名">
            <el-option v-for="(item, idx) in svrNameList" :key="idx" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-select v-model="tag" placeholder="请选择数据标签">
            <el-option v-for="(item, idx) in tagList" :key="idx" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-select v-model="date" placeholder="请选择日期">
            <el-option v-for="(item, idx) in dayOption" :key="idx" :label="item" :value="item">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { getNodeMap, getOnlineRecord } from '@/api/dashboard'


export default {
    data() {
        return {
            date : 'cur',
            svr_name : "hallserver",
            tag : "online",
            dayOption : [],
            svrNameList:[],
            tagList:[],
            nodeMap:{},
        }
    },

    created() {
        this.getsvrNameList()
        this.handleSetLine()
    },

    watch: {
        svr_name : {
            handler(val) {
                this.setTagList()
                this.handleSetLine()
            }
        },
        tag : {
            handler(val) {
                this.setDateList()
                this.handleSetLine()
            }
        },
        date : {
            handler(val) {
                this.handleSetLine()
            }
        },
    },
   
    methods: {
        setDateList() {
            let ishave_date = false
            if (this.nodeMap[this.svr_name] && this.nodeMap[this.svr_name][this.tag]) {
                let date_map = this.nodeMap[this.svr_name][this.tag]
                this.dayOption = []
                for (let d in date_map) {
                    this.dayOption.push(d)
                    if (this.date == d) {
                        ishave_date = true
                    }
                }
            }

            this.dayOption.sort(function(a, b) {
                if (a == "cur") {
                    return -1
                }
                if (b == "cur") {
                    return 1
                }

                let na = Number(a)
                let nb = Number(b)
                if (na > nb) {
                    return -1
                } else if (na < nb) {
                    return 1
                } else {
                    return 0
                }
            })

            if (!ishave_date) {
                this.date = this.dayOption[0]
            }
        },

        setTagList() {
            if (this.nodeMap[this.svr_name]) {
                let tag_map = this.nodeMap[this.svr_name]
                this.tagList = []
                let ishave_tag = false
                for (let tag in tag_map) {
                    this.tagList.push(tag)
                    if (tag == this.tag) {
                        ishave_tag = true
                    }
                }
                this.tagList.sort()
                if (!ishave_tag) {
                    if (this.tagList.length > 0) {
                        this.tag = this.tagList[0]
                    } else {
                        this.tag = ""
                    }
                }
            }
           
            this.setDateList()
        },

        async getsvrNameList() {
            const res = await getNodeMap()
            this.svrNameList = []
            this.nodeMap = res.data.node_map
            for (let svrName in this.nodeMap) {
                this.svrNameList.push(svrName)
            }
            this.setTagList()
        },

        async getOnlineRecord() {
            const res = await getOnlineRecord(this.svr_name, this.date, this.tag)
            let data = res.data
            if (data.result != "OK") {
                this.$emit('handleNotData')
                return
            }
            data = data.data

            let timeList = []
            let opts = {}
            for (let i = 0; i < data.length; i++) {
                let value = data[i]
                for (let time in value) {
                    timeList.push(time)
                    let opt_info = data[i][time]
                    for (let opt in opt_info) {
                        let num = opt_info[opt]
                        if (!opts[opt]) {
                            opts[opt] = []
                        }
                        opts[opt].push(num)
                    }
                }
            }
            this.$emit('handleSetLineChartData',{
                time : timeList,
                opts : opts
            },this.svr_name,this.pre_day)
        },

        handleSetLine() {
            if (!this.svr_name || !this.tag || !this.date){
                return
            }
            this.getOnlineRecord()
        },
    }
}
</script>