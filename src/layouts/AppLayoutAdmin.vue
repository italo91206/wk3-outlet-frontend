<template>
  <v-app class="mx-auto w100 overflow-hidden">
    <v-app-bar color="#333333" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>{{ this.$route.meta.title }}</v-toolbar-title>

      <v-btn to="/" class="botao-visitar-loja" target="_blank"
        >Visitar loja</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <router-link
        to="/dashboard"
        id="brand-link"
        class="w100"
        style="background: #333333"
      >
        <img
          src="/logotipo-extenso-bw.png"
          alt="WK3 Logo"
          class="brand-image"
        />
      </router-link>

      <v-list-item>
        <v-list-item-title>Olá, {{ nome }}</v-list-item-title>
      </v-list-item>

      <v-list nav dense>
        <!-- Item de dashboard -->
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon small>fas fa-chart-area</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <!-- Item de vendas -->
        <v-list-item to="/vendas">
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

            <v-list-item to="/produtos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/produtos">
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

            <v-list-item to="/categorias/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/categorias">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Acerto de estoque -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  Acertos de estoque
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/acertos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/acertos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
            </v-list-item>
          </v-list-group>
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

            <v-list-item to="/cupons/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/cupons">
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

            <v-list-item to="/categorias/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/categorias">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
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

        <!-- Item de configurações -->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon small>fas fa-cog</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Configurações</v-list-item-title>
          </template>

          <!-- Item de cores -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Cores</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/cores/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/cores">
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

            <v-list-item to="/marcas/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/marcas">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de modelos -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Modelos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/modelos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/modelos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de tamanhos -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Tamanhos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/tamanhos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/tamanhos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de motivos -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Motivos</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/motivos/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/motivos">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!-- Item de usuários -->
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Usuários</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/usuarios/novo">
              <v-list-item-icon>
                <v-icon small>fas fa-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Novo </v-list-item-title>
            </v-list-item>

            <v-list-item to="/usuarios">
              <v-list-item-icon>
                <v-icon small>fas fa-list-ul</v-icon>
              </v-list-item-icon>

              <v-list-item-title> Consultar </v-list-item-title>
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

    <slot />
  </v-app>
</template>

<script>
export default {
  name: "AppLayoutAdmin",
  data() {
    return {
      drawer: false,
      group: null,
      nome: "",
    };
  },
  methods: {
    logoff() {
      localStorage.removeItem("user");
      this.$store.dispatch("auth/logout");
      this.$router.push("/admin");
    },
  },
  mounted() {
    this.nome = this.$store.state.perfil.perfil.nome;
  },
};
</script>

<style>
#brand-link {
  display: inline-block;
}
#brand-link img {
  width: 50%;
  margin: 15px auto;
  display: flex;
}
.w100 {
  width: 100%;
}
.botao-visitar-loja {
  margin-left: 20px;
}
</style>
