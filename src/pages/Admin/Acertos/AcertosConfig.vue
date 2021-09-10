<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
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
  </v-main>
  
  <!-- <main id="acertos-config">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-response p-0">
            <table class="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th>Data de alteração</th>
                  <th>Produto</th>
                  <th>Estoque (anterior)</th>
                  <th>Motivo</th>
                  <th>Usuario</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="acerto in acertos" :key="acerto.key">
                  <td>{{ acerto.data }}</td>
                  <td>{{ acerto.produto }}</td>
                  <td>{{ acerto.valor_anterior }} ({{ acerto.valor_novo }})</td>
                  <td>{{ acerto.motivo }}</td>
                  <td>{{ acerto.usuario }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main> -->
</template>

<script>
import service from '@/services/acerto-estoque/acerto-estoque-service.js'

export default {
  name: 'AcertosConfig',
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