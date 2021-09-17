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
  <!-- <main id="usuarios-editar-page">
    <div class="row">
      <div class="col-lg-3">
        <div class="card">
          <div class="card-body">
            <button class="btn btn-default btn-block" v-bind:class="{ etapaAtivo: etapa == 1}" @click="setEtapa(1)">Inf. Básicas</button>
            <button class="btn btn-default btn-block" v-bind:class="{ etapaAtivo: etapa == 2}" @click="setEtapa(2)">Inf. Avançadas</button>
            <button class="btn btn-default btn-block" v-bind:class="{ etapaAtivo: etapa == 3}" @click="setEtapa(3)">Compras</button>
            <button class="btn btn-default btn-block" v-bind:class="{ etapaAtivo: etapa == 4}" @click="setEtapa(4)">Acertos</button>
            <button class="btn btn-default btn-block" v-bind:class="{ etapaAtivo: etapa == 5}" @click="setEtapa(5)">Newsletter</button>
          </div>
        </div>
      </div>

      
      <div class="col-lg-9" v-if="etapa == 1">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
      
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome</label>
                <input type="text" class="col-sm-8 form-control" @change="validar_nome" v-model="usuario.nome">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>

      
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Sobrenome</label>
                <input type="text" class="col-sm-8 form-control" @change="validar_sobrenome" v-model="usuario.sobrenome">
                <span class="col-sm-8 text-danger" v-if="erro_sobrenome" style="margin: 0 auto">{{erro_sobrenome}}</span>
              </div>
              
      
              <div class="form-group">
                <div class="form-check">
                  <input type="radio" class="form-check-input" name="tipoPessoa" :checked="usuario.isCompany" @change="mudarPessoa('pj')">
                  <label for="" class="form-check-label">Pessoa Jurídica</label>
                </div>

                <div class="form-check">
                  <input type="radio" class="form-check-input" name="tipoPessoa" :checked="!usuario.isCompany" @change="mudarPessoa('pf')">
                  <label for="" class="form-check-label">Pessoa Física</label>
                </div>
              </div>

              
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Tipo</label>
                <select name="" id="" class="col-sm-8 form-control" :disabled="isAdmin">
                  <option value="">Cliente</option>
                  <option value="" :selected="isEmployee">Funcionário</option>
                  <option value="" :selected="isAdmin">Administrador</option>
                </select>
              </div>

              
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">RG</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.rg">
              </div>

              
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">CPF</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.cpf">
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="col-lg-9" v-if="etapa == 2">
        <div class="card">
          <div class="card-body">
            <h3>Informações avançadas. Ainda não está pronto</h3>
          </div>
        </div>
      </div>

      
      <div class="col-lg-9" v-if="etapa == 3">
        <div class="card">
          <div class="card-body">
            <h3>Compras efetuadas pelo usuário. Ainda não está pronto</h3>
          </div>
        </div>
      </div>

      
      <div class="col-lg-9" v-if="etapa == 4">
        <div class="card">
          <div class="card-body">
            <h3>Acertos de estoque efetuadas pelo usuário. Ainda não está pronto</h3>
          </div>
        </div>
      </div>

      
      <div class="col-lg-9" v-if="etapa == 5">
        <div class="card">
          <div class="card-body">
            <h3>Newsletter assinado pelo cliente. Ainda não está pronto</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">
        <button class="btn btn-primary float-right" :disabled="isChanged" @click="atualizarUsuario">Salvar</button>
        <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
        <router-link to="/admin/usuarios" class="btn btn-default float-right">Voltar</router-link>
      </div>
    </div>
  </main>-->
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