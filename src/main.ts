import SproutDesignSystem from 'design-system-next'
import 'design-system-next/style.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import designSystem from 'design-system-next'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(designSystem)
app.use(MotionPlugin)

app.mount('#app')
