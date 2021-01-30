export const logoutMixin = {
  methods: {
    logout() {
      this.$store.commit('DEFINE_LOGOUT')
      this.$router.push({name: 'login'})
  }
  }
}
