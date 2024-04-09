<template>
  <div class="dashboard-container">

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {monitorDashBoard},

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