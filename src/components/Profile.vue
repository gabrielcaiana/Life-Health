<template>
  <validation-observer ref="observer">
    <form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <validation-provider v-slot="{ errors }" name="name" rules="required|max:255">
            <v-text-field
              v-model="profile.name"
              :counter="255"
              :error-messages="errors"
              label="Nome"
              required
            ></v-text-field>
          </validation-provider>
        </v-col>

        <v-divider></v-divider>

        <v-col cols="12" sm="6" md="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="profile.date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <validation-provider v-slot="{ errors }" name="date" rules="required">
                <v-text-field
                  v-model="profile.date"
                  label="Data de nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </template>
            <v-date-picker v-model="profile.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancelar
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(profile.date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <validation-provider v-slot="{ errors }" name="email" rules="required|email">
            <v-text-field v-model="profile.email" :error-messages="errors" label="E-mail" required></v-text-field>
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <validation-provider v-slot="{ errors }" name="height" rules="required">
            <v-text-field v-model="profile.height" :error-messages="errors" label="Altura" required></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="12" class="px-3">
          <p>Genêro</p>

          <v-radio-group v-model="profile.gender">
            <template v-slot:label> </template>
            <v-radio value="m">
              <template v-slot:label>
                <div>Masculino</div>
              </template>
            </v-radio>
            <v-radio value="f">
              <template v-slot:label>
                <div>Feminino</div>
              </template>
            </v-radio>
               <v-radio value="b">
              <template v-slot:label>
                <div>Não binário</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <!-- <v-divider></v-divider> -->

      <!-- <h4 class="py-6">Alterar senha</h4> -->

      <!-- <v-row>
        <v-col cols="6" sm="6" md="6" class="px-3">
          <validation-provider v-slot="{ errors }" name="password" rules="required">
            <v-text-field
              v-model="profile.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              name="email"
              label="Senha Atual"
              @click:append="show1 = !show1"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
        </v-col> -->

        <!-- <v-col cols="6" sm="6" md="6" class="px-3">
          <validation-provider v-slot="{ errors }" name="newPassword" rules="required">
            <v-text-field
              v-model="profile.newPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show2 ? 'text' : 'password'"
              name="email"
              label="Nova Senha"
              @click:append="show2 = !show2"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
        </v-col> -->
      <!-- </v-row> -->

      <v-btn @click="updateUser" class="mr-4 btn primary mt-4" type="submit" depressed>
        Salvar
      </v-btn>

      <v-btn to="/dashboard" class="btn mt-4" outlined>
        Voltar
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import { mapGetters } from 'vuex'

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
    profile: {
      name: '',
      date: '',
      email: '',
      height: '',
      gender: '',
      password: '',
      newPassword: ''
    },
    menu: '',
    show1: false,
    show2: false,
    rules: {
      required: value => !!value || 'Required.',
      emailMatch: () => `O e-mail e a senha que você digitou não correspondem`
    }
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
    },

    async updateUser() {
      try{
        await this.$store.dispatch('updateUser', this.user)
      }catch(err) {
        console.log(err)
      }
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  mounted() {
    this.profile = this.user
  }
}
</script>
