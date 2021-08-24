<template>
  <main id="marcas">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-responsive p-0">
            <div class="table table-responsive p-0">
              <table class="table table-stripe table-valign-middle">
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="marca in marcas" :key="marca.marca_id">
                    <td>{{marca.marca}}</td>
                    <td>
                      <router-link :to="`/admin/marcas/editar/${marca.marca_id}`">
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
        <router-link to="/admin/marcas/novo" class="btn btn-success float-right">
          Nova marca
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from '@/services/marcas/marcas-service'

export default {
  name: "MarcasConfig",
  data() {
    return {
      marcas: [],
      marcaInput: "",
      marcaIdToEdit: null,
      tipoAcao: "Adicionar novo",
      disabled: false,
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

<style>
</style>