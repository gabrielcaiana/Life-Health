<template>
  <v-app>
    <v-row>
      <v-col cols="6" class="bg"> </v-col>
      <v-col cols="6">
        <v-container class="login">
          <img class="login__logo" src="/images/logo.svg" alt="Life Healthy" />
          <h1 class="login__title">Seja bem vindo</h1>
          <Form />
          <p class="login__register">Ainda não tem uma conta? <router-link to="/register"><b>Faça agora mesmo!</b></router-link></p>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Form from '../../components/Login'
export default {
  components: {
    Form
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  background: url('https://images.unsplash.com/photo-1555944892-14e39a54edd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
    no-repeat center center / cover;
}

.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 10%;

  &__logo {
    width: fit-content;
    margin-bottom: 24px;
  }

  &__title {
    margin-bottom: 42px;
    color: $color-text;
  }

  &__register {
    margin-top: 82px;
  }
}
</style>
