<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por acerto"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="acertos"
            :loading="acertos.length == 0"
            loading-text="Carregando acertos... aguarde"
          >
          </v-data-table>
        </v-card>
      </v-row>
    </v-container>

    <Helper>
      <p>
        Aqui estão todas os acertos de estoque realizados, com informações sobre qual usuário realizou a ação, quando foi realizado, sob qual motivo e a entrada (ou saída) de quantidade no estoque.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import service from '@/services/acerto-estoque/acerto-estoque-service.js'
import Helper from '@/components/Helper.vue'

export default {
  name: 'AcertosConfig',
  components: {
    Helper
  },
  data() {
    return {
      acertos: [],
      termoBusca: '',
      headers: [
        { text: 'Data alteração', value: 'data' },
        { text: 'Produto', value: 'produto' },
        { text: 'Estoque (anterior)', value: 'valor' },
        { text: 'Motivo', value: 'motivo' },
        { text: 'Usuário', value: 'usuario' },
      ]
    }
  },
  methods: {
    async listarAcertos(){
      const response = await service.listarAcertos();
      if(response.data.success)
        this.acertos = response.data.data;
      else
        console.error(response.data.message);
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  },
  mounted(){
    this.listarAcertos();
  },
  watch: {
    acertos: function(){
      this.acertos.forEach( (item) => {
        let data = new Date(item.data);
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();

        dia = this.pad(dia, 2);
        mes = this.pad(mes, 2);

        item.data = `${dia}/${mes}/${ano}`;

        let valor = Math.abs(item.valor_anterior - item.valor_novo);
        if(valor > 0)
          item.valor = `+ ${valor}`;
        else
          item.valor = `- ${valor}`
      })
    }
  }
}
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>