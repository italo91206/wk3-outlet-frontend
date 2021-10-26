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
            <template v-slot:item.endereco_id="{ item }">
              {{ item.endereco_id == null ? 'Não' : 'Sim'}}
            </template>

            <template v-slot:item.venda_id="{ item }">
              <router-link
                :to="`/admin/vendas/${item.venda_id}`"
              >
                Ver mais
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>
    <Helper>
      <p>
        Aqui estão todas as vendas realizadas e o status de cada um. Ao clicar em “ver mais”, será possível encontrar informações mais detalhadas sobre a venda específica
      </p>
    </Helper>

  </v-main>
</template>

<script>
import service from '@/services/vendas/vendas-service.js'
import Helper from '@/components/Helper.vue'

export default {
  name: 'VendasConfig',
  components: {
    Helper
  },
  data(){
    return {
      vendas: [],
      termoBusca: '',
      loading: true,
      headers: [ 
        { text: 'Data da venda', value: 'data_venda' },
        { text: 'Valor da venda', value: 'total' },
        { text: 'Cliente', value: 'cliente' },
        { text: 'Possui entrega', value: 'endereco_id'},
        { text: 'Status', value: 'status' },
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
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  },
  mounted(){
    this.listarVendas();
  },
  watch: {
    vendas: function(){
      this.vendas.forEach((item) => {
        let data = new Date(item.data_venda);
        
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();

        dia = this.pad(dia, 2);
        mes = this.pad(mes, 2);

        item.data_venda = `${dia}/${mes}/${ano}`;

        item.total = `R$ ${item.total.toFixed(2)}`
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