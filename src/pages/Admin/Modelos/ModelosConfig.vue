<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
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

      <v-row class="float-rigth">
        <v-btn color="success" to="/admin/modelos/novo">
          Novo modelo
        </v-btn>
      </v-row>
    </v-container>
  </v-main>

  <!-- <main id="modelos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="modelo in modelos" :key="modelo.modelo_id">
                    <td>{{modelo.modelo}}</td>
                    <td>
                      <router-link :to="`/admin/modelos/editar/${modelo.modelo_id}`">
                        Editar
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link to="/admin/modelos/novo" class="btn btn-success float-right">
          Novo modelo
        </router-link>
      </div>
    </div>
  </main> -->
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