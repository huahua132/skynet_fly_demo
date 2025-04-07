<template>
    <div>
        <el-table :data="data_list" style="width: 100%" height="789">
            <el-table-column label="日期" width="150">
                <template slot-scope="scope">
                    <p>{{ new Date(scope.row._time * 1000).toLocaleString('zh-CN') }}</p>
                </template>
            </el-table-column>
            <el-table-column label="唯一ID" width="300">
                <template slot-scope="scope">
                    {{ scope.row._guid }}
                </template>
            </el-table-column>
            <el-table-column label="服务类型" width="100">
                <template slot-scope="scope">
                    {{ scope.row._svr_type }}
                </template>
            </el-table-column>
            <el-table-column label="服务ID" width="100">
                <template slot-scope="scope">
                    {{ scope.row._svr_id }}
                </template>
            </el-table-column>
            <el-table-column label="错误信息" >
                <template slot-scope="scope">
                    {{ scope.row._err_str }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import { getlist } from '@/api/warnlog'

export default {
    data() {
        return {
            pagenum : 1,
            cursor : null,
            count : 0,
            query : {},
            data_list : [],
        }
    },

    created() {
        this.getlist()
    },
   
    methods: {
        async getlist() {
            const res = await getlist({
                pagenum : this.pagenum,
                cursor : this.cursor,
                query : this.query,
            })
            let data = res.data
            console.log("getlist>>> ", data)
            this.cursor = data.cursor
            this.pagenum = data.pagenum
            if (data.count) {
                this.count = data.count
            }
            this.data_list = data.list
        },
    }
}
</script>