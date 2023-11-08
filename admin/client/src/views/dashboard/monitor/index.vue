<template>
    <div class="dashboard-monitor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" />
        </el-row>
        
        <el-row>
            <server-info :cluster="cluster" :server="server">
            </server-info>
        </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import ServerInfo from './components/ServerInfo'

export default {
    name: 'DashboardMonitor',
    components: {
        PanelGroup,
        LineChart,
        ServerInfo,
    },
    data() {
        return {
            lineChartData: {},
            cluster : null,
            server : null,
        }
    },

    methods: {
        handleSetLineChartData(data,cluster,server) {
            console.log("handleSetLineChartData:",data,cluster,server)
            this.lineChartData = data
            this.cluster = cluster
            this.server = server
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-monitor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
}

</style>
