<template>
  <v-card class="mx-auto overflow-hidden" height="400">
    <!-- <router-link to="/dashboard" id="brand-link" class="w100">
      <img
        src="/logotipo-extenso-bw.png"
        alt="WK3 Logo"
        class="brand-image"
      />
    </router-link> -->

    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true">
      </v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <!-- Item de vendas -->
        <v-list-item>
          <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Vendas</v-list-item-title>
        </v-list-item>

        <!-- Item de catálogo -->
        <template v-slot:activator>
            <v-list-item-title>Catálogo</v-list-item-title>
        </template>

        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <template v-slot:activator>
            <v-list-item-title>Produtos</v-list-item-title>
          </template>
        </v-list-item-group>

        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <template v-slot:activator>
            <v-list-item-title>Categorias</v-list-item-title>
          </template>
        </v-list-item-group>

        <v-list-item>
          <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <div class="sidebar">
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >

          <li class="nav-item">
            <router-link to="" class="nav-link">
              <i class="nav-icon fas fa-dollar-sign"></i>
              <p>Vendas</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="" class="nav-link">
              <i class="nav-icon fas fa-box-open"></i>
              <p>
                Catálogo
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>

            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/admin/produtos/novo" class="nav-link">
                  <p>Novo produto</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/produtos" class="nav-link">
                  <p>Consultar produtos</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/categorias/novo" class="nav-link">
                  <p>Nova categoria</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/categorias" class="nav-link">
                  <p>Ver categorias</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/acertos" class="nav-link">
                  <p>Acertos de estoque</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="" class="nav-link">
              <i class="nav-icon fas fa-bullhorn"></i>
              <p>
                Marketing
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>

            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/admin/cupons/novo" class="nav-link">
                  <p>Novo cupom</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/cupons" class="nav-link">
                  <p>Consultar cupons</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="" class="nav-link">
                  <p>Newsletter</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="" class="nav-link">
              <i class="nav-icon fas fa-clipboard"></i>
              <p>
                Relatórios
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>

            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="" class="nav-link">
                  <p>Produtos</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="" class="nav-link">
                  <p>Usuários</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="" class="nav-link">
                  <p>Vendas</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="" class="nav-link">
              <i class="nav-icon fas fa-question-circle"></i>
              <p>Suporte</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="" class="nav-link">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                Configurações
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>

            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/admin/atributos" class="nav-link">
                  <p>Atributos</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="" class="nav-link">
                  <p>Preferências</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="" class="nav-link">
                  <p>Loja</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/motivos/novo" class="nav-link">
                  <p>Novo motivo</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/motivos" class="nav-link">
                  <p>Consultar motivos</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/usuarios/novo" class="nav-link">
                  <p>Novo perfi</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/admin/usuarios" class="nav-link">
                  <p>Consultar perfis</p>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link" @click="logoff">
              <i class="nav-icon fas fa-power-off"></i>
              <p>Sair</p>
            </a>
          </li>
        </ul>
      </nav>
    </div> -->
  </v-card>
</template>

<script>
export default {
  name: "SideMenu",
  data(){
    return {
      drawer: false,
      group: null,
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      catalogo: [
        ['Cupons', 'mdi-account-multiple-outline'],
        ['Produtos', 'mdi-account-multiple-outline'],
        ['Estoque', 'mdi-account-multiple-outline']
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    }
  },
  methods:{
    logoff(){
      localStorage.removeItem('user');
      this.$store.dispatch('auth/logout');
      this.$router.push('/admin');
    }
  }
}
</script>

<style>
#brand-link{
  display: inline-block;
}
#brand-link img{
  width: 50%;
  margin: 15px auto;
  display: flex;
}
</style>