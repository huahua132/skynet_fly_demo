<template>
  <div class="dashboard-container">
    <component :is="curcomponent"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import monitorDashBoard from './monitor'
export default {
  name: 'Dashboard',
  components: {monitorDashBoard},

  data() {
    return {
      curcomponent : 'monitorDashBoard',
    }
  },

  computed: {
    ...mapGetters([
    ])
  }
}
</script>