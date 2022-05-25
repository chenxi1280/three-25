import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import ElementPlus from 'element-plus'
import {router} from './router'

const app = createApp(App)
app.mount('#app')
app.use(router).use(ElementPlus, { size: 'small', zIndex: 3000 })
