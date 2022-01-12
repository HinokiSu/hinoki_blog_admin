import { createApp } from 'vue'
import App from './App.vue'
// router
import router from '@admin/routes'

import FectUI from '@fect-ui/vue'
import '@fect-ui/vue/lib/main.css'

const app = createApp(App)
app.use(router)
app.use(FectUI)
app.mount('#app')
