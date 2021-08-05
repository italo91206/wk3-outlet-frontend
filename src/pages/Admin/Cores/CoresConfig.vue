<template>
  <main id="cores">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-response p-0">
            <table class="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cor</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="cor in cores" :key="cor.id">
                  <td>{{ cor.cor_id }}</td>
                  <td>
                    <div
                      :style="`background-color: ${cor.hexa}`"
                      class="color-swatch"
                    ></div>
                  </td>
                  <td>{{ cor.cor }}</td>
                  <td>
                    <router-link :to="`/admin/cores/editar/${cor.cor_id}`"
                      >Editar</router-link
                    >
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
        <router-link to="/admin/cores/novo">
          <button class="btn btn-success float-right">Nova Cor</button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from "@/services/cores/cor-service.js";

export default {
  name: "CoresConfig",
  data() {
    return {
      cores: [],
    };
  },
  methods: {
    async listarCores() {
      const response = await service.listarCores();
      this.cores = response.data;
    },
  },
  mounted() {
    this.listarCores();
  },
};
</script>

<style>
.color-swatch {
  width: 24px;
  height: 24px;
}
</style>