<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
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
                :to="`/admin/motivos/editar/${item.motivo_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/admin/motivos/novo">
          Novo Motivo
        </v-btn>
      </v-row>
    </v-container>
  </v-main>

  <!-- <main id="motivos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <table class="table table-stripe table-valign-middle">
              <thead>
                <tr>
                  <th>Motivo</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="motivo in motivos" v-bind:key="motivo.motivo_id">
                  <td>{{ motivo.motivo }}</td>
                  <td>
                    <router-link :to="`/admin/motivos/editar/${motivo.motivo_id}`">Editar</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link to="/admin/motivos/novo" class="btn btn-success float-right">
          Novo Motivo
        </router-link>
      </div>
    </div>
  </main> -->
</template>

<script>
import service from '@/services/motivo/motivos-service.js'

export default {
  name: "MotivosConfig",
  data(){
    return {
      motivos: [],
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