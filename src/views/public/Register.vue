<template>
  <v-app>
    <v-row>
      <v-col cols="6" class="bg"> </v-col>
      <v-col cols="6">
        <v-container class="register">
          <h1 class="register__title">Faça seu cadastro</h1>
          <p class="register__subtitle">Prrencha as informações abaixo para se cadastrar</p>
          <Register />
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Register from "../../components/Register"
export default {
  components: {
    Register
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  background: url('https://images.unsplash.com/photo-1555944892-14e39a54edd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')
    no-repeat center center / cover;
}

.register {
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
    margin-bottom: 8px;
    color: $color-text;
  }

  &__subtitle {
    color: $color-text-secundary;
    font-size: 16px;
  }
}
</style>
