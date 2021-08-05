import Login from '@/pages/Login.vue'
import Home from '@/pages/Loja/Homepage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import AtributosConfig from '@/pages/AtributosConfig.vue'
import CoresConfig from '@/pages/CoresConfig.vue'
import MarcasConfig from '@/pages/MarcasConfig.vue'
import ModelosConfig from '@/pages/ModelosConfig.vue'
import ProdutosConfig from '@/pages/Admin/Produtos/ProdutosConfig.vue'
import ProdutosNovo from '@/pages/Admin/Produtos/ProdutosNovo.vue'
import ProdutosEditar from '@/pages/Admin/Produtos/ProdutosEditar.vue'
import ProductPage from '@/pages/Loja/ProductPage.vue'
import NaoEncontrado from '@/pages/Loja/NaoEncontrado.vue'
import UsuariosConfig from '@/pages/Admin/Usuarios/UsuariosConfig.vue'
import UsuariosEditar from '@/pages/Admin/Usuarios/UsuariosEditar.vue'
import UsuariosNovo from '@/pages/Admin/Usuarios/UsuariosNovo.vue'

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
        path: '/admin/usuarios',
        component: UsuariosConfig,
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/admin/usuarios/editar/:id',
        component: UsuariosEditar,
        meta: {
            title: 'WK3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/admin/usuario/novo',
        component: UsuariosNovo,
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
        path: '/admin/produtos',
        component: ProdutosConfig,
        meta: {
            title: 'Wk3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/admin/produtos/novo',
        component: ProdutosNovo,
        meta: {
            title: 'Wk3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/admin/produtos/editar/:product_url',
        name: 'Editar produto',
        component: ProdutosEditar,
        meta: {
            title: 'Wk3 Admin',
            layout: 'AppLayoutAdmin'
        }
    },
    {
        path: '/404',
        component: NaoEncontrado,
        name: 'Não encontrado',
        meta: {
            title: 'WK3 Outlet - Nada foi encontrado',
            layout: 'AppLayoutDefault'
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
        path: '/:product_url',
        component: ProductPage,
        name: 'Página de produto',
        meta: {
            title: 'WK3 Homepage',
            layout: 'AppLayoutDefault'
        }
    }
]

export default routes;