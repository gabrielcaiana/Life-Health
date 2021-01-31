<template>
  <v-row justify="center" v-if="visible">
    <v-dialog v-model="visible" persistent max-width="200">
      <v-card class="card d-flex flex-column align-center">
        <v-progress-circular :width="4" color="green" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .card {
    padding: 16px;
    overflow: hidden;
  }
</style>
