<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100">
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
        <v-btn color="success" to="/admin/usuarios/novo">
          Novo usuário
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <p>
        É exibido a listagem de usuários cadastrados no sistema. As colunas informam alguns dados básicos como: nome do funcionário, email, tipo de permissão e caso o usuário esteja habilitado.<br/><br/>Ao apertar em "editar" o usuário é redirecionado para editar o usuário em questão.<br/>Ao apertar em "novo usuário", o usuário é redirecionado para inserir um novo usuário.
      </p>
    </Helper>
  </v-main>
</template>

<script>
import Helper from '@/components/Helper.vue'
import service from "@/services/usuarios/usuario-service.js"

export default {
  name: "UsuariosConfig",
  components: {
    Helper
  },
  data() {
    return {
      usuarios: [],
      termoBusca: '',
      headers: [
        { text: 'Nome', value: 'nomeCompleto' },
        { text: 'Email', value: 'email' },
        { text: 'Permissões', value: 'permissao' },
        { text: 'Habilitado', value: 'is_enabled'},
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
        item.is_enabled = item.is_enabled == true ? 'Sim' : 'Não';
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