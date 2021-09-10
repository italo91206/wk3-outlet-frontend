<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por marca"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="marcas"
            :loading="marcas.length == 0"
            loading-text="Carregando marcas... aguarde"
          >
            <template v-slot:item.url="{ item }">
              <router-link
                :to="`/admin/marca/editar/${item.url}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/marcas/novo">
          Nova marca
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
  
  <!-- <main id="marcas">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="marca in marcas" :key="marca.marca_id">
                    <td>{{marca.marca}}</td>
                    <td>
                      <router-link :to="`/admin/marcas/editar/${marca.marca_id}`">
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
        <router-link to="/admin/marcas/novo" class="btn btn-success float-right">
          Nova marca
        </router-link>
      </div>
    </div>
  </main> -->
</template>

<script>
import service from '@/services/marcas/marcas-service'

export default {
  name: "MarcasConfig",
  data() {
    return {
      marcas: [],
      termoBusca: '',
      headers: [
        { text: 'Marca', value: 'marca' },
        { text: 'Ações', value: 'marca_id' },
      ]
    };
  },
  methods: {
    async listarMarcas() {
      const response = await service.getMarcas();
      if(response.data.success)
        this.marcas = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
  },
  mounted() {
    this.listarMarcas();
  },
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>