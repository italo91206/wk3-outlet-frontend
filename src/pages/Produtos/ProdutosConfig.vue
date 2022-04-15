<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
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
            :items="enabled_only_filter ? getEnabledOnly : produtos"
            :loading="loading"
            loading-text="Carregando produtos... aguarde"
          >
            <template v-slot:item.url="{ item }">
              <router-link
                :to="`/produtos/editar/${item.url}`"
              >
                Editar
              </router-link>
            </template>

            <template v-slot:top>
              <v-col>
                <v-checkbox
                  v-model="enabled_only_filter"
                  label="Mostrar somente habilitados"
                ></v-checkbox>
              </v-col>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/produtos/novo">
          Novo produto
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        O referido setor consta com todos os produtos cadastrados e alguns atributos. O usuário tem a possibilidade de buscar pelo produtor a partir de referências constatadas em sua integração ao catálogo, oferecendo ao cliente a barra “buscar por produto”.<br/><br/>O produto abrange nome, preço, estoque; SKU, URL e ações com a possibilidade de serem editadas, oferecendo informações mais detalhadas sobre o produto em específico, local no qual seu detalhamento pode ser alterado.<br/><br/>Ao clicar em “novo produto”, será possível ir para o setor de catálogo - produto - novo, dirigindo-se a criação de um novo produto em catálogo.
      </p>
    </Helper>

  </v-main>
</template>

<script>
import service from "@/services/produto/produto-service.js";
import Helper from '@/components/Helper.vue'

export default {
  name: "ProdutosConfig",
  components: {
    Helper
  },
  data() {
    return {
      produtos: [],
      loading: true,
      termoBusca: '',
      headers: [
        { text: 'Habilitado', value: 'is_enabled' },
        { text: 'Nome', value: 'nome_produto' },
        { text: 'Preço', value: 'preco' },
        { text: 'Estoque', value: 'estoque' },
        { text: 'SKU', value: 'sku' },
        { text: 'URL', value: 'url_visual' },
        { text: 'Ações', value: 'url', filterable: false, },
      ],
      enabled_only_filter: true,
    };
  },
  methods: {
    async listarProdutos() {
      const response = await service.listarProdutos();
      if (response.data.success){
        this.loading = false;
        this.produtos = response.data.data;
      }
      else
        console.error(response.data.message);
    },
  },
  mounted() {
    this.listarProdutos();
  },
  computed: {
    getEnabledOnly(){
      return this.produtos.filter((c) => { return c.is_enabled == 'Sim' })
    }
  },
  filters: {
    preco: function (value) {
      return `R$ ${value.toFixed(2)}`;
    },
  },
  watch: {
    produtos: function(){
      this.produtos.forEach((item) => {
        item.url_visual = item.url;
        item.is_enabled = item.is_enabled ? 'Sim' : 'Não'
      })
    }
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>
