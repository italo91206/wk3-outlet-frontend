<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-card class="w100 pa-12" elevation="5">
          <v-form v-model="isValidForm" ref="form" @submit.prevent>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Nome"
                  v-model="usuarioToPost.nome"
                  :rules="[rules.required, rules.specialCharacters]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  label="Sobrenome"
                  v-model="usuarioToPost.sobrenome"
                  :rules="[rules.required, rules.specialCharacters]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-select
                  v-model="tipoPermissoes"
                  :items="permissoes"
                  item-text="nome"
                  item-value="key"
                  label="Tipo de permissão"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="Email"
                  v-model="usuarioToPost.email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  v-model="usuarioToPost.password"
                  @click:append="show = !show"
                  label="Senha"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/usuarios" class="mr-2">Voltar</v-btn>
        <v-btn
          @click="salvarUsuario"
          :disabled="isValidForm == false"
          color="success"
          >Salvar usuário</v-btn
        >
      </v-row>
    </v-container>

    <Helper>
      <template #titulo> Adicionar novo usuário </template>

      <template #texto>
        <p>
          A tela de adicionar um novo usuário possibilita a inserção de campos
          como nome, sobrenome, tipo de permissão, e-mail e senha do usuário.
          Por padrão o usuário já é cadastrado com o perfil habilitado.<br />
          Para inserir informações adicionais de cadastro, basta consultar logo
          após.
        </p>
      </template>
    </Helper>
  </v-main>
</template>

<script>
import Helper from "@/components/Helper.vue";
import service from "@/services/usuarios/usuario-service.js";
import rules from "@/utils/rules.js";

export default {
  name: "UsuariosNovo",
  components: {
    Helper,
  },
  data() {
    return {
      usuarioToPost: {},
      show: "password",
      rules: rules,
      isValidForm: false,
      tipoCargo: 0,
      tipoPermissoes: { nome: "Cliente", key: "0" },
      permissoes: [
        { nome: "Cliente", key: "0" },
        { nome: "Funcionário", key: "1" },
        { nome: "Administrador", key: "2" },
      ],
    };
  },
  mounted() {
    const is_admin = this.$store.getters["perfil/isAdmin"];
    if (!is_admin)
      this.permissoes = this.permissoes.filter(
        (permissao) => permissao.nome != "Administrador"
      );
  },
  methods: {
    mudou() {
      this.isChanged = false;
    },
    async salvarUsuario() {
      this.$refs.form.validate();

      if (this.isValidForm) {
        const response = await service.novoUsuario(this.usuarioToPost);
        if (response.data.success) {
          this.$toast.success("Usuário cadastrado com sucesso");
          this.$router.push("/usuarios");
        } else this.$toast.error(response.data.message);
      }
    },
  },
  watch: {
    tipoPermissoes() {
      if (this.tipoPermissoes == 0) {
        this.usuarioToPost.isEmployee = false;
        this.usuarioToPost.isAdmin = false;
      } else if (this.tipoPermissoes == 1) {
        this.usuarioToPost.isEmployee = true;
        this.usuarioToPost.isAdmin = false;
      } else if (this.tipoPermissoes == 2) {
        this.usuarioToPost.isEmployee = true;
        this.usuarioToPost.isAdmin = true;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.row + .row {
  margin-top: 24px;
}
</style>
