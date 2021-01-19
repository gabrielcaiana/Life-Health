<template>
  <v-app>
    <Header display="display" title="Alimentos" subtitle="Aqui você encontra todos detalhes suas refeições" />
    <v-container class="foods">
      <v-row>
        <v-col cols="12">
          <Foods />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '../../../components/Header'
import Foods from '../../../components/Tables/Foods'
export default {
  components: {
    Header,
    Foods
  }
}
</script>
<style lang="scss" scoped>
.foods {
  width: 90%;
  background: white;
  margin: -130px auto 32px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
}
</style>
