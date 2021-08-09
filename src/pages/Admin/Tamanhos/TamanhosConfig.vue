<template>
  <main id="tamanhos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <table class="table table-stripe table-valign-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tamanho</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="tamanho in tamanhos" v-bind:key="tamanho.tamanho_id">
                  <td>{{ tamanho.tamanho_id }}</td>
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
  </main>
</template>

<script>
import service from '@/services/tamanhos/tamanhos-service.js'

export default {
  name: 'TamanhosConfig',
  data(){
    return {
      tamanhos: []
    }
  },
  methods: {
    async listarTamanhos(){
      const response = await service.listarTamanhos();
      this.tamanhos = response.data;
    }
  },
  mounted(){
    this.listarTamanhos();
  }
};
</script>

<style>
</style>