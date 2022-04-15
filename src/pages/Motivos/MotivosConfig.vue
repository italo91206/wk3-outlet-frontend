<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por motivo"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="motivos"
            :loading="motivos.length == 0"
            loading-text="Carregando motivos... aguarde"
          >
            <template v-slot:item.motivo_id="{ item }">
              <router-link
                :to="`/motivos/editar/${item.motivo_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/motivos/novo">
          Novo Motivo
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        É exibido a listagem de motivos cadastrados no sistema.<br/><br/>Ao apertar em "editar" o usuário é redirecionado para editar o motivo em questão.<br/>Ao apertar em "novo motivo", o usuário é redirecionado para inserir um novo motivo.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/motivo/motivos-service.js'

export default {
  name: "MotivosConfig",
  components: {
    Helper
  },
  data(){
    return {
      motivos: null,
      termoBusca: '',
      headers: [
        { text: 'Motivo', value: 'motivo'},
        { text: 'Ações', value: 'motivo_id'},
      ]
    }
  },
  methods: {
    async listarMotivos(){
      const response = await service.listarMotivos();
      if(response.data.success)
        this.motivos = response.data.data;
      else{
        console.error(response.data.message);
      }
    }
  },
  mounted(){
    this.listarMotivos();
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>
