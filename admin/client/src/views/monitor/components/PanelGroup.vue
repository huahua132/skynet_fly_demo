<template>
    <div>
        <el-select v-model="pre_day" placeholder="请选择哪天">
            <el-option v-for="item in dayOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <el-select v-model="cluster" placeholder="请选择集群服务节点">
            <el-option v-for="(item, index) in clusterList" :key="index" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-select v-model="server" placeholder="请选择服务">
            <el-option v-for="(item, index) in serverList" :key="index" :label="item" :value="item">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { get_cluster_list, getInfo } from '@/api/monitor'

const day_options = [
    {value : 0, label : "当天"},
    {value : 1, label : "昨天"},
    {value : 2, label : "前天"},
    {value : 3, label : "前第三天"},
    {value : 4, label : "前第四天"},
    {value : 5, label : "前第五天"},
    {value : 6, label : "前第六天"},
    {value : 7, label : "前第七天"},
]

export default {
    data() {
        return {
            pre_day : null,
            cluster : null,
            server : null,
            dayOption : day_options,
            clusterList:[],
            serverList:[],
            serverMap:{},
        }
    },

    created() {
        this.getClusterList()
    },

    watch: {
        cluster : {
            handler(val) {
                this.serverList = this.serverMap[val]
                this.handleSetLine()
            }
        },
        server : {
            handler(val) {
                this.handleSetLine()
            }
        },
        pre_day : {
            handler(val) {
                this.handleSetLine()
            }
        },
    },
   
    methods: {
        async getClusterList() {
            const res = await get_cluster_list()
            
            this.clusterList = res.data.cluster_list
            this.clusterList.sort(function(a,b) {
                return a.localeCompare(b)
            })
            
            this.serverMap = res.data.server_map
            for (let key in this.serverMap) {
                let list = this.serverMap[key]
                list.sort(function(a,b) {
                    if (a == 'total'){
                        return -1
                    } else {
                        return a.localeCompare(b)
                    }
                })
            }
        },

        async getInfo() {
            const res = await getInfo(this.cluster, this.server, this.pre_day)
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
            },this.cluster,this.server,this.pre_day)
        },

        handleSetLine() {
            if (!this.cluster || !this.server){
                return
            }
            this.getInfo()
        },
    }
}
</script>