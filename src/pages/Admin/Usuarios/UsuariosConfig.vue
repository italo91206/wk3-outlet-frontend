<template>
  <main id="usuarios-config-page">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body table-response p-0">
            <table class="table table-striped table-valign-middle">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Permissões</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                  <td>{{ usuario.nome }} {{ usuario.sobrenome }}</td>
                  <td>{{ usuario.email }}</td>
                  <td v-if="usuario.isAdmin">Administrador</td>
                  <td v-else-if="usuario.isEmployee">Funcionário</td>
                  <td v-else>Cliente</td>
                  <td><router-link :to="`/admin/usuarios/editar/${usuario.id}`">Editar</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link class="btn btn-success float-right" to="/admin/usuario/novo">Adicionar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from "@/services/usuarios/usuario-service.js"

export default {
  name: "UsuariosConfig",
  data() {
    return {
      usuarios: []
    }
  },
  methods: {
    async getUsuarios(){
      const response = await service.listarUsuarios();
      if(response.data.success)
        this.usuarios = response.data.data;
      else
        console.error(response.data.message);
    }
  },
  mounted(){
    this.getUsuarios();
  }
};
</script>

<style>
</style>