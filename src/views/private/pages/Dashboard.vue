<template>
  <v-app>
    <Header :title="user.name" :subtitle="`Idade: ${age(user.date)} anos`" />

    <v-container class="container">
      <v-row>
        <v-col class="text-center" cols="12">
          <h1 class="container__title">Qual categoria deseja visualizar?</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="container__cards-outline d-flex" cols="12">
          <CardsOutline icon="/images/card_peso.svg" title="Peso" border="border-height" url="/peso" />

          <CardsOutline icon="/images/card_alimentos.svg" title="Alimentos" border="border-foods" url="/alimentos" />

          <CardsOutline
            icon="/images/card_pressao.svg"
            title="Pressão Arterial"
            border="border-heart"
            url="/pressao-arterial"
          />

          <CardsOutline
            icon="/images/card_atividades.svg"
            title="Atividades Fisicas"
            border="border-physical-activities"
            url="/atividades-fisicas"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '../../../components/Header'
import CardsOutline from '../../../components/commons/CardOutline'
import { mapGetters } from 'vuex'
import { age } from '@/mixins'
export default {
  components: {
    Header,
    CardsOutline
	},

  computed: {
    ...mapGetters(['user'])
  },

  mounted() {
		this.profile = this.user
	},

  mixins: [age]
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 5%;

  &__title {
    color: $color-text;
    font-size: 32px;
  }

  &__cards-outline {
    justify-content: center;
    align-items: center;
  }
}
</style>
