<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8"><div>
                <el-select v-model="opt_cmd_name" placeholder="请选择命令">
                    <el-option
                        v-for="item in gm_cmd_list"
                        :key="item.cmd_name"
                        :label="item.cmd_name"
                        :value="item.cmd_name">
                    </el-option>
                </el-select>
                <el-input v-model="player_id" placeholder="请输入玩家ID">{{ player_id }}</el-input>
                <el-input v-model="arg1" placeholder="请输入参数1">{{ arg1 }}</el-input>
                <el-input v-model="arg2" placeholder="请输入参数2">{{ arg2 }}</el-input>
                <el-input v-model="arg3" placeholder="请输入参数3">{{ arg3 }}</el-input>
                <el-input v-model="arg4" placeholder="请输入参数4">{{ arg4 }}</el-input>
                <el-input v-model="arg5" placeholder="请输入参数5">{{ arg5 }}</el-input>
                <el-button type="primary" @click="handleExecute()">执行</el-button>
                <div>
                    <vue-json-pretty :data="result" />
                </div>
            </div></el-col>
            
            <el-col :span="16"><div>
                <el-row :gutter="20">
                    <el-col :span="8"><div>
                        <el-input v-model="find_name" placeholder="请输入命令查询">{{ find_name }}</el-input>
                    </div></el-col>
                    <el-col :span="8"><div>
                        <el-button type="primary" @click="handleSelect">查询</el-button>
                    </div></el-col>
                </el-row>
                
                <el-table :data="gm_cmd_list" stripe style="width: 100%;margin-top:30px;" border>
                    <el-table-column align="left" label="命令名称" width="300px">
                        <template slot-scope="scope">
                        {{ scope.row.cmd_name }}
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="命令描述">
                        <template slot-scope="scope">
                        {{ scope.row.help_des }}
                        </template>
                    </el-table-column>
                </el-table>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>

import { gm_help, gm_debug} from '@/api/gm'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    components: {
        VueJsonPretty,
    },
    data() {
        return {
            gm_cmd_list : [],
            find_name : "all",
            opt_cmd_name : "",
            player_id : null,
            arg1 : "",
            arg2 : "",
            arg3 : "",
            arg4 : "",
            arg5 : "",
            result : null,
        }
    },

    created() {
        this.getGmCmdList(this.find_name)
    },

    methods: {
        async getGmCmdList(find_name) {
            const res = await gm_help(find_name)

            console.log("getGmCmdList >>> ",res.data)
            if (Array.isArray(res.data)) {
                this.gm_cmd_list = res.data
            } else {
                this.gm_cmd_list = []
            }
        },

        async handleExecute() {
            this.result = null
            let args = {
                cmd_name : this.opt_cmd_name,
                player_id : this.player_id,
                params : [this.arg1, this.arg2, this.arg3, this.arg4, this.arg5]
            }
            const res = await gm_debug(args)
            console.log("handleExecute >>> ",res.data)
            this.result = res.data
        },

        handleSelect() {
            this.getGmCmdList(this.find_name)
        },
    }
}
</script>