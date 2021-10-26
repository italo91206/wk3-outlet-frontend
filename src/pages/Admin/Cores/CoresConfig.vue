<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por cor"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="cores"
            :loading="cores.length == 0"
            loading-text="Carregando cores... aguarde"
          >
            <template v-slot:item.hexa="{ item }">
              <div
                :style="`background-color: ${item.hexa}`"
                class="color-swatch"
              ></div>
            </template>

            <template v-slot:item.cor_id="{ item }">
              <router-link
                :to="`/admin/cores/editar/${item.cor_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/cores/novo">
          Nova cor
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
       Local na qual é contido as cores disponibilizadas e integradas pelo usuário. É exibido informações básicas como o nome da cor e a pré-visualização da cor em si.<br/>Ao apertar em "Editar" o usuário é redirecionado para a tela de edição da cor em questão.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/cores/cor-service.js";

export default {
  name: "CoresConfig",
  components: {
    Helper
  },
  data() {
    return {
      cores: [],
      termoBusca: '',
      headers: [
        { text: 'Cor', value: 'hexa' },
        { text: 'Nome', value: 'cor' },
        { text: 'Ações', value: 'cor_id' },
      ]
    };
  },
  methods: {
    async listarCores() {
      const response = await service.listarCores();
      if(response.data.success)
        this.cores = response.data.data;
      else{
        console.error(response.data.message);
      }
    },
  },
  mounted() {
    this.listarCores();
  },
};
</script>

<style lang="css" scoped>
.color-swatch {
  width: 24px;
  height: 24px;
}

.row+.row {
  margin-top: 24px;
}
</style>