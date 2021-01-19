<template>
  <v-app>
    <Header title="Editar perfil" display="display" />
    <v-container class="profile">
      <v-row>
        <v-col cols="12">
          <h3>Informações do usuário</h3>
          <Profile />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '../../../components/Header'
import Profile from '../../../components/Profile'
export default {
  components: {
    Header,
    Profile
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    width: 90%;
    background: white;
    margin: -130px auto 32px auto;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    padding: 32px 150px;
  }
</style>
