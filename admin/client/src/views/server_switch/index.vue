<template>
    <div><el-row>
        <el-col :span="12">
            <div style="text-align: center; padding-top: 10px;">服务开关</div>
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

                <el-table-column  label="服务开关" >
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.switch" @change="handleChange(scope)">
                            <el-radio :label="0" >关闭</el-radio>
                            <el-radio :label="1" >关闭入口</el-radio>
                            <el-radio :label="2">白名单</el-radio>
                            <el-radio :label="3">开启</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

        <el-col :span="12">
            <div style="text-align: center; padding-top: 10px">白名单</div>
            
            <div style="text-align: center; padding-top: 10px; padding-bottom: 10px">
                <el-row>
                <el-col :span="6">
                    <el-input v-model="addPlayerId" placeholder="请输入玩家ID"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addWhite">新增白名单</el-button>
                </el-col>
            </el-row>
            </div>
            <el-table border stripe :data="whiteList" style="width: 100%" height="650">
                <el-table-column  label="玩家ID" >
                    <template slot-scope="scope">
                        {{ scope.row.player_id }}
                    </template>
                </el-table-column>
                <el-table-column  label="操作项" >
                    <template slot-scope="scope">
                        <el-button type="warning" @click="delWhite(scope.row.player_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

    </el-row></div>
</template>

<script>

let switchNameMap = {
    [0] : "关闭",
    [1] : "关闭入口",
    [2] : "白名单",
    [3] : "开启",
}

import { getInfos, changeSwitch, getWhiteInfos, addWhite, delWhite } from '@/api/server_switch'

export default {
    data() {
        return {
            serverInfoList : [],
            whiteList : [],
            addPlayerId : null,
        }
    },

    created() {
        this.getServerInfos()
        this.getWhiteInfos()
    },
   
    methods: {
       async getServerInfos() {
            let res = await getInfos()
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
            let res = await changeSwitch({
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
            let switchNum = Number(scope.row.switch)
            this.$confirm("您确定要调整为" + switchNameMap[switchNum] + "状态吗？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.changeSwitch(scope.row.cluster_name, switchNum).then((result)=>{
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
       },

       async getWhiteInfos() {
            let res = await getWhiteInfos()
            let list = []
            if (Array.isArray(res.data)) {
                for (let i = 0; i < res.data.length; i++) {
                    let playerId = res.data[i]
                    list.push({player_id : playerId})
                }
            }
            list.sort(function(a,b) {
                return b.player_id - a.player_id
            })
            this.whiteList = list
       },

       async addWhite() {
            let playerId = Number(this.addPlayerId)
            if (playerId == NaN) {
                this.$message({
                    type: 'error',
                    message: '参数错误'
                });
                return;
            }
            let res = await addWhite({player_id : playerId})
            let result = res.data.result
            if (result == true) {
                this.whiteList.push({player_id : playerId})
                this.whiteList.sort(function(a,b) {
                    return b.player_id - a.player_id
                })
                this.$message({
                    type: 'success',
                    message: '添加成功'
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '添加失败'
                });
            }
       },

       async delWhite(playerId) {
            let res = await delWhite({player_id : playerId})
            let result = res.data.result
            if (result == true) {
                for (let i = 0; i < this.whiteList.length; i++) {
                    let one = this.whiteList[i]
                    if (one.player_id == playerId) {
                        this.whiteList.splice(i, 1)
                        break
                    }
                }
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '删除失败'
                });
            }
       }
    }
}
</script>