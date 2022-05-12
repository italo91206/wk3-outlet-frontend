<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
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
            <template v-slot:item.marca_id="{ item }">
              <router-link
                :to="`/marcas/editar/${item.marca_id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/marcas/novo">
          Nova marca
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>Consultar marcas</template>
      <template #texto>
        <p>
          É exibido a listagem de marcas cadastradas no sistema.<br/><br/>Ao apertar em "editar" o usuário é redirecionado para editar a marca em questão.<br/>Ao apertar em "nova marca", o usuário é redirecionado para inserir uma nova marca.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from '@/services/marcas/marcas-service'

export default {
  name: "MarcasConfig",
  components: {
    Helper
  },
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
