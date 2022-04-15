import Login from '@/pages/Login.vue'
import Home from '@/pages/Loja/Homepage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Checkout from '@/pages/Loja/Checkout.vue'
import CoresConfig from '@/pages/Cores/CoresConfig.vue'
import CoresEditar from '@/pages/Cores/CoresEditar.vue'
import CoresNovo from '@/pages/Cores/CoresNovo.vue'
import MarcasConfig from '@/pages/Marcas/MarcasConfig.vue'
import MarcasEditar from '@/pages/Marcas/MarcasEditar.vue'
import MarcasNovo from '@/pages/Marcas/MarcasNovo.vue'
import ModelosConfig from '@/pages/Modelos/ModelosConfig.vue'
import ModelosNovo from '@/pages/Modelos/ModelosNovo.vue'
import ModelosEditar from '@/pages/Modelos/ModelosEditar.vue'
import ProdutosConfig from '@/pages/Produtos/ProdutosConfig.vue'
import ProdutosNovo from '@/pages/Produtos/ProdutosNovo.vue'
import ProdutosEditar from '@/pages/Produtos/ProdutosEditar.vue'
import ProductPage from '@/pages/Loja/ProductPage.vue'
import NaoEncontrado from '@/pages/Loja/NaoEncontrado.vue'
import UsuariosConfig from '@/pages/Usuarios/UsuariosConfig.vue'
import UsuariosEditar from '@/pages/Usuarios/UsuariosEditar.vue'
import UsuariosNovo from '@/pages/Usuarios/UsuariosNovo.vue'
import MotivosConfig from '@/pages/Motivos/MotivosConfig.vue'
import MotivosEditar from '@/pages/Motivos/MotivosEditar.vue'
import MotivosNovo from '@/pages/Motivos/MotivosNovo.vue'
import TamanhosConfig from '@/pages/Tamanhos/TamanhosConfig.vue'
import TamanhosEditar from '@/pages/Tamanhos/TamanhosEditar.vue'
import TamanhosNovo from '@/pages/Tamanhos/TamanhosNovo.vue'
import CuponsConfig from '@/pages/Cupons/CuponsConfig.vue'
import CuponsNovo from '@/pages/Cupons/CuponsNovo.vue'
import CuponsEditar from '@/pages/Cupons/CuponsEditar.vue'
import AcertosConfig from '@/pages/Acertos/AcertosConfig.vue'
import AcertoEstoque from '@/pages/Acertos/AcertoEstoque.vue'
import CategoriasConfig from '@/pages/Categorias/CategoriasConfig.vue'
import CategoriasNovo from '@/pages/Categorias/CategoriasNovo.vue'
import CategoriasEditar from '@/pages/Categorias/CategoriasEditar.vue'
import VendasConfig from '@/pages/Vendas/VendasConfig.vue'
import VendasEditar from '@/pages/Vendas/VendasEditar.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'Login',
    meta: {
      title: 'WK3 Administrativo',
      is_public: true
    }
  },
  {
    path: '/',
    component: Dashboard,
    name: 'Dashboard',
    meta: {
      title: 'WK3 | Dashboard',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/checkout',
    component: Checkout,
    name: 'Checkout',
    meta: {
      title: 'WK3 | Checkout',
      is_public: false
    }
  },
  {
    path: '/tamanhos',
    component: TamanhosConfig,
    name: 'Todos os tamanhos',
    meta: {
      title: 'WK3 | Tamanhos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/tamanhos/editar/:id',
    component: TamanhosEditar,
    name: 'Editar tamanho',
    meta: {
      title: 'WK3 | Editar Tamanho',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/tamanhos/novo',
    component: TamanhosNovo,
    name: 'Adicionar novo tamanho',
    meta: {
      title: 'WK3 | Novo Tamanho',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/cupons',
    component: CuponsConfig,
    name: 'Todos os cupons',
    meta: {
      title: 'WK3 | Cupons',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/cupons/novo',
    component: CuponsNovo,
    name: 'Adicionar novo cupom',
    meta: {
      title: 'WK3 | Novo Cupom',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/cupons/editar/:id',
    component: CuponsEditar,
    name: 'Editar cupom',
    meta: {
      title: 'WK3 | Editar Cupom',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/acertos',
    component: AcertosConfig,
    name: 'Acertos de estoque',
    meta: {
      title: 'WK3 | Acertos De Estoque',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/acertar-estoque',
    component: AcertoEstoque,
    name: 'Acertar estoque',
    meta: {
      title: 'WK3 | Acertar estoque',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/cores',
    component: CoresConfig,
    name: 'Todas as cores',
    meta: {
      title: 'WK3 | Cores',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/cores/editar/:id',
    component: CoresEditar,
    name: 'Editar cor',
    meta: {
      title: 'WK3 | Editar Cor',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/cores/novo',
    component: CoresNovo,
    name: 'Adicionar nova cor',
    meta: {
      title: 'WK3 | Nova Cor',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/usuarios',
    component: UsuariosConfig,
    name: 'Todos os usuários',
    meta: {
      title: 'WK3 | Usuários',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/usuarios/editar/:id',
    component: UsuariosEditar,
    name: 'Editar usuário',
    meta: {
      title: 'WK3 | Editar Usuário',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/usuarios/novo',
    component: UsuariosNovo,
    name: 'Novo usuário',
    meta: {
      title: 'WK3 | Novo Usuário',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/marcas',
    component: MarcasConfig,
    name: 'Todas as marcas',
    meta: {
      title: 'WK3 | Marcas',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/marcas/editar/:id',
    component: MarcasEditar,
    name: 'Editar marca',
    meta: {
      title: 'WK3 | Editar Marca',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/marcas/novo',
    component: MarcasNovo,
    name: 'Cadastrar nova marca',
    meta: {
      title: 'WK3 | Cadastrar Nova Marca',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/motivos',
    component: MotivosConfig,
    name: 'Todos os motivos',
    meta: {
      title: 'WK3 | Motivos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/motivos/editar/:id',
    component: MotivosEditar,
    name: 'Editar movo',
    meta: {
      title: 'WK3 | Editar Motivo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/motivos/novo',
    component: MotivosNovo,
    name: 'Adicionar novo motivo',
    meta: {
      title: 'WK3 | Adicionar Novo Motivo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/modelos',
    component: ModelosConfig,
    name: 'Todos os modelos',
    meta: {
      title: 'WK3 | Modelos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/modelos/editar/:id',
    component: ModelosEditar,
    name: 'Editar modelo',
    meta: {
      title: 'WK3 | Editar Modelo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/modelos/novo',
    component: ModelosNovo,
    name: 'Adicionar novo modelo',
    meta: {
      title: 'WK3 | Adicionar Novo Modelo',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/produtos',
    component: ProdutosConfig,
    name: 'Todos os produtos',
    meta: {
      title: 'Wk3 | Produtos',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/vendas',
    component: VendasConfig,
    name: 'Todos as vendas',
    meta: {
      title: 'Wk3 | Vendas',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/vendas/:venda_id',
    component: VendasEditar,
    name: 'Informações da Venda',
    meta: {
      title: 'Wk3 | Venda',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/produtos/novo',
    component: ProdutosNovo,
    name: 'Adicionar novo produto',
    meta: {
      title: 'Wk3 | Adicionar Novo Produto',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/produtos/editar/:product_url',
    name: 'Editar produto',
    component: ProdutosEditar,
    meta: {
      title: 'Wk3 | Editar Produto',
      layout: 'AppLayoutAdmin',
      is_public: false
    }
  },
  {
    path: '/categorias',
    component: CategoriasConfig,
    name: 'Categorias',
    meta: {
      title: 'WK3 Outlet - Categorias',
      layout: 'AppLayoutAdmin',
      is_public: false,
    }
  },
  {
    path: '/categorias/editar/:id',
    component: CategoriasEditar,
    name: 'Editar Categoria',
    meta: {
      title: 'WK3 Outlet - Editar Categoria',
      layout: 'AppLayoutAdmin',
      is_public: false,
    }
  },
  {
    path: '/categorias/novo',
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
  },
  {
    path: '*',
    component: NaoEncontrado,
    name: 'Não encontrado',
    meta: {
      title: 'WK3 Outlet - Nada foi encontrado',
      layout: 'AppLayoutDefault',
      is_public: true
    }
  },
]

export default routes;
