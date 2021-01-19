<template>
  <v-app>
    <Header
      display="display"
      title="Atividade Física"
      subtitle="Aqui você encontra todo histórico de atividades fisícas"
    />
    <v-container class="PhysicalActivities">
      <v-row>
        <v-col cols="12">
          <PhysicalActivities />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '../../../components/Header'
import PhysicalActivities from '../../../components/Tables/PhysicalActivities'
export default {
  components: {
    Header,
    PhysicalActivities
  }
}
</script>
<style lang="scss" scoped>
.PhysicalActivities {
  width: 90%;
  background: white;
  margin: -130px auto 32px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
}
</style>
