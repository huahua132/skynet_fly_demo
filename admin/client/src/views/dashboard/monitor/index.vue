<template>
    <div class="dashboard-monitor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" />
        </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

export default {
    name: 'DashboardMonitor',
    components: {
        PanelGroup,
        LineChart,
    },
    data() {
        return {
            lineChartData: {}
        }
    },

    methods: {
        handleSetLineChartData(data) {
            console.log("handleSetLineChartData:",data)
            this.lineChartData = data
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
