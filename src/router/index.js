import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"

// 解决路由重定向报冗余错误的问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//     return originalPush.call(this, location)
// }
// Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:Home
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
