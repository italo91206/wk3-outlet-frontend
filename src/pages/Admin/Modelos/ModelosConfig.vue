<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por modelo"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="modelos"
            :loading="modelos.length == 0"
            loading-text="Carregando modelos... aguarde"
          >
            <template v-slot:item.modelo_id="{ item }">
              <router-link
                :to="`/admin/modelos/editar/${item.modelo_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/admin/modelos/novo">
          Novo modelo
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from '@/services/modelos/modelos-service.js'

export default {
  name: "ModelosConfig",
  data() {
    return {
      modelos: [],
      termoBusca: '',
      headers: [
        { text: 'Modelo', value:'modelo' },
        { text: 'Ações', value: 'modelo_id' }
      ]
    };
  },
  methods: {
    async listarModelos() {
      const response = await service.verModelos();
      if(response.data.success)
        this.modelos = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
  },
  mounted() {
    this.listarModelos();
  },
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>