import { createApp } from 'vue'
import App from './App.vue'
// router
import router from '@admin/routes'
// pinia
import { createPinia } from 'pinia'
// fect-ui
import { UIRegister } from './plugins/ui'
import 'highlight.js/styles/github.css';

const app = createApp(App)
app.use(router)
app.use(createPinia())
UIRegister(app)
app.mount('#app')
