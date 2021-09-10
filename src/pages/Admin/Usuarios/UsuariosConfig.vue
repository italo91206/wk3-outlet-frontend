<template>
  <v-main>
    <v-container>
      <v-row>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="termoBusca"
              append-icon="mdi-magnify"
              label="Buscar por usuário"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :search="termoBusca"
            :items="usuarios"
            :loading="usuarios.length == 0"
            loading-text="Carregando usuários... aguarde"
          >
            <template v-slot:item.id="{ item }">
              <router-link
                :to="`/admin/usuarios/editar/${item.id}`"
              >
                Editar
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      
      <v-row class="float-right">
        <v-btn color="success" to="/admin/usuario/novo">
          Novo usuário
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from "@/services/usuarios/usuario-service.js"

export default {
  name: "UsuariosConfig",
  data() {
    return {
      usuarios: [],
      termoBusca: '',
      headers: [
        { text: 'Nome', value: 'nomeCompleto' },
        { text: 'Email', value: 'email' },
        { text: 'Permissões', value: 'permissao' },
        { text: 'Ações', value: 'id' },
      ]
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
  },
  watch: {
    usuarios: function() {
      this.usuarios.forEach((item) => {
        item.nomeCompleto = `${item.nome} ${item.sobrenome}`;
        if(item.isAdmin)
          item.permissao = 'Administrador';
        else if(item.isEmployee)
          item.permissao = 'Funcionário';
        else
          item.permissao = 'Cliente';
      })
    }
  }
};
</script>

<style lang="css" scoped>
.row+.row {
  margin-top: 24px;
}
</style>