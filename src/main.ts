import { createApp } from 'vue'
import App from './App.vue'
// router
import router from '@admin/routes'
// pinia
import { createPinia } from 'pinia'
// fect-ui
import { UIRegister } from './plugins/ui'
import 'highlight.js/styles/github.css'

// echart
import * as echarts from 'echarts/core'
import { Charts } from './plugins/echarts'

// nprogress
import 'nprogress/nprogress.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
UIRegister(app)
echarts.use(Charts)
app.mount('#app')
