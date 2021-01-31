<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="efetuarLogin">
        <validation-provider v-slot="{ errors }" name="email" rules="required|email">
          <v-text-field v-model="user.email" :error-messages="errors" label="E-mail" required></v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="password" rules="required">
          <v-text-field
            v-model="user.password"
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

        <v-btn class="mr-4 btn primary mt-4" type="submit" :disabled="invalid" depressed>
          Entrar
        </v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} não pode estar vazio'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver

  },
  data: () => ({
    user: {
      password: '',
      email: ''
    },
    menu: '',
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      emailMatch: () => `O e-mail e a senha que você digitou não correspondem`
    }
  }),

  methods: {
    async efetuarLogin() {
      try {
        this.$refs.observer.validate()
        await this.$store.dispatch('efetuarLogin', this.user)
        return this.$router.push({ name: 'dashboard' })
      } catch (err) {
        console.log(err)
      }
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
