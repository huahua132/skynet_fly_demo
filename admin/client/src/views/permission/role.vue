<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新建角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新建角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="读权限">
          <el-tree
            ref="read_tree"
            :check-strictly="checkStrictly"
            :data="readRoutesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
        <el-form-item label="写权限">
          <el-tree
            ref="write_tree"
            :check-strictly="checkStrictly"
            :data="writeRoutesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { asyncRoutes } from '@/router'
import { getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      readRoutes: [],
      writeRoutes : [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    readRoutesData() {
      return this.readRoutes
    },
    writeRoutesData() {
      return this.writeRoutes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      this.serviceRoutes = asyncRoutes
      let routes = this.generateRoutes(asyncRoutes)
      this.readRoutes = routes
      this.writeRoutes = routes
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

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/', is_write = false) {
      const res = []
      if (!routes.length) {
        return res
      }
      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }
        if (is_write && !route.w) { continue }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path, is_write)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.read_tree) {
        this.$refs.read_tree.setCheckedNodes([])
      }
      if (this.$refs.write_tree) {
        this.$refs.write_tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        console.log("roles:",this.role.routes)
        const readRoutes = this.generateRoutes(this.role.routes)
        this.$refs.read_tree.setCheckedNodes(this.generateArr(readRoutes))
        const writeRoutes = this.generateRoutes(this.role.routes,'/',true)
        this.$refs.write_tree.setCheckedNodes(this.generateArr(writeRoutes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('你确定要删除这个角色?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.name)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys, writeCheckedKeys) {
      const res = {
        routes : [],
        isw : false,
      }

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        let cres = {
          isw : false
        }
        if (route.children) {
          cres = this.generateTree(route.children, routePath, checkedKeys, writeCheckedKeys)
          route.children = cres.routes
        }
        
        if (cres.isw || writeCheckedKeys.includes(routePath)) {
          route.w = true
          res.isw = true
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.routes.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const readCheckedKeys = this.$refs.read_tree.getCheckedKeys()
      const writeCheckedKeys = this.$refs.write_tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', readCheckedKeys, writeCheckedKeys).routes
      console.log("confirmRole>>> ", this.role.routes, writeCheckedKeys)
      if (isEdit) {
        await updateRole(this.role.name, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].name === this.role.name) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        console.log("add succ>>>>>>>>>>>>>>>>>", data.name, this.role)
        this.role.name = data.name
        this.rolesList.push(this.role)
      }

      const { description, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: '成功',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: '成功'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
