<template>
  <div>
    <v-snackbar v-model="configSnack.snackbar.visible" :color="configSnack.snackbar.color">
      {{ configSnack.snackbar.msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="#4acf8c" text v-bind="attrs" @click="configSnack.snackbar.visible = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    props: {
			configSnack: {
				type: Object
			}
		},
  }
</script>
