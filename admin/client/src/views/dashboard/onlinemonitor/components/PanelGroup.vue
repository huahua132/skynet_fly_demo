<template>
    <div>
        <el-select v-model="pre_day" placeholder="请选择哪天">
            <el-option v-for="item in dayOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <el-select v-model="svr_name" placeholder="请选择服务名">
            <el-option v-for="(item, index) in svrNameList" :key="index" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-select v-model="tag" placeholder="请选择数据标签">
            <el-option v-for="(item, index) in tagList" :key="index" :label="item" :value="item">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import { getNodeMap, getOnlineRecord } from '@/api/dashboard'

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
            pre_day : 0,
            svr_name : "hallserver",
            tag : "online",
            dayOption : day_options,
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
                this.setTagList(val)
                this.handleSetLine()
            }
        },
        tag : {
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
        setTagList(svr_name) {
            if (this.nodeMap[svr_name]) {
                let tag_map = this.nodeMap[svr_name]
                this.tagList = []
                for (let tag in tag_map) {
                    this.tagList.push(tag)
                }
            }
        },

        async getsvrNameList() {
            const res = await getNodeMap()
            console.log("getsvrNameList>>>",res)
            this.svrNameList = []
            this.nodeMap = res.data.node_map
            for (let svrName in this.nodeMap) {
                this.svrNameList.push(svrName)
            }
            this.setTagList(this.svr_name)
        },

        async getOnlineRecord() {
            const res = await getOnlineRecord(this.svr_name, this.pre_day, this.tag)
            let data = res.data
            console.log("getOnlineRecord>> ",data)
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

            console.log("opts:",opts)
            this.$emit('handleSetLineChartData',{
                time : timeList,
                opts : opts
            },this.svr_name,this.pre_day)
        },

        handleSetLine() {
            if (!this.svr_name || !this.tag){
                return
            }
            this.getOnlineRecord()
        },
    }
}
</script>