<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="/images/logo.svg" alt="Life Logo">
    </div>
    <v-list flat>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="{ name: item.name }">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'Dashboard', icon: 'dashboard', name: 'dashboard' },
      { text: 'Peso', icon: 'account_balance_wallet', name: 'peso' },
      { text: 'Alimentos', icon: 'restaurant', name: 'alimentos' },
      { text: 'Pressão arterial', icon: 'favorite', name: 'pressao-arterial' },
      { text: 'Atividades Fisicas', icon: 'fitness_center', name: 'atividades-fisicas' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: $color-white;
  height: 100%;
  // width: 280px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 24px 24px;

  &__logo {
    width: 100%;
    height: 70px;
    padding: 0 16px;
  }
}
</style>
