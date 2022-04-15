<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por tamanho"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="tamanhos"
            :loading="tamanhos.length == 0"
            loading-text="Carregando tamanhos... aguarde"
          >
            <template v-slot:item.tamanho_id="{ item }">
              <router-link
                :to="`/tamanhos/editar/${item.tamanho_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/tamanhos/novo">
          Novo tamanho
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        É exibido a listagem de tamanhos cadastrados no sistema.<br/><br/>Ao apertar em "editar" o usuário é redirecionado para editar o tamanho em questão.<br/>Ao apertar em "novo tamanho", o usuário é redirecionado para inserir um novo tamanho.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/tamanhos/tamanhos-service.js'

export default {
  name: 'TamanhosConfig',
  components: {
    Helper
  },
  data(){
    return {
      tamanhos: [],
      termoBusca: '',
      headers: [
        { text: 'Tamanho', value: 'tamanho' },
        { text: 'Ações', value: 'tamanho_id' },
      ]
    }
  },
  methods: {
    async listarTamanhos(){
      const response = await service.listarTamanhos();
      if(response.data.success)
        this.tamanhos = response.data.data;
      else{
        console.error(response.data.message);
      }
    }
  },
  mounted(){
    this.listarTamanhos();
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>
