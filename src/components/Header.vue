<template>
  <v-col class="header" cols="12">
    <v-container class="container">
      <v-row class="d-flex justify-end">
        <v-menu v-for="([text, rounded], index) in btns" :key="`${text}-${index}`" :rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn :color="colors[index]" class="white--text ma-5" v-bind="attrs" v-on="on" depressed>
              {{ text }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="items.length - 1 == index ? logout() : null"
              v-for="(item, index) in items"
              :key="`${item}-${index}`"
              :to="item.to"
              link
            >
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-row>
        <v-col class="header__user" cols="12">
          <p class="header__user__name">
            <b>{{ title }}</b>
          </p>
          <span class="header__user__age">{{ subtitle }}</span>
        </v-col>
      </v-row>

      <div :class="display">
        <v-row class="header__cards ma-0 d-flex display">
          <Card
            :shadow="'imc'"
            :title="'IMC'"
            :subtitle="imc"
            :status="`Verificando...`"
            :color="'imc-text'"
            :icon="'/images/imc.svg'"
          />

          <Card
            :shadow="'height'"
            :title="'Peso'"
            :subtitle="`${ this.lastWeight != null ? lastWeight + 'Kg' : 'Vazio'}`"
            :status="statusIMC"
            :color="'height-text'"
            :icon="'/images/height.svg'"
          />

          <Card
            :shadow="'heart'"
            :title="'Pressão Arterial'"
            :subtitle="`Verificando...`"
            :status="`Verificando...`"
            :color="'heart-text'"
            :icon="'/images/heart.svg'"
          />
        </v-row>
      </div>
    </v-container>
  </v-col>
</template>

<script>
import { logoutMixin } from '@/mixins'
import Card from '../components/commons/Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    subtitle: {
      required: false,
      default: ''
    },
    display: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function() {
    return {
      btns: [['gabriel Caiana']],
      colors: ['transparent'],
			imc: '',
			statusIMC: '',
			lastWeight: null,
			userHeight: null,
      items: [
        {
          text: 'Perfil',
          to: '/perfil'
        },
        {
          text: 'Sair'
        }
      ]
    }
  },

  mixins: [logoutMixin],
  computed: {
    ...mapGetters(['user'])
  },

  mounted() {
    this.btns = [[this.user.name]]
    this.initialize()
  },

  methods: {
    calcIMC(peso, altura) {
      let caculaIMC = (peso / (altura * altura))
			this.imc = caculaIMC.toFixed(2)

			if(caculaIMC <= 16.9) {
				this.statusIMC = `Muito abaixo do peso`
			} else if(this.imc >= 17 && this.imc <= 18.4) {
				this.statusIMC = `Abaixo do peso`
			} else if(this.imc >= 18.5 && this.imc <= 24.9) {
				this.statusIMC = `Peso normal`
			}else if(this.imc >= 25 && this.imc <= 29.9) {
				this.statusIMC = `Acima do peso`
			}else if(this.imc >= 30 && this.imc <= 34.9) {
				this.statusIMC = `Obesidade grau 1`
			}else if(this.imc >= 35 && this.imc <= 40) {
				this.statusIMC = `Obesidade grau 2`
			}else if(this.imc >= 40) {
				this.statusIMC = `Obesidade grau 3`
			}
    },

    async initialize() {
      const user = this.user
      try {
        const { data } = await this.$http('peso')
        data.map(item => {
          if (item.userId === user.id) {
						this.lastWeight = item.height
						this.userHeight = user.height
          }
				})
				let height = this.userHeight.replace(/,/g, ".")
				let weight = this.lastWeight.replace(/,/g, ".")
				this.calcIMC(parseFloat(weight), parseFloat(height))

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 95%;
  height: 310px;
}
.header {
  width: 100%;
  background: linear-gradient(82.84deg, #4acf8c 0%, #75eda6 100%);
  height: 200px;

  &__user {
    &__name {
      font-size: 32px;
      color: $color-white;
      margin: 0;
    }

    &__age {
      font-size: 16px;
      color: $color-white;
    }
  }

  &__cards {
    width: 100%;
    height: 200px;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding-right: 10px;

    &__card {
      width: 100%;
      display: flex;
    }
  }
}

.display {
  display: none;
}
</style>
