<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <BaixarRelatorio
          :headers="headers"
          :dados="produtos"
          tipo-relatorio="produtos"
        />
      </v-row>

      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="produtos"
            :loading="loading"
            loading-text="Carregando vendas... aguarde"
          >
            <template v-slot:item.total_unitario="{ item }">
              {{ item.total_unitario | emptyValue }}
            </template>

            <template v-slot:item.total_valor="{ item }">
              {{ item.total_valor | emptyValue }}
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Relatório de vendas
      </template>

      <template #texto>
        <p>
          Nesta página você tem uma visualização geral de todas as suas vendas com base nos seguintes filtros:<br/>
          <br/>
          <b>Por período</b> - Por semana, mês ou período selecionado<br/>
          <b>Por produto</b> - Por produto(s) selecionado<br/>
          <b>Por categoria</b> - Por categoria(s) selecionado<br/>
          <b>Por estoque</b> - Por quantidade de estoque
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/relatorios/relatorio-service.js";
import BaixarRelatorio from "@/components/BaixarRelatorioButton.vue"

export default {
  name: 'RelatorioVendasPage',
  components: { Helper, BaixarRelatorio },
  data(){
    return {
      produtos: [],
      loading: true,
      termoBusca: '',
      headers: [
        { text: 'ID', value: 'produto_id' },
        { text: 'Nome', value: 'nome_produto' },
        { text: 'Valor', value: 'preco' },
        { text: 'Vendas (un)', value: 'total_unitario' },
        { text: 'Estoque', value: 'estoque' },
        { text: 'Vendas (R$)', value: 'total_valor' }
      ],
      enabled_only_filter: true,
    }
  },
  methods: {
    async listarRelatorioVendas(){
      await service.getProdutos()
      .then((response) => {
        if(response.data.success){
          this.produtos = response.data.data
        }
        else
          this.$toast.error(response.data.message)
      })
      .catch((error) => {
        this.$toast.error('Algo deu errado')
        console.log(error)
      })
      .finally(() => { this.loading = false })
    },
  },
  mounted(){
    this.listarRelatorioVendas();
  },
  filters: {
    emptyValue: function(value){
      return value == undefined || value == null ? '-' : value
    }
  }
}
</script>

<style lang="css">
</style>
