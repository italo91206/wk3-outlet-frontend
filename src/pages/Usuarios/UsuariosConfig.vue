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
            :items="enabled_only_filter ? getEnabledOnly : usuarios"
            :loading="usuarios.length == 0"
            loading-text="Carregando usuários... aguarde"
          >
            <template v-slot:item.id="{ item }">
              <router-link
                :to="`/usuarios/editar/${item.id}`"
              >
                Editar
              </router-link>
            </template>

            <template v-slot:top>
              <v-col>
                <v-checkbox
                  v-model="enabled_only_filter"
                  label="Mostrar somente habilitados"
                ></v-checkbox>
              </v-col>
            </template>
          </v-data-table>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn color="success" to="/usuarios/novo">
          Novo usuário
        </v-btn>
      </v-row>
    </v-container>

    <Helper>
      <template #titulo>
        Consulta de usuários
      </template>

      <template #texto>
        <p>
          É exibido a listagem de usuários cadastrados no sistema. As colunas informam alguns dados básicos como: nome do funcionário, email, tipo de permissão e caso o usuário esteja habilitado.<br/>
          <br/>Ao apertar em "editar" é redirecionado para editar o usuário em questão.
          <br/>Ao apertar em "novo usuário" é redirecionado para inserir um novo usuário.
        </p>
      </template>

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
      enabled_only_filter: true,
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
  computed: {
    getEnabledOnly(){
      return this.usuarios.filter((u) => { return u.is_enabled == 'Sim' })
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
