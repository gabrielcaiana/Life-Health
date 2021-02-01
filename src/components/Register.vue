<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="register_user">
      <validation-provider v-slot="{ errors }" name="Name" rules="required|max:255">
        <v-text-field
          v-model="register.name"
          :counter="255"
          :error-messages="errors"
          label="Nome"
          required
        ></v-text-field>
      </validation-provider>

      <v-row>
        <v-col cols="12" sm="6" md="8">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="register.date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <validation-provider v-slot="{ errors }" name="date" rules="required">
                <v-text-field
                  v-model="register.date"
                  label="Data de nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </template>
            <v-date-picker v-model="register.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancelar
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(register.date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-divider></v-divider>

        <v-col cols="12" sm="6" md="4">
          <validation-provider v-slot="{ errors }" name="height" rules="required|max:255">
            <v-text-field
              :counter="6"
              v-model="register.height"
              :error-messages="errors"
              label="Altura"
              required
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-col cols="12" sm="6" md="12" class="px-0">
        <p>Genêro</p>
        <v-radio-group v-model="register.gender" name="gender" mandatory>
          <v-radio label="Masculino" value="m"></v-radio>
          <v-radio label="Feminino" value="f"></v-radio>
          <v-radio label="Não binário" value="b"></v-radio>
        </v-radio-group>
      </v-col>

      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field v-model="register.email" :error-messages="errors" label="E-mail" required></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          v-model="register.password"
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
        Cadastrar
      </v-btn>

      <v-btn to="/" class="btn mt-4" outlined>
        Voltar
      </v-btn>
    </form>
  </validation-observer>
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
    register: {
      name: '',
      date: '',
      height: '',
      gender: '',
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
    async register_user() {
      try {
        this.$refs.observer.validate()
        await this.$store.dispatch('registerUser', this.register)
				return this.$router.push({name: 'login'})
				console.log(this.profile)
      } catch(err) {
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
