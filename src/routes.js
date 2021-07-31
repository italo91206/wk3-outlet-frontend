import Login from '@/pages/Login.vue'
import Home from '@/pages/Loja/Homepage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import AtributosConfig from '@/pages/AtributosConfig.vue'
import CoresConfig from '@/pages/CoresConfig.vue'
import MarcasConfig from '@/pages/MarcasConfig.vue'
import ModelosConfig from '@/pages/ModelosConfig.vue'
import ProdutosConfig from '@/pages/Produtos/ProdutosConfig.vue'
import ProdutosNovo from '@/pages/Produtos/ProdutosNovo.vue'
import ProductPage from '@/pages/Loja/ProductPage.vue'

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
        path: '/cores',
        component: CoresConfig,
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/marcas',
        component: MarcasConfig,
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/modelos',
        component: ModelosConfig,
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/produtos',
        component: ProdutosConfig,
        meta: {
            title: 'Wk3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/produtos/novo',
        component: ProdutosNovo,
        meta: {
            title: 'Wk3 Admin',
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
    },
    {
        path: '/:slug',
        component: ProductPage,
        name: 'Página de produto',
        meta: {
            title: 'WK3 Homepage',
            layout: 'AppLayoutDefault'
        }
    }
]

export default routes;