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
import ModelosConfig from '@/pages/Admin/Modelos/ModelosConfig.vue'
import ModelosNovo from '@/pages/Admin/Modelos/ModelosNovo.vue'
import ModelosEditar from '@/pages/Admin/Modelos/ModelosEditar.vue'
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
import CategoriasNovo from '@/pages/Admin/Categorias/CategoriasNovo.vue'
import CategoriasEditar from '@/pages/Admin/Categorias/CategoriasEditar.vue'

const routes = [
  {
    path: '/admin',
    component: Login,
    name: 'Login',
    meta: { 
      title: 'WK3 Administrativo',
      is_public: true
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    meta: {
      title: 'WK3 | Dashboard',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/atributos',
    component: AtributosConfig,
    name: 'Todos os atributos',
    meta: {
      title: 'WK3 Admin | Atributos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/tamanhos',
    component: TamanhosConfig,
    name: 'Todos os tamanhos',
    meta: {
      title: 'WK3 Admin | Tamanhos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/tamanhos/editar/:id',
    component: TamanhosEditar,
    name: 'Editar tamanho',
    meta: {
      title: 'WK3 Admin | Editar Tamanho',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/tamanhos/novo',
    component: TamanhosNovo,
    name: 'Adicionar novo tamanho',
    meta: {
      title: 'WK3 Admin | Novo Tamanho',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/cupons',
    component: CuponsConfig,
    name: 'Todos os cupons',
    meta: {
      title: 'WK3 Admin | Cupons',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/cupons/novo',
    component: CuponsNovo,
    name: 'Adicionar novo cupom',
    meta: {
      title: 'WK3 Admin | Novo Cupom',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/cupons/editar/:id',
    component: CuponsEditar,
    name: 'Editar cupom',
    meta: {
      title: 'WK3 Admin | Editar Cupom',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/acertos',
    component: AcertosConfig,
    name: 'Acertos de estoque',
    meta: {
      title: 'WK3 Admin | Acertos De Estoque',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/cores',
    component: CoresConfig,
    name: 'Todas as cores',
    meta: {
      title: 'WK3 Admin | Cores',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/cores/editar/:id',
    component: CoresEditar,
    name: 'Editar cor',
    meta: {
      title: 'WK3 Admin | Editar Cor',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/cores/novo',
    component: CoresNovo,
    name: 'Adicionar nova cor',
    meta: {
      title: 'WK3 Admin | Nova Cor',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/usuarios',
    component: UsuariosConfig,
    name: 'Todos os usuários',
    meta: {
      title: 'WK3 Admin | Usuários',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/usuarios/editar/:id',
    component: UsuariosEditar,
    name: 'Editar usuário',
    meta: {
      title: 'WK3 Admin | Editar Usuário',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/usuarios/novo',
    component: UsuariosNovo,
    name: 'Novo usuário',
    meta: {
      title: 'WK3 Admin | Novo Usuário',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/marcas',
    component: MarcasConfig,
    name: 'Todas as marcas',
    meta: {
      title: 'WK3 Admin | Marcas',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/marcas/editar/:id',
    component: MarcasEditar,
    name: 'Editar marca',
    meta: {
      title: 'WK3 Admin | Editar Marca',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/marcas/novo',
    component: MarcasNovo,
    name: 'Cadastrar nova marca',
    meta: {
      title: 'WK3 Admin | Cadastrar Nova Marca',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/motivos',
    component: MotivosConfig,
    name: 'Todos os motivos',
    meta: {
      title: 'WK3 Admin | Motivos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/motivos/editar/:id',
    component: MotivosEditar,
    name: 'Editar movo',
    meta: {
      title: 'WK3 Admin | Editar Motivo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/motivos/novo',
    component: MotivosNovo,
    name: 'Adicionar novo motivo',
    meta: {
      title: 'WK3 Admin | Adicionar Novo Motivo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/modelos',
    component: ModelosConfig,
    name: 'Todos os modelos',
    meta: {
      title: 'WK3 Admin | Modelos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/modelos/editar/:id',
    component: ModelosEditar,
    name: 'Editar modelo',
    meta: {
      title: 'WK3 Admin | Editar Modelo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/modelos/novo',
    component: ModelosNovo,
    name: 'Adicionar novo modelo',
    meta: {
      title: 'WK3 Admin | Adicionar Novo Modelo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/produtos',
    component: ProdutosConfig,
    name: 'Todos os produtos',
    meta: {
      title: 'Wk3 Admin | Produtos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/produtos/novo',
    component: ProdutosNovo,
    name: 'Adicionar novo produto',
    meta: {
      title: 'Wk3 Admin | Adicionar Novo Produto',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/admin/produtos/editar/:product_url',
    name: 'Editar produto',
    component: ProdutosEditar,
    meta: {
      title: 'Wk3 Admin | Editar Produto',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/404',
    component: NaoEncontrado,
    name: 'Não encontrado',
    meta: {
      title: 'WK3 Outlet - Nada foi encontrado',
      layout: 'AppLayoutDefault',
      is_public: true
    }
  },
  {
    path: '/admin/categorias',
    component: CategoriasConfig,
    name: 'Categorias',
    meta: {
      title: 'WK3 Outlet - Categorias',
      layout: 'AppLayoutAdmin',
      is_public: false,
    }
  },
  {
    path: '/admin/categorias/editar/:id',
    component: CategoriasEditar,
    name: 'Editar Categoria',
    meta: {
      title: 'WK3 Outlet - Editar Categoria',
      layout: 'AppLayoutAdmin',
      is_public: false,
    }
  },
  {
    path: '/admin/categorias/novo',
    component: CategoriasNovo,
    name: 'Nova Categoria',
    meta: {
      title: 'WK3 Outlet - Adicionar Nova Categoria',
      layout: 'AppLayoutAdmin',
      is_public: false,
    }
  },
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: 'WK3 Outlet',
      layout: 'AppLayoutDefault',
      is_public: true
    }
  },
  {
    path: '/:product_url',
    component: ProductPage,
    name: 'WK3 Outlet | Página de produto',
    meta: {
      title: 'WK3 Homepage',
      layout: 'AppLayoutDefault',
      is_public: true
    }
  }
]

export default routes;