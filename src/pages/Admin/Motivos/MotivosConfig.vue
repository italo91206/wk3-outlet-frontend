<template>
  <main id="motivos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <table class="table table-stripe table-valign-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Motivo</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="motivo in motivos" v-bind:key="motivo.motivo_id">
                  <td>{{ motivo.motivo_id }}</td>
                  <td>{{ motivo.motivo }}</td>
                  <td>
                    <router-link :to="`/admin/motivos/editar/${motivo.motivo_id}`">Editar</router-link>
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
        <router-link to="/admin/motivos/novo" class="btn btn-success float-right">
          Novo Motivo
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/motivo/motivos-service.js'

export default {
  name: "MotivosConfig",
  data(){
    return {
      motivos: [],
      motivoToPost: {}
    }
  },
  methods: {
    async listarMotivos(){
      const response = await service.listarMotivos();
      this.motivos = response.data;
    }
  },
  mounted(){
    this.listarMotivos();
  }
};
</script>

<style>
</style>