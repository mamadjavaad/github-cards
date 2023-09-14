import './assets/base.css'
import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// Vuetify components
import { VMain } from 'vuetify/components/VMain'
import { VCard } from 'vuetify/components/VCard'
import { VResponsive } from 'vuetify/components/VResponsive'
import { VTextField } from 'vuetify/components/VTextField'
import { VImg } from 'vuetify/components/VImg'
import { VSnackbar } from 'vuetify/components/VSnackbar'
import { VIcon } from 'vuetify/components/VIcon'
import { VProgressCircular } from 'vuetify/components/VProgressCircular'
import { VBtn } from 'vuetify/components/VBtn'
import { VLayout } from 'vuetify/components/VLayout'
import { VSystemBar } from 'vuetify/components/VSystemBar'
// vuetify mdi icons
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiGithub } from '@mdi/js'

//vuetify config
const vuetify = createVuetify({
  components: {
    VMain,
    VCard,
    VResponsive,
    VImg,
    VTextField,
    VSnackbar,
    VIcon,
    VProgressCircular,
    VBtn,
    VLayout,
    VSystemBar,
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      mdiGithub: mdiGithub,
    },
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
