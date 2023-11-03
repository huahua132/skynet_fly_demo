<template>
    <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="(cluster,index) in clusterList" :key="index">
            <div class="card-panel" @click="handleSetLineChartData(cluster)">
                <div class="card-panel_wrapper card-panel_hover">
                    <div class="card-panel-text">
                        {{cluster}}
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
const cluster_list = ['chinese_chess:1','chinese_chess:2']

const lineChartData = {
    ['chinese_chess:1']: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    ['chinese_chess:2']: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
}

export default {
    data() {
        return {
            clusterList:cluster_list
        }
    },

    methods: {
        handleSetLineChartData(type) {
            this.$emit('handleSetLineChartData', lineChartData[type])
        }
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