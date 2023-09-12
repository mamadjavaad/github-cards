import './assets/base.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App)
axios.defaults.baseURL = "https://api.github.com/"
app.config.globalProperties.$http = axios
app.use(router)
app.use(vuetify)
app.mount('#app')
