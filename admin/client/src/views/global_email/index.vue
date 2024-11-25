<template>
    <div>
        <el-button type="primary" @click="handleAddEmail">新建邮件</el-button>

        <el-table :data="emailsList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="标题" width="300">
                <template slot-scope="scope">
                {{ scope.row.title }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="内容" width="600">
                <template slot-scope="scope">
                {{ scope.row.content }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="奖励道具" width="350">
                <template slot-scope="scope">
                    <el-table :data="scope.row.item_list" style="width: 100%">
                        <el-table-column align="center" label="道具名称" style="width: 50%">
                            <template slot-scope="item">
                                {{getItemName(item.row.id)}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="道具数量" style="width: 50%">
                            <template slot-scope="item">
                                {{item.row.count}}
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column align="center" label="有效时间" width="180">
                <template slot-scope="scope">
                    <p v-if="scope.row.vaild_time == 0">永久</p>
                    <p v-else>{{ new Date(scope.row.vaild_time).toLocaleString('zh-CN') }}</p>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作项">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑邮件':'修改邮件'">
            <el-form :model="email" label-width="80px" label-position="left">
                <el-form-item label="标题">
                    <el-input v-model="email.title" placeholder="标题" />
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                        v-model="email.content"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        type="textarea"
                        placeholder="内容"
                    />
                </el-form-item>
                <el-form-item label="奖励道具">
                    <el-button type="primary" @click="handleAddItem" style="width: 30%">增加道具奖励</el-button>
                    <el-select v-model="optItem" placeholder="请选择道具名称" style="width: 30%">
                        <el-option v-for="item in itemsList" :key="item.item_id" :label="item.item_name" :value="item.item_id">
                            
                        </el-option>
                    </el-select>
                    <el-input placeholder="道具数量" v-model="optItemCount" style="width: 40%"></el-input>
                    <el-table :data="email.item_list" style="width: 100%">
                        <el-table-column align="center" label="道具名称" style="width: 30%">
                            <template slot-scope="oneItem">
                                {{ getItemName(oneItem.row.id) }}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="道具数据" style="width: 30%">
                            <template slot-scope="oneItem">
                                <el-input v-model="oneItem.row.count">
                                    {{ oneItem.row.count }}
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作项">
                            <template slot-scope="oneItem">
                                <el-button type="danger" size="small" @click="handleDeleteItem(oneItem.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="有效时间">
                    <p v-if="email.vaild_time == 0">永久</p>
                    <p v-else>{{ new Date(email.vaild_time).toLocaleString('zh-CN') }}</p>
                    <el-date-picker
                        v-model="email.vaild_time"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="选择日期">
                    </el-date-picker>
                    <el-button type="primary" size="small" @click="changeForEverVaildTime">永久</el-button>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirmEmail">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deepClone } from '@/utils'
import { list, add, update, del, item_list } from '@/api/global_email'
import { MessageBox, Message } from 'element-ui'

const defaultEmail = {
    guid: 0,
    title: "",
    content: "",
    item_list: [],
    vaild_time: 0,
}

export default {
    data() {
        return {
            emailsList: [],
            dialogVisible: false,
            dialogType : "new",
            email: Object.assign({}, defaultEmail),
            itemsList: [],
            itemsMap: {},
            optItem : null,
            optItemCount : null,
        }
    },

    created() {
        this.getEmailList()
        this.getItemsList()
    },

    methods: {
        async getEmailList() {
            const res = await list()

            console.log("getEmailList >>> ",res.data)
            if (Array.isArray(res.data)) {
                this.emailsList = res.data
            } else {
                this.emailsList = []
            }

            for (let i = 1; i < this.emailsList.length; i++) {
                let oneEmail = this.emailsList[i]
                if (!Array.isArray(oneEmail.item_list)) {        //说明是空
                    oneEmail.item_list = []
                }
            }
        },

        async getItemsList() {
            const res = await item_list()
            
            if (Array.isArray(res.data)) {
                this.itemsList = res.data
            } else {
                this.itemsList = []
            }
            this.itemsMap = {}
            for (let i = 0; i < this.itemsList.length; i++) {
                let oneItem = this.itemsList[i]
                this.itemsMap[oneItem.item_id] = oneItem
            }
            console.log("getItemsList >>> ",this.itemsList, this.itemsMap)
        },

        getItemName(itemId) {
            if (this.itemsMap[itemId]) {
                return this.itemsMap[itemId].item_name
            } else {
                return "未知道具:" + itemId
            }
        },

        handleAddEmail() {
            this.email = Object.assign({}, defaultEmail)
            this.dialogType = 'new'
            this.dialogVisible = true
        },

        handleEdit(scope) {
            this.email = scope.row
            this.dialogType = 'edit'
            this.dialogVisible = true
        },

        async handleDelete(scope) {
            this.dialogVisible = false
            let delEmail = scope.row
            let guid = delEmail.guid
            const res = await del(guid)
            if (res.data == "succ") {
                this.$notify({
                    title: '删除邮件成功，请稍后刷新界面',
                    dangerouslyUseHTMLString: true,
                    message: `
                        <div>email title: ${this.email.title}</div>
                    `,
                    type: '成功'
                })
            }
        },

        async confirmEmail() {
            const isEdit = this.dialogType === 'edit'
            this.dialogVisible = false
            console.log("confirmEmail:", this.email)
            if (!isEdit) {
                const res = await add(this.email)
                if (res.data == "succ") {
                    this.$notify({
                        title: '新增邮件成功，请稍后刷新界面',
                        dangerouslyUseHTMLString: true,
                        message: `
                            <div>email title: ${this.email.title}</div>
                        `,
                        type: '成功'
                    })
                }
            } else {
                const res = await update(this.email)
                if (res.data == "succ") {
                    this.$notify({
                        title: '修改邮件成功',
                        dangerouslyUseHTMLString: true,
                        message: `
                            <div>email title: ${this.email.title}</div>
                        `,
                        type: '成功'
                    })
                }
            }
        },

        handleDeleteItem(itemId) {
            for (let i = 0; i < this.email.item_list.length; i++) {
                let oneItem = this.email.item_list[i]
                if (oneItem.id == itemId) {
                    this.email.item_list.splice(i, 1)
                    break
                }
            }
        },

        handleAddItem() {
            if (!this.optItem) {
                Message({
                    message: "请选择道具名称",
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
            
            if (!this.optItemCount) {
                Message({
                    message: "请输入道具数量",
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }

            if (this.optItemCount <= 0) {
                Message({
                    message: "道具数量必须大于0",
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }

            this.email.item_list.push({
                id : this.optItem,
                count : this.optItemCount,
            })
        },

        changeForEverVaildTime() {
            this.email.vaild_time = 0
        }
    }
}
</script>