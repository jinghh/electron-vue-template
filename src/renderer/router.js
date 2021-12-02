import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import List from './views/List'

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list',
            name: 'list',
            component: List
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.scrollTop = 0;
    document.title = to.meta.title
    next()
})

export default router