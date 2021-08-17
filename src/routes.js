import Login from '@/pages/Login.vue'
import Home from '@/pages/Loja/Homepage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import AtributosConfig from '@/pages/AtributosConfig.vue'
import CoresConfig from '@/pages/Admin/Cores/CoresConfig.vue'
import CoresEditar from '@/pages/Admin/Cores/CoresEditar.vue'
import CoresNovo from '@/pages/Admin/Cores/CoresNovo.vue'
import MarcasConfig from '@/pages/Admin/Marcas/MarcasConfig.vue'
import MarcasEditar from '@/pages/Admin/Marcas/MarcasEditar.vue'
import MarcasNovo from '@/pages/Admin/Marcas/MarcasNovo.vue'
import ModelosConfig from '@/pages/ModelosConfig.vue'
import ProdutosConfig from '@/pages/Admin/Produtos/ProdutosConfig.vue'
import ProdutosNovo from '@/pages/Admin/Produtos/ProdutosNovo.vue'
import ProdutosEditar from '@/pages/Admin/Produtos/ProdutosEditar.vue'
import ProductPage from '@/pages/Loja/ProductPage.vue'
import NaoEncontrado from '@/pages/Loja/NaoEncontrado.vue'
import UsuariosConfig from '@/pages/Admin/Usuarios/UsuariosConfig.vue'
import UsuariosEditar from '@/pages/Admin/Usuarios/UsuariosEditar.vue'
import UsuariosNovo from '@/pages/Admin/Usuarios/UsuariosNovo.vue'
import MotivosConfig from '@/pages/Admin/Motivos/MotivosConfig.vue'
import MotivosEditar from '@/pages/Admin/Motivos/MotivosEditar.vue'
import MotivosNovo from '@/pages/Admin/Motivos/MotivosNovo.vue'
import TamanhosConfig from '@/pages/Admin/Tamanhos/TamanhosConfig.vue'
import TamanhosEditar from '@/pages/Admin/Tamanhos/TamanhosEditar.vue'
import TamanhosNovo from '@/pages/Admin/Tamanhos/TamanhosNovo.vue'
import CuponsConfig from '@/pages/Admin/Cupons/CuponsConfig.vue'
import CuponsNovo from '@/pages/Admin/Cupons/CuponsNovo.vue'
import CuponsEditar from '@/pages/Admin/Cupons/CuponsEditar.vue'
import AcertosConfig from '@/pages/Admin/Acertos/AcertosConfig.vue'
import CategoriasConfig from '@/pages/Admin/Categorias/CategoriasConfig.vue'

const routes = [
  {
    path: '/admin',
    component: Login,
    name: 'Login',
    meta: { title: 'WK3 Administrativo' }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    meta: {
      title: 'WK3 | Dashboard',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/atributos',
    component: AtributosConfig,
    name: 'Todos os atributos',
    meta: {
      title: 'WK3 Admin | Atributos',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/tamanhos',
    component: TamanhosConfig,
    name: 'Todos os tamanhos',
    meta: {
      title: 'WK3 Admin | Tamanhos',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/tamanhos/editar/:id',
    component: TamanhosEditar,
    name: 'Editar tamanho',
    meta: {
      title: 'WK3 Admin | Editar Tamanho',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/tamanhos/novo',
    component: TamanhosNovo,
    name: 'Adicionar novo tamanho',
    meta: {
      title: 'WK3 Admin | Novo Tamanho',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/cupons',
    component: CuponsConfig,
    name: 'Todos os cupons',
    meta: {
      title: 'WK3 Admin | Cupons',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/cupons/novo',
    component: CuponsNovo,
    name: 'Adicionar novo cupom',
    meta: {
      title: 'WK3 Admin | Novo Cupom',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/cupons/editar/:id',
    component: CuponsEditar,
    name: 'Editar cupom',
    meta: {
      title: 'WK3 Admin | Editar Cupom',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/acertos',
    component: AcertosConfig,
    name: 'Acertos de estoque',
    meta: {
      title: 'WK3 Admin | Acertos De Estoque',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/cores',
    component: CoresConfig,
    name: 'Todas as cores',
    meta: {
      title: 'WK3 Admin | Cores',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/cores/editar/:id',
    component: CoresEditar,
    name: 'Editar cor',
    meta: {
      title: 'WK3 Admin | Editar Cor',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/cores/novo',
    component: CoresNovo,
    name: 'Adicionar nova cor',
    meta: {
      title: 'WK3 Admin | Nova Cor',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/usuarios',
    component: UsuariosConfig,
    name: 'Todos os usuários',
    meta: {
      title: 'WK3 Admin | Usuários',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/usuarios/editar/:id',
    component: UsuariosEditar,
    name: 'Editar usuário',
    meta: {
      title: 'WK3 Admin | Editar Usuário',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/usuario/novo',
    component: UsuariosNovo,
    name: 'Novo usuário',
    meta: {
      title: 'WK3 Admin | Novo Usuário',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/marcas',
    component: MarcasConfig,
    name: 'Todas as marcas',
    meta: {
      title: 'WK3 Admin | Marcas',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/marcas/editar/:id',
    component: MarcasEditar,
    name: 'Editar marca',
    meta: {
      title: 'WK3 Admin | Editar Marca',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/marcas/novo',
    component: MarcasNovo,
    name: 'Cadastrar nova marca',
    meta: {
      title: 'WK3 Admin | Cadastrar Nova Marca',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/motivos',
    component: MotivosConfig,
    name: 'Todos os motivos',
    meta: {
      title: 'WK3 Admin | Motivos',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/motivos/editar/:id',
    component: MotivosEditar,
    name: 'Editar movo',
    meta: {
      title: 'WK3 Admin | Editar Motivo',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/motivos/novo',
    component: MotivosNovo,
    name: 'Adicionar novo motivo',
    meta: {
      title: 'WK3 Admin | Adicionar Novo Motivo',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/modelos',
    component: ModelosConfig,
    name: 'Todos os modelos',
    meta: {
      title: 'WK3 Admin | Modelos',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/produtos',
    component: ProdutosConfig,
    name: 'Todos os produtos',
    meta: {
      title: 'Wk3 Admin | Produtos',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/produtos/novo',
    component: ProdutosNovo,
    name: 'Adicionar novo produto',
    meta: {
      title: 'Wk3 Admin | Adicionar Novo Produto',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/admin/produtos/editar/:product_url',
    name: 'Editar produto',
    component: ProdutosEditar,
    meta: {
      title: 'Wk3 Admin | Editar Produto',
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
    path: '/admin/categorias',
    component: CategoriasConfig,
    name: 'Categorias',
    meta: {
      title: 'WK3 Outlet - Categorias',
      layout: 'AppLayoutAdmin'
    }
  },
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault'
    }
  },
  {
    path: '/:product_url',
    component: ProductPage,
    name: 'WK3 Outlet | Página de produto',
    meta: {
      title: 'WK3 Homepage',
      layout: 'AppLayoutDefault'
    }
  }
]

export default routes;