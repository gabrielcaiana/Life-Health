<template>
  <v-app>
    <Header
      display="display"
      title="Peso"
      subtitle="Aqui você encontra todos detalhes sobre o seu histórico de peso."
    />
    <v-container class="height">
      <v-row>
        <v-col cols="12">
          <Height />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '../../../components/Header'
import Height from '../../../components/Tables/Height'
export default {
  components: {
    Header,
    Height
  }
}
</script>
<style lang="scss" scoped>
.height {
  width: 90%;
  background: white;
  margin: -130px auto 32px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
}
</style>
