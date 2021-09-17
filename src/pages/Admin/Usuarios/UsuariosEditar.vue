<template>
  <v-main class="pa-12">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="w100 pa-5" elevation="10">
            <v-btn v-bind:class="{ etapaAtivo: etapa == 1}" class="w100" @click="setEtapa(1)">Inf. Básicas</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 2}" class="w100" @click="setEtapa(2)">Inf. Avançadas</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 3}" class="w100" @click="setEtapa(3)">Compras</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 4}" class="w100" @click="setEtapa(4)">Acertos</v-btn>
            <v-btn v-bind:class="{ etapaAtivo: etapa == 5}" class="w100" @click="setEtapa(5)">Newsletter</v-btn>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-card class="w100 pa-10" elevation="10">
            <div class="w100" v-if="etapa == 1">
              <v-form>
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    v-model="usuario.nome"
                  ></v-text-field>

                  <v-text-field
                    label="Sobrenome"
                    v-model="usuario.sobrenome"
                  ></v-text-field>

                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      label="Pessoa Jurídica"
                      value="pj"
                    ></v-radio>    

                    <v-radio
                      label="Pessoa Física"
                      value="pf"
                    ></v-radio>
                  </v-radio-group>

                  <v-select
                    v-model="tipoPermissoes"
                    :items="permissoes"
                    item-text="nome"
                    item-value="key"
                    label="Tipo de permissão"
                  ></v-select>

                  <v-text-field
                    label="RG"
                    v-model="usuario.rg"
                  ></v-text-field>

                  <v-text-field
                    label="CPF"
                    v-model="usuario.cpf"
                  ></v-text-field>
                </v-col>
              </v-form>
            </div>

            <div class="w100" v-if="etapa == 2">
              <h3>Informações avançadas. Ainda não está pronto</h3>
            </div>

            <div class="w100" v-if="etapa == 3">
              <h3>Compras efetuadas pelo usuário. Ainda não está pronto</h3>
            </div>

            <div class="w100" v-if="etapa == 4">
              <h3>Acertos de estoque efetuadas pelo usuário. Ainda não está pronto</h3>
            </div>

            <div class="w100" v-if="etapa == 5">
              <h3>Newsletter assinado pelo cliente. Ainda não está pronto</h3>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="float-right">
        <v-btn to="/admin/usuarios" class="mr-2">Voltar</v-btn>
        <v-btn @click="deletar" color="error" class="mr-2">Deletar usuário</v-btn>
        <v-btn @click="atualizarUsuario" color="success">Salvar usuário</v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from "@/services/usuarios/usuario-service.js";
import validar from "@/utils/validacoes.js";

export default {
  name: "UsuariosEditar",
  data() {
    return {
      usuario: {},
      isAdmin: false,
      isEmployee: false,
      isChanged: true,
      etapa: 1,
      erro_nome: null,
      erro_sobrenome: null,
      radioGroup: null,
      tipoPermissoes: 0,
      permissoes: [
        { nome: 'Cliente', key: '0'},
        { nome: 'Funcionário', key: '1'},
        { nome: 'Administrador', key: '2'},
      ],
    };
  },
  methods: {
    async listarUsuario(id) {
      const response = await service.listarUsuario(id);
      if (response.data.success) {
        this.usuario = response.data.data;
      } else {
        this.$toast.error(response.data.message);
        this.$router.push("/admin/usuarios");
      }
    },
    async deletarUsuario(id) {
      const response = await service.deletarUsuario(id);
      if (response.data.success) {
        this.$toast.success("Usuário foi removido com sucesso!");
        this.$router.push("/admin/usuarios");
      } else this.$toast.error(response.data.message);
    },
    async atualizarUsuario() {
      const response = await service.atualizarUsuario(this.usuario);
      if (response.data.success) {
        this.$toast.success("Usuário foi atualizado com sucesso!");
        this.$router.push("/admin/usuarios");
      } else this.$toast.error(response.data.message);
    },
    mudarPessoa(tipo) {
      if (tipo == "pj") this.usuario.isCompany = true;
      else if (tipo == "pf") this.usuario.isCompany = false;
    },
    mudou() {
      this.isChanged = false;
    },
    setEtapa(num) {
      this.etapa = num;
    },
    deletar() {
      let id = this.$route.params.id;
      this.deletarUsuario(id);
    },
    validar_nome(e) {
      this.erro_nome = validar.validarNome(e.target.value);
    },
    validar_sobrenome(e) {
      this.erro_sobrenome = validar.validarNome(e.target.value);
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.listarUsuario(id);
  },
  watch: {
    usuario: function() {
      this.isAdmin = this.usuario.isAdmin;
      this.isEmployee = this.usuario.isEmployee;
    }
  }
};
</script>

<style lang="css" scoped>
button.etapaAtivo {
  border: solid 1px #557ba1;
}

.row + .row {
  margin-top: 24px;
}
</style>