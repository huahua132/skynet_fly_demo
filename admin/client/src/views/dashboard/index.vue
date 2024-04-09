<template>
  <div class="dashboard-container">
      <online-monitor></online-monitor>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import onlineMonitor from './onlinemonitor'
export default {
  name: 'Dashboard',
  components: {onlineMonitor},

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
    ])
  }
}
</script>