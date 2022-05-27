<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <BaixarRelatorio
          :headers="headers"
          :dados="usuarios"
          tipo-relatorio="usuarios"
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
            :items="usuarios"
            :loading="loading"
            loading-text="Carregando usuarios... aguarde"
          >
            <template v-slot:item.total_unitario="{ item }">
              {{ item.total_unitario | emptyValue }}
            </template>

            <template v-slot:item.total_valor="{ item }">
              R$ {{ item.total_valor | emptyValue }}
            </template>

            <!-- <template v-slot:top>
              <v-col>
                <v-checkbox
                  v-model="enabled_only_filter"
                  label="Mostrar somente habilitados"
                ></v-checkbox>
              </v-col>
            </template> -->
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
      usuarios: [],
      loading: true,
      termoBusca: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome_completo' },
        { text: 'Função', value: 'permissao' },
        { text: 'R$ vendidos', value: 'total_valor' },
        { text: 'Un. vendidas', value: 'total_unitario' },
      ],
      enabled_only_filter: true,
    }
  },
  methods: {
    async listarRelatorioUsuarios(){
      await service.getUsuarios()
      .then((response) => {
        if(response.data.success){
          this.usuarios = response.data.data
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
    this.listarRelatorioUsuarios();
  },
  filters: {
    emptyValue: function(value){
      return value == undefined || value == null ? '-' : value
    }
  },
  watch: {
    usuarios: function() {
      this.usuarios.forEach((item) => {
        item.nome_completo = `${item.nome} ${item.sobrenome}`;
        item.is_enabled = item.is_enabled == true ? 'Sim' : 'Não';
        if(item.isAdmin)
          item.permissao = 'Administrador';
        else if(item.isEmployee)
          item.permissao = 'Funcionário';
        else
          item.permissao = 'Cliente';
      })
    }
  }
}
</script>

<style lang="css">
</style>
