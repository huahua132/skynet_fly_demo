<template>
    <div>
        <el-select v-model="pre_day" placeholder="请选择哪天">
            <el-option v-for="item in dayOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>

        <div style="white-space: pre-wrap;">{{context}}</div>
    </div>
</template>

<script>
import { getInfo } from '@/api/warnlog'

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
            dayOption : day_options,
            context : "",
        }
    },

    watch: {
        pre_day : {
            handler(val) {
                this.handleSetLine()
            }
        },
    },
   
    methods: {
        async getInfo() {
            const res = await getInfo(this.pre_day)
            let data = res.data
            console.log("getInfo>> ",data)
            if (data.result != "OK") {
                return
            }
            this.context = data.context
        },

        handleSetLine() {
            this.getInfo()
        },
    }
}
</script>