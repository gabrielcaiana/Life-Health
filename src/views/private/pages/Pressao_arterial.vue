<template>
  <v-app>
    <Header
      display="display"
      title="Pressão Arterial"
      subtitle="Aqui você encontra todo histórico de sua pressão arterial"
    />
    <v-container class="BloodPressure">
      <v-row>
        <v-col cols="12">
          <BloodPressure />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '../../../components/Header'
import BloodPressure from '../../../components/Tables/BloodPressure'
export default {
  components: {
    Header,
    BloodPressure
  }
}
</script>
<style lang="scss" scoped>
.BloodPressure {
  width: 90%;
  background: white;
  margin: -130px auto 32px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
}
</style>
