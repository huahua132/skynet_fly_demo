<template>
    <div class=".onlinemonitor-container">
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
            svr_name : null,
            isNotData : true,
            isCurDay : false,
        }
    },

    methods: {
        handleSetLineChartData(data,svr_name,day) {
            console.log("handleSetLineChartData:",data,svr_name)
            this.lineChartData = data
            this.svr_name = svr_name
            this.isNotData = false
            if (day == 0) {
                this.isCurDay = true
            } else {
                this.isCurDay = false
            }
        },

        //没有数据
        handleNotData() {
            console.log("没有数据>>>>>")
            this.isNotData = true
        }
    }
}
</script>

<style lang="scss" scoped>
.onlinemonitor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
}

</style>
