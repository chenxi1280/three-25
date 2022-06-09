import router from './router'
import store from './store'
// import NProgress from 'nprogress' // progress bar

router.beforeEach(async(to, from, next) => {
    // start progress bar
    // NProgress.start()
    console.log('beforeEach')
    next()

    // set page title
    // document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    // const hasToken = getToken()
    // console.log(to)
    // console.log(hasToken, hasToken !== null && hasToken !== undefined)
    // if (to.query.auth != null) {
    //     console.log('25 替换')
    //     let token
    //     to.query.auth = to.query.auth - 0
    //     if (to.query.auth == 3) {
    //         token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc0ODE4MDQsInVzZXJJZCI6IjEiLCJpYXQiOjE2MzY2MTc4MDQsInVzZXJuYW1lIjoiMTc3NTQ5MjMwOTEifQ.10eLiYifEQKuQkYnP4fqILLb9oLqJ994alDaKM7BTfs'
    //     } else if (to.query.auth == 2) {
    //         token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczMjYsInVzZXJJZCI6IjQiLCJpYXQiOjE2MzY5NTMzMjYsInVzZXJuYW1lIjoiY29kZVdoeSJ9.GH7zFGcC49cn3IO6HXPNmVps9vcpN_73VSqXSTdMJoY'
    //     } else if (to.query.auth == 1) {
    //         token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczODcsInVzZXJJZCI6IjYiLCJpYXQiOjE2MzY5NTMzODcsInVzZXJuYW1lIjoiY29kZVdoeSJ9.KGLODSA6H2xhvJi1SOru8NaEY6RXKD0oL0SiR2FdlJ4'
    //     } else {
    //         // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczODcsInVzZXJJZCI6IjYiLCJpYXQiOjE2MzY5NTMzODcsInVzZXJuYW1lIjoiY29kZVdoeSJ9.KGLODSA6H2xhvJi1SOru8NaEY6RXKD0oL0SiR2FdlJ4'
    //     }
    //     console.log(token)
    //     console.log(hasToken)
    //     if (token != hasToken && token != null && token != undefined) {
    //         console.log(38, '我被执行了')
    //         await store.dispatch('user/changeRoles', token)
    //     }
    // }
    // if (hasToken !== null && hasToken !== undefined) {
    //     if (to.path === '/login') {
    //         let token
    //         to.query.auth = to.query.auth - 0
    //         if (to.query.auth == 3) {
    //             token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc0ODE4MDQsInVzZXJJZCI6IjEiLCJpYXQiOjE2MzY2MTc4MDQsInVzZXJuYW1lIjoiMTc3NTQ5MjMwOTEifQ.10eLiYifEQKuQkYnP4fqILLb9oLqJ994alDaKM7BTfs'
    //         } else if (to.query.auth == 2) {
    //             token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczMjYsInVzZXJJZCI6IjQiLCJpYXQiOjE2MzY5NTMzMjYsInVzZXJuYW1lIjoiY29kZVdoeSJ9.GH7zFGcC49cn3IO6HXPNmVps9vcpN_73VSqXSTdMJoY'
    //         } else if (to.query.auth == 1) {
    //             token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczODcsInVzZXJJZCI6IjYiLCJpYXQiOjE2MzY5NTMzODcsInVzZXJuYW1lIjoiY29kZVdoeSJ9.KGLODSA6H2xhvJi1SOru8NaEY6RXKD0oL0SiR2FdlJ4'
    //         } else {
    //             // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczODcsInVzZXJJZCI6IjYiLCJpYXQiOjE2MzY5NTMzODcsInVzZXJuYW1lIjoiY29kZVdoeSJ9.KGLODSA6H2xhvJi1SOru8NaEY6RXKD0oL0SiR2FdlJ4'
    //         }
    //         await store.dispatch('user/setToken', token)
    //         // router.push('/')
    //         // if is logged in, redirect to the home page
    //         next({ path: '/' })
    //         NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    //     } else {
    //         console.log('这里')
    //         // determine whether the user has obtained his permission roles through getInfo
    //         const hasRoles = store.getters.roles && store.getters.roles.length > 0
    //
    //         if (hasRoles) {
    //             next()
    //         } else {
    //             try {
    //                 // get user info
    //                 // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    //                 console.log('43', hasToken)
    //                 const { roles } = await store.dispatch('user/getInfo')
    //
    //                 // 根据角色生成可访问的路线图
    //                 const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
    //
    //                 // 动态添加可访问的路线
    //                 router.addRoutes(accessRoutes)
    //
    //                 // hack方法，确保addRoutes完整，将replace设置为true：因此导航不会留下历史记录
    //                 next({ ...to, replace: true })
    //             } catch (error) {
    //                 // remove token and go to login page to re-login
    //                 await store.dispatch('user/resetToken')
    //                 Message.error(error || 'Has Error')
    //                 next(`/login?redirect=${to.path}`)
    //                 NProgress.done()
    //             }
    //         }
    //     }
    // } else {
    //     let token
    //     to.query.auth = to.query.auth - 0
    //     if (to.query.auth == 3) {
    //         token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc0ODE4MDQsInVzZXJJZCI6IjEiLCJpYXQiOjE2MzY2MTc4MDQsInVzZXJuYW1lIjoiMTc3NTQ5MjMwOTEifQ.10eLiYifEQKuQkYnP4fqILLb9oLqJ994alDaKM7BTfs'
    //     } else if (to.query.auth == 2) {
    //         token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczMjYsInVzZXJJZCI6IjQiLCJpYXQiOjE2MzY5NTMzMjYsInVzZXJuYW1lIjoiY29kZVdoeSJ9.GH7zFGcC49cn3IO6HXPNmVps9vcpN_73VSqXSTdMJoY'
    //     } else if (to.query.auth == 1) {
    //         token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczODcsInVzZXJJZCI6IjYiLCJpYXQiOjE2MzY5NTMzODcsInVzZXJuYW1lIjoiY29kZVdoeSJ9.KGLODSA6H2xhvJi1SOru8NaEY6RXKD0oL0SiR2FdlJ4'
    //     } else {
    //         // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc4MTczODcsInVzZXJJZCI6IjYiLCJpYXQiOjE2MzY5NTMzODcsInVzZXJuYW1lIjoiY29kZVdoeSJ9.KGLODSA6H2xhvJi1SOru8NaEY6RXKD0oL0SiR2FdlJ4'
    //     }
    //     await store.dispatch('user/setToken', token)
    //
    //     next({ path: '/' })
    //
    //     /* has no token*/
    //
    //     // if (whiteList.indexOf(to.path) !== -1) {
    //     //   // 在免费登录白名单中，直接进入
    //     //   next()
    //     // } else {
    //     //   // 其他无权访问的页面被重定向到登录页面。
    //     //   next(`/login?redirect=${to.path}`)
    //     //   NProgress.done()
    //     // }
    // }
})

router.afterEach(() => {
    // finish progress bar
    // NProgress.done()
})
