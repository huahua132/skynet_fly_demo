<template>
  <div>
    <div style="margin-bottom:15px;">
      你的当前角色是: {{ roles }}
    </div>
    切换角色:
    <el-radio-group v-model="switchRoles">
      <template v-for="role in rolesList">
        <el-radio-button v-if="role.name != roles">{{role.name}}</el-radio-button>
      </template>
    </el-radio-group>
  </div>
</template>

<script>
import {getRoles} from '@/api/role'

export default {
  data() {
    return {
      rolesList:[]
    }
  },

  created() {
    this.getRoles()
  },

  computed: {
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },

    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
