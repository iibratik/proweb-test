import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/style/main.scss'
import App from '@/App.vue'
import router from '@/router'
import "@/assets/style/common/media.scss"
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
