<template>
  <main id="acertos-config">
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
  </main>
</template>

<script>
import service from '@/services/acerto-estoque/acerto-estoque-service.js'

export default {
  name: 'AcertosConfig',
  data() {
    return {
      acertos: []
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
      })
    }
  }
}
</script>

<style>

</style>