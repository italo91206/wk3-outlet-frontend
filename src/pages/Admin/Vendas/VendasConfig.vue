<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por venda"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="vendas"
            :loading="loading"
            loading-text="Carregando vendas... aguarde"
          >
            <template v-slot:item.venda_id="{ item }">
              <router-link
                :to="`/admin/vendas/venda/${item.venda_id}`"
              >
                Ver mais
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/vendas/vendas-service.js'

export default {
  name: 'VendasConfig',
  data(){
    return {
      vendas: [],
      termoBusca: '',
      loading: true,
      headers: [ 
        { text: 'Data da venda', value: 'data_venda' },
        { text: 'Valor da venda', value: 'total' },
        { text: 'Cliente', value: 'cliente' },
        { text: 'Ações', value: 'venda_id' },
      ]
    }
  },
  methods: {
    async listarVendas(){
      const response = await service.listarVendas();
      if(response.data.success){
        this.vendas = response.data.data;
        this.loading = false;
      }
      else{
        this.loading = false;
        console.error(response.data.message);
      }
    }
  },
  mounted(){
    this.listarVendas();
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>