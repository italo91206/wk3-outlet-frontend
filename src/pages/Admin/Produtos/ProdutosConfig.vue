<template>
  <v-main>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="termoBusca"
          append-icon="mdi-magnify"
          label="Buscar por termo"
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

    <v-btn to="/admin/produtos/novo">
      Novo produto
    </v-btn>
  </v-main>
  <!-- <main id="produtos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <table class="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="produto in produtos" v-bind:key="produto.id">
                  <td>{{ produto.nome }}</td>
                  <td>{{ produto.preco | preco }}</td>
                  <td>{{ produto.estoque }}</td>
                  <td>
                    <router-link :to="`/admin/produtos/editar/${produto.url}`"
                      >Editar</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link to="/admin/produtos/novo">
          <button class="btn btn-success float-right">Novo Produto</button>
        </router-link>
      </div>
    </div>
  </main> -->
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

<style>
</style>