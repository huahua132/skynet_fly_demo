<template>
    <div>
        <el-select v-model="logName" filterable placeholder="请选择日志">
            <el-option
                v-for="item in logNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>

        <el-row>
            <el-col :span="4"><div>
                <el-input v-model="setSvrType" placeholder="服务类型"></el-input>
                <el-input v-model="setSvrId" placeholder="服务ID"></el-input>
            </div></el-col>
            <el-col :span="6"><div>
                <el-date-picker
                    v-model="setTimeValue"
                    type="datetimerange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div></el-col>
            <el-col :span="4" v-for="item in indexs_list"><div>
                <el-input v-for="it in item.list" v-model="indexs_value[it]" :placeholder="it"></el-input>
            </div></el-col>
        </el-row>

        <div>
            <el-table border stripe :data="data_list" style="width: 100%" height="650">
                <el-table-column v-for="item in field_list" :label="item" resizable min-width="50" >
                    <template slot-scope="scope">
                        {{ parseItemShow(item, scope.row[item]) }}
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div align="center" style="padding-top: 15px;">
            <el-button-group>
                <el-button :loading="loadingFirst" type="primary" icon="el-icon-arrow-left" @click="onClickFirst">首页</el-button>
                <el-button :loading="loadingPre" type="primary" icon="el-icon-arrow-left" @click="onClickPre">上一页</el-button>
                <el-button :loading="loadingNext" type="primary" @click="onClickNext">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <p>{{ this.pagenum + "/" + this.totalPageNum }}</p>
        </div>
    </div>
  </template>

<script>

import { getLogNameList, getLogDesc, getLogList } from '@/api/log_pannel'

export default {
    data() {
        return {
          pagecount : 20,
          count : 0,
          totalPageNum : 0,
          logNameList : [],
          field_list : [],
          field_map : {},
          indexs_list : [],
          indexs_value : {},
          logName : "",
          pagenum : 1,
          pageCachMap : {},
          data_list : [],
          cursor : null,
          setSvrType : "",
          setSvrId : "",
          setTimeValue : "",
          loadingFirst : false,
          loadingPre : false,
          loadingNext : false,
        }
    },

    created() {
        this.getLogNameList()
    },

    watch: {
        logName : {
            handler(val) {
                this.getLogInfo(val)
                this.clearData()
                this.getLogList()
            }
        },
    },
   
    methods: {
        clearData() {
            this.pageCachMap = {}
            this.pagenum = 1
            this.totalPageNum = 0
            this.cursor = null
            this.data_list = []
            this.setSvrType = ""
            this.setSvrId = ""
            this.setTimeValue = ""
            this.indexs_value = {}
            this.field_map = {}
        },

        async getLogNameList() {
            const res = await getLogNameList()
            if (Array.isArray(res.data)) {
                this.logNameList = []
                for (let i = 0; i < res.data.length; i++) {
                    let name = res.data[i]
                    this.logNameList[i] = {
                        label : 'label:' + name,
                        value : name,
                    }
                }
            } else {
                this.logNameList = []
            }
        },

        async getLogInfo(logName) {
            const res = await getLogDesc(logName)
            console.log("res >>> ", res)
            this.field_list = []
            for (let i = 0; i < res.data.field_list.length; i++) {
                let field_name = res.data.field_list[i]
                if (field_name != '_log_name') {
                    this.field_list.push(field_name)
                }
            }
            this.indexs_list = []
            for (let key in res.data.indexs_list) {
                let list = res.data.indexs_list[key]
                if (key != "time_index" && key != "svr_index") {
                    this.indexs_list.push({key : key, list : list})
                }
            }

            this.indexs_list.sort(function(a,b) {
                return a.key - b.key
            })

            this.field_map = res.data.field_map
        },

        async getLogList() {
            if (this.pagenum != 1 && this.pageCachMap[this.pagenum]) {
                this.data_list = this.pageCachMap[this.pagenum]
                return;
            }
            if (this.pagenum == 1) {
                this.pageCachMap = {}
                this.cursor = null
            }
            let query = {}
            if (this.setSvrType != "" && Number(this.setSvrType) != NaN) {
                query._svr_type = Number(this.setSvrType)
            }
            if (this.setSvrId != "" && Number(this.setSvrId) != NaN) {
                query._svr_id = Number(this.setSvrId)
            }
            
            if (this.setTimeValue) {
                query._time = {
                    ['$gte'] : Math.floor(this.setTimeValue[0] / 1000),
                    ['$lte'] : Math.floor(this.setTimeValue[1] / 1000),
                }
            }

            for (let field_name in this.indexs_value) {
                let field_value = this.indexs_value[field_name]
                if (field_value != '') {
                    let ft = this.field_map[field_name]
                    if (ft < 20) {
                        if (Number(field_value) != NaN) {
                            query[field_name] = Number(field_value)
                        }
                    } else {
                        query[field_name] = field_value
                    }
                }
            }

            const res = await getLogList({
                logname : this.logName,
                pagenum : this.pagenum,
                cursor : this.cursor,
                query : query,
            })
            
            let data = res.data
            this.cursor = data.cursor
            this.pagenum = data.pagenum
            if (data.count) {
                this.count = data.count
                this.totalPageNum = Math.ceil(this.count / this.pagecount)
            }
            
            if (Array.isArray(data.list)) {
                this.data_list = data.list
            } else {
                this.data_list = []
            }
            this.pageCachMap[this.pagenum] = this.data_list
        },

        parseItemShow(field_name, field_value) {
            if (field_name == '_time') {
                return new Date(field_value * 1000).toLocaleString('zh-CN')
            } else {
                return field_value
            }
        },

        async onClickFirst() {
            this.cursor = null
            this.pagenum = 1
            this.data_list = []
            this.loadingFirst = true
            this.getLogList()
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
            this.getLogList()
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
            this.getLogList()
            this.loadingNext = false
        },
    }
}
</script>