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
            no-data-text="Sem vendas no sistema."
            loading-text="Carregando vendas... aguarde"
          >
            <template v-slot:item.endereco_id="{ item }">
              {{ item.endereco_id == null ? 'Não' : 'Sim'}}
            </template>

            <template v-slot:item.venda_id="{ item }">
              <router-link
                :to="`/vendas/${item.venda_id}`"
              >
                Ver mais
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>
    <Helper>
      <template #titulo>
        Consulta de vendas
      </template>

      <template #texto>
        <p>
          Aqui estão todas as vendas realizadas e o status de cada um. Ao clicar em <b>“ver mais”</b> será possível encontrar informações mais detalhadas da venda
        </p>
      </template>
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
      await service.listarVendas()
        .then((response) => {
          if(response.data.success){
            this.vendas = response.data.data
          }
          else{
            this.$toast.error(response.data.message)
          }
        })
        .catch((error) => {
          this.$toast.error("Algo deu errado.")
          console.log(error)
        })
        .finally(() => { this.loading = false })
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
