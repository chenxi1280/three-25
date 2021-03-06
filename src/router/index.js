import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import TableView from "@/views/TableView.vue"
const routes = [
    {
        path: '/',
        component:Home
    },

    {
        path: '/table',
        component:TableView
    },

    {
        path: '/login',
        component:Login
    },
]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router
