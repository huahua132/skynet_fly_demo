<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const colorList = [
  '#70DB93', //海蓝
  '#5C3317', //巧克力色
  '#9F5F9F', //蓝紫色 
  '#B5A642', //黄铜色
  '#8C7853', //青铜色
  '#A67D3D', //2号青铜色
  '#5F9F9F', //士官服蓝色
  '#D98719', //冷铜色
  '#B87333', //铜色
  '#FF7F00', //珊瑚红
  '#42426F', //紫蓝色
  '#2F4F2F', //深绿
  '#4A766E', //深铜绿色
  '#4F4F2F', //深橄榄绿
  '#9932CD', //深兰花色
  '#871F78', //深紫色
  '#6B238E', //深石板蓝
  '#2F4F4F', //深铅灰色
  '#97694F', //深棕褐色
  '#7093DB', //深绿松石色
  '#855E42', //暗木色
  '#545454', //淡灰色
  '#856363', //土灰玫瑰红色
  '#238E23', //森林绿
  '#CD7F32', //金色
  '#527F76', //铜绿色
  '#93DB70', //青黄色
  '#215E21', //猎人绿
  '#4E2F2F', //印度红
  '#C0D9D9', //浅蓝色
  '#9F9F5F', //土黄色 
  '#A8A8A8',//浅灰色
  '#8F8FBD', //浅钢蓝色
  '#E9C2A6',//浅木色
  '#32CD32',//石灰绿色
  '#E47833',//桔黄色
  '#8E236B',//褐红色
  '#32CD99',
  '#3232CD',
  '#6B8E23',
  '#EAEAAE',
  '#9370DB',
  '#426F42',
  '#7F00FF',
  '#7FFF00',
  '#70DBDB',
  '#DB7093',
  '#A68064',
  '#2F2F4F',
  '#23238E',
  '#4D4DFF',
  '#FF6EC7',
  '#EBC79E',
  '#CFB53B',
  '#FF7F00',
  '#FF2400',
  '#DB70DB',
  '#8FBC8F',
  '#BC8F8F',
  '#EAADEA',
  '#D9D9F3',
  '#5959AB',
  '#6F4242',
  '#BC1717',
  '#238E68',
  '#6B4226',
  '#8E6B23',
  '#E6E8FA',
  '#3299CC',
  '#007FFF',
  '#FF1CAE',
  '#00FF7F',
  '#236B8E',
  '#38B0DE',
  '#D8BFD8',
  '#ADEAEA',
  '#5C4033',
  '#CDCDCD',
  '#4F2F4F',
  '#CC3299',
  '#D8D8BF',
  '#99CC32',
]

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log("handler>>>",val)
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resetChart() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.chart = echarts.init(this.$el, 'macarons')
    },

    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },

    setOptions({ time, servers } = {}) {
      if (!time || time.length <= 0) {return}
      this.resetChart()
      console.log("ddd",servers)
      let option = {
        xAxis: {
          data: time,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: []
        },
        series: [],
      }
      let index = 0
      for (let key in servers) {
        let value = servers[key]
        let color = colorList[index]

        option.legend.data.push(key)
        option.series.push({
          name : key,
          smooth: true,
          type: 'line',
          data: value,
          animationDuration: 2800,
          animationEasing: 'quadraticOut',
          itemStyle : {
            normal: {
              color: color,
              lineStyle: {
                color: color,
                width: 2
              },
              areaStyle: {
                color: color
              }
            }
          }
        })
        index++
        index %= colorList.length
      }
      this.chart.setOption(option)
    }
  }
}
</script>
