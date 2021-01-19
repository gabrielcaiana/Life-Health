import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#09bc8a',
        'title-primary': '#172a3a',
        'subtitle-primary': '#508991'
      }
    }
  }
})
