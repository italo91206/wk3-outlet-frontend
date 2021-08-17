<template>
  <main id="modelos">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Modelo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="modelo in modelos" :key="modelo.modelo_id">
                    <td>{{modelo.modelo_id}}</td>
                    <td>{{modelo.modelo}}</td>
                    <td>
                      <router-link :to="`/admin/modelos/editar/${modelo.modelo_id}`">
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
        <router-link to="/admin/modelos/novo" class="btn btn-success float-right">
          Novo modelo
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/modelos/modelos-service.js'

export default {
  name: "ModelosConfig",
  data() {
    return {
      modelos: [],
      modeloInput: "",
      modeloIdToEdit: null,
      tipoAcao: "Adicionar novo",
      disabled: false,
    };
  },
  methods: {
    async listarModelos() {
      const response = await service.verModelos();
      if(response.data.success)
        this.modelos = response.data.data;
      else
        this.$toast.error(response.data.message);
    },
  },
  mounted() {
    this.listarModelos();
  },
};
</script>

<style>
</style>