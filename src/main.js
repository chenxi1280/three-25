import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { vueBaberrage  } from 'vue-baberrage'
import axios from "./assets/js/axios";
import './permission' // permission control


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.config.globalProperties.$h = axios;

app.use(router).use(store).use(vueBaberrage).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

