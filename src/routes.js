import Login from '@/pages/Login.vue'
import Home from '@/pages/Homepage.vue'

const routes = [
    {
        path: '/admin',
        component: Login,
        name: 'Login',
        meta: {title: 'WK3 Admin'}
    },
    {
        path: '/',
        component: Home,
        name: 'Home',
        meta: {title: 'WK3 Homepage'}
    }
]

export default routes;