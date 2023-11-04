<template>
    <div>
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="(cluster,index) in clusterList" :key="index">
                <div class="card-panel" @click="setCluterType(cluster)">
                    <div class="card-panel_wrapper card-panel_hover">
                        <div class="card-panel-text">
                            {{cluster}}
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="(option,index) in optionList" :key="index">
                <div class="card-panel" @click="setOptionType(option)">
                    <div class="card-panel_wrapper card-panel_hover">
                        <div class="card-panel-text">
                            {{option}}
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>   
</template>

<script>
import { get_cluster_list, getInfo } from '@/api/monitor'
const option_list = ['mem','task','mqlen','cpu','message']

export default {
    data() {
        return {
            cluster : null,
            option : null,
            clusterList:[],
            optionList:option_list,
            lineChartData : {},
        }
    },

    created() {
        this.getClusterList()
    },
   
    methods: {
        async getClusterList() {
            const res = await get_cluster_list()
            this.clusterList = res.data
            
        },

        async getInfo() {
            const res = await getInfo(this.cluster, 0)
            let data = res.data
            if (data.result != "OK") {
                return
            }
            data = data.data
            console.log(data)

            let timeList = []
            let servers = []
            for (let i = 0; i < data.length; i++) {
                let value = data[i]
                for (let time in value) {
                    timeList.push(time)
                    let one_server = data[i][time]
                    for (let server in one_server) {
                        let opt_info = one_server[server]
                        for (let opt in opt_info) {
                            let num = opt_info[opt]
                            if (!servers[opt]) {
                                servers[opt] = {
                                    time : timeList,
                                    servers : {}
                                }
                            }
                            if (!servers[opt].servers[server]) {
                                servers[opt].servers[server] = []
                            }
                            servers[opt].servers[server].push(num)
                        }
                    }
                }
            }

            console.log("servers:",servers)
            this.lineChartData[this.cluster] = servers
        },

        handleSetLine() {
            if (!this.cluster || !this.option){
                return
            }
            this.getInfo()
            this.$emit('handleSetLineChartData',this.lineChartData[this.cluster][this.option])
        },

        setCluterType(cluster) {
            this.cluster = cluster
            this.handleSetLine()
        },

        setOptionType(option) {
            this.option = option
            this.handleSetLine()
        },
    }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
        .card-panel_wrapper {
            color: #fff;
            float: none !important;
            width: 100%;
            height: 100%;
            margin: 0 !important;
        }

        .card-panel_hover {
            background: #40c9c6;
        }
    }
    .card-panel-text {
        line-height: 80px;
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
        font-size: 35px;
    }
  }
}

</style>