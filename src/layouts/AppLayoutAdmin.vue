<template>
  <v-app class="mx-auto overflow-hidden">
    <v-app-bar color="#333333" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer">
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.$route.meta.title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <router-link to="/dashboard" id="brand-link" class="w100" style="background: #333333;">
        <img
          src="/logotipo-extenso-bw.png"
          alt="WK3 Logo"
          class="brand-image"
        />
      </router-link>
      
      <v-list nav dense>
        <!-- Item de vendas -->
        <v-list-item to="/admin/vendas">
          <v-list-item-icon>
            <v-icon small>fas fa-dollar-sign</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Vendas</v-list-item-title>
        </v-list-item>

        <!-- Item de catálogo -->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon small>fas fa-box-open</v-icon>
            </v-list-item-icon>
            
            <v-list-item-title>Catálogo</v-list-item-title>
          </template>
          
          <!-- Item de produtos -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Produtos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/produtos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/produtos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Consultar</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de categorias -->
          <v-list-group :value="false" no-action sub-group>

            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Categorias</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/categorias/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/categorias">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Consultar
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Acerto de estoque -->
          <v-list-item to="/admin/acertos">
            <v-list-item-title>
              Acerto de estoque
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- Item de marketing -->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon small>fas fa-bullhorn</v-icon>
            </v-list-item-icon>
            
            <v-list-item-title>Marketing</v-list-item-title>
          </template>
          
          <!-- Item de cupons -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Cupons</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/cupons/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/cupons">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Consultar</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de newsletter -->
          <v-list-group :value="false" no-action sub-group>

            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Newsletter</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/categorias/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/categorias">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Consultar
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>

        <!-- Item de relatórios -->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon small>fas fa-clipboard</v-icon>
            </v-list-item-icon>
            
            <v-list-item-title>Relatórios</v-list-item-title>
          </template>

          <!-- Produtos -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon small>fas fa-tshirt</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Produtos</v-list-item-title>
          </v-list-item>

          <!-- Usuários -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon small>fas fa-user</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Usuários</v-list-item-title>
          </v-list-item>

          <!-- Vendas -->
          <v-list-item link>
            <v-list-item-icon>
              <v-icon small>fas fa-dollar-sign</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Vendas</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- Item de atributos -->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon small>fas fa-cog</v-icon>
            </v-list-item-icon>
            
            <v-list-item-title>Atributos</v-list-item-title>
          </template>
          
          <!-- Item de cores -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Cores</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/cores/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/cores">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Consultar</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de marcas -->
          <v-list-group :value="false" no-action sub-group>

            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Marcas</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/marcas/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/marcas">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Consultar
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de modelos -->
          <v-list-group :value="false" no-action sub-group>

            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Modelos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/modelos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/modelos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Consultar
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de tamanhos -->
          <v-list-group :value="false" no-action sub-group>

            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Tamanhos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/tamanhos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/tamanhos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Consultar
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de motivos -->
          <v-list-group :value="false" no-action sub-group>

            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Motivos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/admin/motivos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Novo
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/motivos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>
              
              <v-list-item-title>
                Consultar
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>

        <!-- Item para sair -->
        <v-list-item @click="logoff">
          <v-list-item-icon>
              <v-icon small>fas fa-power-off</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AppLayoutAdmin',
  data(){
    return {
      drawer: false,
      group: null
    }
  },
  methods: {
    logoff(){
      localStorage.removeItem('user');
      this.$store.dispatch('auth/logout');
      this.$router.push('/admin');
    }
  }
};
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