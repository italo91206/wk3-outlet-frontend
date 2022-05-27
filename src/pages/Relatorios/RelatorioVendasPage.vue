<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-col cols="6">
          <BaixarRelatorio
            :headers="headers"
            :dados="vendas"
            tipo-relatorio="vendas"
          />
        </v-col>

        <v-col cols="6">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Filtros
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="3">
                    <v-select
                      label="Por status"
                      :items="status_filter_items"
                      v-model="status_filter_selected"
                      item-text="text"
                      item-value="value"
                    ></v-select>
                  </v-col>

                  <v-col cols="3">
                    <v-select
                      label="Por entrega"
                      :items="delivery_filter_items"
                      v-model="delivery_filter_selected"
                      item-text="text"
                      item-value="value"
                    ></v-select>
                  </v-col>

                  <v-col cols="6">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="dates"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dates"
                          label="Selecionar período"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker
                        v-model="dates"
                        scrollable
                        range
                        locale="pt-BR"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="modal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(dates)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>

                      <v-btn @click="dates = []">
                        Limpar período
                      </v-btn>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
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
            :items="vendas"
            :loading="loading"
            loading-text="Carregando vendas... aguarde"
          >
            <template v-slot:item.data_venda="{ item }">
              {{ item.data_venda | localtime }}
            </template>

            <template v-slot:item.prazo_entrega="{ item }">
              {{ item.prazo_entrega | localtime }}
            </template>

            <template v-slot:item.custo="{ item }">
              {{ item.custo | price }}
            </template>

            <template v-slot:item.lucro="{ item }">
              {{ item.lucro | price }}
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
      vendas_bkp: [],
      vendas: [],
      loading: true,
      termoBusca: '',
      headers: [
        { text: 'ID', value: 'venda_id' },
        { text: 'Valor', value: 'total' },
        { text: 'Cliente', value: 'cliente' },
        { text: 'Status', value: 'status' },
        { text: 'Data', value: 'data_venda' },
        { text: 'Entrega', value: 'prazo_entrega' },
        { text: 'Custo', value: 'custo' },
        { text: 'Lucro', value: 'lucro' },
      ],

      status_filter_selected: { text: 'Todos', value: 'todos' },
      status_filter_items: [
        { text: 'Todos', value: 'todos' },
        { text: 'Aprovados', value: 'aprovado' },
        { text: 'Pendentes', value: 'pendente' },
        { text: 'Cancelados', value: 'cancelado' },
      ],

      delivery_filter_selected: { text: 'Todos', value: 'todos' },
      delivery_filter_items: [
        { text: 'Todos', value: 'todos' },
        { text: 'Sem entrega', value: 'todos' },
        { text: 'Com entrega', value: 'aprovado' },
        { text: 'Entrega pendente', value: 'pendente' },
        { text: 'Entrega confirmada', value: 'cancelado' },
      ],

      dates: [],
      modal: false
    }
  },
  methods: {
    async listarRelatorioVendas(){
      await service.getVendas()
      .then((response) => {
        if(response.data.success){
          this.vendas = response.data.data
          this.vendas_bkp = this.vendas
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
    localtime: function(value){
      if(value == null)
        return "-"
      else{
        let data = new Date(value);
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`
        }
    },
    price: function(value){
      return `R$ ${value.toFixed(2)}`
    }
  },
  watch: {
    status_filter_selected(){
      let value = this.status_filter_selected

      if( value == 'todos' )
        this.vendas = this.vendas_bkp
      else{
        this.vendas = this.vendas_bkp.filter((v) => {
          return v.status == value
        })
      }
    },

    delivery_filter_selected(){
      let value = this.delivery_filter_selected

      if(value == 'todos')
        this.vendas = this.vendas_bkp
      else{
        this.vendas = this.vendas_bkp.filter((v) => {
          return v.prazo_entrega == "value"
        })
      }
    },

    dates(){
      if(this.dates.length == 2){
        this.vendas = this.vendas.filter((v) => {
          let dia_venda = new Date(v.data_venda)
          let dia_maior = new Date(this.dates[1])
          let dia_menor = new Date(this.dates[0])

          return dia_venda >= dia_menor && dia_venda <= dia_maior
        })
      }
      else if(this.dates.length == 0)
        this.vendas = this.vendas_bkp
    }
  }
}
</script>

<style lang="css">
</style>
