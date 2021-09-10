<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
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
                :to="`/admin/tamanhos/editar/${item.tamanho_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/tamanhos/novo">
          Novo tamanho
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
  
  <!-- <main id="tamanhos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <table class="table table-stripe table-valign-middle">
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="tamanho in tamanhos" v-bind:key="tamanho.tamanho_id">
                  <td>{{ tamanho.tamanho }}</td>
                  <td>
                    <router-link :to="`/admin/tamanhos/editar/${tamanho.tamanho_id}`">
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

    <div class="row">
      <div class="col-lg-12">
        <router-link to="/admin/tamanhos/novo" class="btn btn-success float-right">
          Novo Tamanho
        </router-link>
      </div>
    </div>
  </main> -->
</template>

<script>
import service from '@/services/tamanhos/tamanhos-service.js'

export default {
  name: 'TamanhosConfig',
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