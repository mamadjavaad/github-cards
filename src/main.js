import './assets/base.css'

import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)
axios.defaults.baseURL = "https://api.github.com/"
app.config.globalProperties.$http = axios
app.use(router)

app.mount('#app')
