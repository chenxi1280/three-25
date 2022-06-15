import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { vueBaberrage  } from 'vue-baberrage'
import './permission' // permission control


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



app.use(router).use(store).use(vueBaberrage).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

