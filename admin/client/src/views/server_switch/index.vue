<template>
        <div>
            <el-table border stripe :data="serverInfoList" style="width: 100%" height="650">
                <el-table-column  label="集群名称" width="150" >
                    <template slot-scope="scope">
                        {{ scope.row.cluster_name }}
                    </template>
                </el-table-column>

                <el-table-column  label="服务状态" width="150" >
                    <template slot-scope="scope">
                        {{ parseStatus(scope.row.status) }}
                    </template>
                </el-table-column>

                <el-table-column  label="服务开关" width="300" >
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.switch" @change="handleChange(scope)">
                            <el-radio :label="0" >关闭</el-radio>
                            <el-radio :label="1">白名单</el-radio>
                            <el-radio :label="2">开启</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
</template>

<script>

let switchNameMap = {
    [0] : "关闭",
    [1] : "白名单",
    [2] : "开启",
}

import { getInfos, change_switch } from '@/api/server_switch'

export default {
    data() {
        return {
            serverInfoList : []
        }
    },

    created() {
        this.getServerInfos()
    },
   
    methods: {
       async getServerInfos() {
            let res = await getInfos()
            console.log("getServerInfos >>> ", res)
            let list = []
            for (let key in res.data) {
                let info = res.data[key]
                info.preVal = info.switch
                list.push(info)
            }

            list.sort(function(a,b) {
                return a.cluster_name - b.cluster_name
            })
            this.serverInfoList = list
       },

       async changeSwitch(cluster_name, switchVal) {
            let res = await change_switch({
                cluster_name : cluster_name,
                switch : switchVal,
            })
            let result = res.data.result
            return result
       },

       parseStatus(status) {
            if (status == 0) {
                return "未启动"
            } else {
                return "已启动"
            }
       },

        handleChange(scope) {
            console.log("change val : ", scope.row.switch)
            let switchNum = Number(scope.row.switch)
            this.$confirm("您确定要调整为" + switchNameMap[switchNum] + "状态吗？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.changeSwitch(scope.row.cluster_name, switchNum).then((result)=>{
                    console.log("result >>> ", result)
                    if (result == true) {
                        scope.row.preVal = switchNum
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                    } else {
                        scope.row.switch = scope.row.preVal
                        this.$message({
                            type: 'info',
                            message: '操作失败'
                        });         
                    }
                }).catch(()=>{
                    scope.row.switch = scope.row.preVal
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });   
                })
            }).catch(() => {
                scope.row.switch = scope.row.preVal
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
       }
    }
}
</script>