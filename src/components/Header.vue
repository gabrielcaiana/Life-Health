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
            <v-list-item @click="items.length -1 == index ? logout() : null"  v-for="(item, index) in items" :key="`${item}-${index}`" :to="item.to" link>
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
            :subtitle="'27,1'"
            :status="'Acima do peso'"
            :color="'imc-text'"
            :icon="'/images/imc.svg'"
          />

          <Card
            :shadow="'height'"
            :title="'Peso'"
            :subtitle="'93,4 Kg'"
            :status="'Perdeu 5KG'"
            :color="'height-text'"
            :icon="'/images/height.svg'"
          />

          <Card
            :shadow="'heart'"
            :title="'Pressão Arterial'"
            :subtitle="'160/80'"
            :status="'23/05/2020'"
            :color="'heart-text'"
            :icon="'/images/heart.svg'"
          />
        </v-row>
      </div>
    </v-container>
  </v-col>
</template>

<script>
import Card from '../components/commons/Card'
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
      type: String,
      required: false,
      default: ''
    },
    display: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => ({
    btns: [['gabriel Caiana']],
    colors: ['transparent'],
    items: [
      {
        text: 'Perfil',
        to: '/perfil'
      },
      {
        text: 'Sair',
      }
    ]
	}),
	methods: {
		logout() {
				this.$store.commit('DEFINE_LOGOUT')
				this.$router.push({name: 'login'})		
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
