<template>
  <main id="cupons">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Status</th>
                    <th>Nome do Cupom</th>
                    <th>Valor</th>
                    <th>Validade</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="cupom in cupons" v-bind:key="cupom.cupom_id">
                    <td>{{cupom.cupom_id}}</td>
                    <td>{{cupom.codigo}}</td>
                    <td>{{cupom.status}}</td>
                    <td>{{cupom.nome}}</td>
                    <td>{{cupom.valor}}</td>
                    <td>{{cupom.validade}}</td>
                    <td>
                      <router-link :to="`/admin/cupons/editar/${cupom.cupom_id}`">
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
        <router-link to="/admin/cupons/novo" class="btn btn-success float-right">
          Novo Cupom
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/cupons/cupons-service.js'

export default {
  name: 'CuponsConfig',
  data(){
    return {
      cupons: []
    }
  },
  methods: {
    async listarCupons(){
      const response = await service.listarCupons();
      if(response.data.success)
        this.cupons = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  },
  mounted(){
    this.listarCupons();
  },
  watch:{
    cupons: function(){
      this.cupons.forEach( (item) => {
        if(item.is_fixed){
          let novo = item.valor.toFixed(2)
          item.valor = `R$ ${novo}`;
        }
        else{
          let novo = item.valor.toFixed(2);
          novo = this.pad(novo, 2);
          item.valor = `${novo} %`
        }

        let data = new Date(item.validade);
        let hoje = new Date();

        if(hoje > data)
          item.status = "expirado";
        else
          item.status = "válido";
        
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();

        dia = this.pad(dia, 2);
        mes = this.pad(mes, 2);

        item.validade = `${dia}/${mes}/${ano}`;

      })
    }
  }
}
</script>

<style>

</style>