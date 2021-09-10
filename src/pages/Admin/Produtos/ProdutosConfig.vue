<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por produto"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="produtos"
            :loading="produtos.length == 0"
            loading-text="Carregando produtos... aguarde"
          >
            <template v-slot:item.url="{ item }">
              <router-link
                :to="`/admin/produtos/editar/${item.url}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/produtos/novo">
          Novo produto
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from "@/services/produto/produto-service.js";

export default {
  name: "ProdutosConfig",
  data() {
    return {
      produtos: [],
      termoBusca: '',
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Preço', value: 'preco' },
        { text: 'Estoque', value: 'estoque' },
        { text: 'Ações', value: 'url', filterable: false, },
      ]
    };
  },
  methods: {
    async listarProdutos() {
      const response = await service.listarProdutos();
      if (response.data.success) this.produtos = response.data.data;
      else console.error(response.data.message);
    },
  },
  mounted() {
    this.listarProdutos();
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>