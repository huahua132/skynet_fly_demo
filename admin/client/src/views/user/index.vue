<template>
    <div>
        <el-button type="primary" @click="handleAddUser">新建用户</el-button>

        <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="用户名" width="220">
                <template slot-scope="scope">
                {{ scope.row.username }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="头像" width="220">
                <template slot-scope="scope">
                {{ scope.row.avatar }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="介绍" width="220">
                <template slot-scope="scope">
                {{ scope.row.introduction }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="角色" width="220">
                <template slot-scope="scope">
                {{ scope.row.roles }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="最后登录时间" width="220">
                <template slot-scope="scope">
                {{ scope.row.last_login_time }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Operations">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑用户':'新建用户'">
            <el-form :model="user" label-width="80px" label-position="left">
                <el-form-item label="用户名">
                    <el-input v-model="user.username" placeholder="用户名" />
                </el-form-item>
                <el-form-item label="头像">
                    <el-input
                        v-model="user.avatar"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        type="textarea"
                        placeholder="头像"
                    />
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input
                        v-model="user.introduction"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        type="textarea"
                        placeholder="介绍"
                    />
                </el-form-item>
                <el-form-item label="角色">
                    <template>
                        <el-checkbox v-model="rolesbox" v-for="role in rolesList" :label="role.name" :key="role.name">{{role.name}}</el-checkbox>
                    </template>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="confirmUser">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deepClone } from '@/utils'
import { list, addUser, updateUser, deleteUser } from '@/api/user'
import { getRoles} from '@/api/role'

const defaultUser = {
    username: '',
    avatar: '',
    introduction: '',
    roles: [],
    last_login_time: 0,
}

export default {
    data() {
        return {
            usersList: [],
            dialogVisible: false,
            dialogType : "new",
            user: Object.assign({}, defaultUser),
            rolesbox: [],
            rolesList: [],
        }
    },

    created() {
        this.getUsers()
        this.getRoles()
    },

    methods: {

        async getUsers() {
            const res = await list()

            console.log("getUser >>> ",res.data, Array.isArray(res.data))
            if (Array.isArray(res.data)) {
                this.usersList = res.data
            } else {
                this.usersList = []
            }
        },

        async getRoles() {
            const res = await getRoles()
            console.log("getRoles >>> ",res.data, Array.isArray(res.data))
            if (Array.isArray(res.data)) {
                this.rolesList = res.data
            } else {
                this.rolesList = []
            }
        },

        handleAddUser() {
            this.user = Object.assign({}, defaultUser)
            this.dialogType = 'new'
            this.dialogVisible = true
            this.rolesbox = []
        },

        handleEdit(scope) {
            this.dialogType = 'edit'
            this.dialogVisible = true
            this.user = deepClone(scope.row)
            this.rolesbox = scope.row.roles
        },

        handleDelete({$index, row}) {
            this.$confirm('你确定要删除这个用户吗?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async() => {
                console.log("handleDelete:", $index, row)
                await deleteUser(row.username)
                this.usersList.splice($index, 1)
                this.$message({
                    type: '成功',
                    message: '删除成功'
                })
            }).catch(err => { console.error(err) })
        },

        async confirmUser() {
            const isEdit = this.dialogType === 'edit'
            this.dialogVisible = false
            this.user.roles = this.rolesbox

            if (isEdit) {
                await updateUser(this.user.username, this.user)
                for (let index = 0; index < this.usersList.length; index++) {
                    if (this.usersList[index].username === this.user.username) {
                        this.usersList.splice(index, 1, Object.assign({}, this.user))
                        break
                    }
                }
            } else {
                const { data } = await addUser(this.user)
                this.usersList.push(this.user)
            }

            this.$notify({
                title: '成功',
                dangerouslyUseHTMLString: true,
                message: `
                    <div>User Name: ${this.user.username}</div>
                `,
                type: '成功'
            })
        }
    }
}
</script>