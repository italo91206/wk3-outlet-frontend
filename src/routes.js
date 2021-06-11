import Login from '@/pages/Login.vue'
import Home from '@/pages/Homepage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import AtributosConfig from '@/pages/AtributosConfig.vue'

const routes = [
    {
        path: '/admin',
        component: Login,
        name: 'Login',
        meta: {title: 'WK3 Admin'}
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'    
        }
    },
    {
        path: '/atributos',
        component: AtributosConfig,
        name: 'Editar atributos',
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/',
        component: Home,
        name: 'Home',
        meta: {
            title: 'WK3 Homepage',
            layout: 'AppLayoutDefault'
        }
    }
]

export default routes;