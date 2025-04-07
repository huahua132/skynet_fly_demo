<template>
    <div>
        <el-table :data="data_list" style="width: 100%" height="800">
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
        <div align="center" style="padding-top: 15px;">
            <el-button-group>
                <el-button :loading="loadingFirst" type="primary" icon="el-icon-arrow-left" @click="onClickFirst">首页</el-button>
                <el-button :loading="loadingPre" type="primary" icon="el-icon-arrow-left" @click="onClickPre">上一页</el-button>
                <el-button :loading="loadingNext" type="primary" @click="onClickNext">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script>

import { getlist } from '@/api/warnlog'

export default {
    data() {
        return {
            pagenum : 1,
            pagecount : 20,
            cursor : null,
            count : 0,
            query : {},
            data_list : [],
            pageCachMap : {},
            loadingFirst : false,
            loadingPre : false,
            loadingNext : false,
        }
    },

    created() {
        this.onClickFirst()
    },
   
    methods: {
        async getlist() {
            if (this.pagenum != 1 && this.pageCachMap[this.pagenum]) {
                this.data_list = this.pageCachMap[this.pagenum]
                return;
            }
            if (this.pagenum == 1) {
                this.pageCachMap = {}
                this.cursor = null
            }

            const res = await getlist({
                pagenum : this.pagenum,
                cursor : this.cursor,
                query : this.query,
            })
            let data = res.data
            this.cursor = data.cursor
            this.pagenum = data.pagenum
            if (data.count) {
                this.count = data.count
            }
            
            if (Array.isArray(data.list)) {
                this.data_list = data.list
            } else {
                this.data_list = []
            }
            this.pageCachMap[this.pagenum] = this.data_list
        },

        async onClickFirst() {
            this.cursor = null
            this.pagenum = 1
            this.data_list = []
            this.loadingFirst = true
            this.getlist()
            this.loadingFirst = false
        },

        async onClickPre() {
            if (this.pagenum <= 1) {
                this.$notify({
                    title: '已经到第一页了',
                })
                return;
            }
            this.pagenum -= 1
            this.data_list = []
            this.loadingPre = true
            this.getlist()
            this.loadingPre = false
        },

        async onClickNext() {
            let maxPageNum = Math.ceil(this.count / this.pagecount)
            if (this.pagenum >= maxPageNum) {
                this.$notify({
                    title: '已经到最后一页了',
                })
                return;
            }
            this.pagenum += 1
            this.data_list = []
            this.loadingNext = true
            this.getlist()
            this.loadingNext = false
            
        },
    }
}
</script>