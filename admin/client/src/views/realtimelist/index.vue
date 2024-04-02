<template>
    <div>
        <el-select v-model="cluster" placeholder="请选择集群服务节点">
            <el-option v-for="(item, index) in clusterList" :key="index" :label="item" :value="item">
            </el-option>
        </el-select>

        <el-table v-if="infoList" :data="infoList" border style="width: 100%; height: 100%;" :default-sort = "{prop: 'server_id', order: 'descending'}">
            <el-table-column prop="server_id" label="服务地址" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="name" label="服务名称" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="mqlen" label="消息队列长度" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="task" label="任务数量" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="mem" label="内存使用(kb)" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="cpu" label="cpu累计占用时间" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="message" label="消息处理数量" sortable border style="width: 12%;"></el-table-column>
            <el-table-column prop="cmem" label="c内存使用(kb)" sortable border style="width: 12%;"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { get_cluster_list, getInfo } from '@/api/realtimelist'

export default {
    data() {
        return {
            cluster : null,
            clusterList:[],
            infoList : [],
        }
    },

    created() {
        this.getClusterList()
    },

    watch: {
        cluster : {
            handler(val) {
                this.handleSetLine()
            }
        },
    },
   
    methods: {
        async getClusterList() {
            const res = await get_cluster_list()
            console.log("getClusterList>>>",res)
            this.clusterList = res.data.cluster_list
            this.serverMap = res.data.server_map
        },

        async getInfo() {
            const res = await getInfo(this.cluster)
            let data = res.data
            console.log("getInfo>> ",data)
            let total_info = {}
            this.infoList = []
            for (let key in data) {
                let valueInfo = data[key]
                for (let k in valueInfo) {
                    if (!total_info[k]) {
                        total_info[k] = 0
                    }
                    total_info[k] += valueInfo[k]
                }
                valueInfo.server_id = key
                this.infoList.push(valueInfo)
            }
            total_info.name = "汇总"
            total_info.server_id = 'total'
            this.infoList.push(total_info)
        },

        handleSetLine() {
            if (!this.cluster){
                return
            }
            this.getInfo()
        },
    }
}
</script>