<template>
    <div class=".monitor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData" @handleNotData="handleNotData" />
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" :is-notdata = "isNotData" />
        </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from '@/components/LineChart'

export default {
    components: {
        PanelGroup,
        LineChart,
    },
    data() {
        return {
            lineChartData: {},
            cluster : null,
            server : null,
            isNotData : true,
            isCurDay : false,
        }
    },

    methods: {
        handleSetLineChartData(data,cluster,server,day) {
            console.log("handleSetLineChartData:",data,cluster,server)
            this.lineChartData = data
            this.cluster = cluster
            this.server = server
            this.isNotData = false
            if (day == 0) {
                this.isCurDay = true
            } else {
                this.isCurDay = false
            }
        },

        //没有数据
        handleNotData() {
            this.isNotData = true
        }
    }
}
</script>

<style lang="scss" scoped>
.monitor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
}

</style>
