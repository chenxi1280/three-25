import router from './router'
import store from './store'
// import NProgress from 'nprogress' // progress bar
import { getToken, setToken } from './utils/auth' // get token from cookie
import {  getTokenAPI } from './api/user.js'

router.beforeEach(async(to, from, next) => {
    // start progress bar
    // NProgress.start()
    console.log('beforeEach')
    // 判断 getToken
    // 设置 token

    // Invalid navigation guard

    // set page title
    // document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    console.log(from,to.query.auth )
    console.log(to.path === '/table' ,  from.path === '/login' , to.query.auth === 'success' )

    if (to.path === '/table' ) {
        if ( from.path === '/login' && to.query.auth === 'success' ) {
            console.log(1212121)
            next()
        }else {
            next( '/login' )
        }
    }else {
        getTokenAPI().then(response => {
            console.log(response)
            // commit('SET_TOKEN', data)
            setToken(response.msg)
            // resolve()

        }).catch(error => {
            console.log(error)
        })
        next()
    }



})

router.afterEach(() => {
    // finish progress bar
    // NProgress.done()
})
