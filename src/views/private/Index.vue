<template>
  <v-app>
    <v-row>
      <v-col class="pr-0 pt-0 sidebar">
        <Sidebar class="fixed sidebar" />
      </v-col>
      <v-col class="pa-0 ">
        <router-view class="dashboard" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Sidebar from '../../components/Sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
  }

  .sidebar {
    max-width: 280px;
  }

  .dashboard {
    width: calc(100vw - 280px)
  }
</style>
