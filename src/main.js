import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router).use(store).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

