<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">

      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show1 ? 'text' : 'password'"
          name="email"
          label="Senha"
          @click:append="show1 = !show1"
          :error-messages="errors"
          required
        ></v-text-field>
      </validation-provider>


      <v-btn to="/dashboard" class="mr-4 mt-4 btn primary" type="submit" :disabled="invalid" depressed>
        Entrar
      </v-btn>
      <v-btn class="btn mt-4" @click="clear" outlined>
        Limpar
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { required, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} não pode estar vazio'
})

extend('email', {
  ...email,
  message: 'Email deve ser válido'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: '',
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      emailMatch: () => `O e-mail e a senha que você digitou não correspondem`
    },
    checkbox: null
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
    },
    clear() {
      this.email = ''
      this.password = ''
      this.checkbox = null
      this.$refs.observer.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    border-radius: 48px;
    width: 150px;
  }
</style>
