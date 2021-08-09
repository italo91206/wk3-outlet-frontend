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
                    <td>{{cupom.status | status}}</td>
                    <td>{{cupom.nome}}</td>
                    <td>{{cupom.valor}}</td>
                    <td>{{cupom.validade}}</td>
                    <td>
                      <router-link to="/">
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
      this.cupons = response.data;
    }
  },
  mounted(){
    this.listarCupons();
  },
  filters:{
    status: function(){
      console.log(this);
      return '';
    }
  }
}
</script>

<style>

</style>