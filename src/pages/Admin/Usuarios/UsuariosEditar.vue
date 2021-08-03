<template>
  <main id="usuarios-editar-page">
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

      <!-- Informações básicas -->
      <div class="col-lg-9" v-if="etapa == 1">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.nome">
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Sobrenome</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.sobrenome">
              </div>
              
              <div class="form-group row">
                <label for="">Pessoa Jurídica</label>
                <input type="radio" name="tipoPessoa" :checked="usuario.isCompany" @change="mudarPessoa('pj')">
              </div>

              <div class="form-group row">
                <label for="">Pessoa Física</label>
                <input type="radio" name="tipoPessoa" :checked="!usuario.isCompany" @change="mudarPessoa('pf')">
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

      <!-- Informações avançadas -->
      <div class="col-lg-9" v-if="etapa == 2">
        <div class="card">
          <div class="card-body">
            <h3>Informações avançadas. Ainda não está pronto</h3>
          </div>
        </div>
      </div>

      <!-- Compras -->
      <div class="col-lg-9" v-if="etapa == 3">
        <div class="card">
          <div class="card-body">
            <h3>Compras efetuadas pelo usuário. Ainda não está pronto</h3>
          </div>
        </div>
      </div>

      <!-- Acertos de estoque -->
      <div class="col-lg-9" v-if="etapa == 4">
        <div class="card">
          <div class="card-body">
            <h3>Acertos de estoque efetuadas pelo usuário. Ainda não está pronto</h3>
          </div>
        </div>
      </div>

      <!-- Newsletter -->
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
        <button class="btn btn-primary float-right" :disabled="isChanged" @click="salvarUsuario">Salvar</button>
        <button class="btn btn-danger float-right">Deletar</button>
        <router-link to="/admin/usuarios" class="btn btn-default float-right">Voltar</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import service from "@/services/usuarios/usuario-service.js";

export default {
  name: "UsuariosEditar",
  data() {
    return {
      usuario: {},
      isAdmin: false,
      isEmployee: false,
      isChanged: true,
      etapa: 1
    };
  },
  methods: {
    async listarUsuario(id) {
      const response = await service.listarUsuario(id);
      if (response.data){
        this.usuario = response.data;
        this.isAdmin = this.usuario.isAdmin ;
        this.isEmployee = this.usuario.isEmployee ;
      }
      else this.$router.push("/dashboard");
    },
    async salvarUsuario(){
      const response = await service.salvarUsuario(this.usuario);
      console.log(response.data);
    },
    mudarPessoa(tipo){
      if(tipo == 'pj')
        this.usuario.isCompany = true;
      else if(tipo == 'pf')
        this.usuario.isCompany = false;
    },
    mudou(){
      this.isChanged = false;
    },
    setEtapa(num){
      this.etapa = num;
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.listarUsuario(id);
  }
};
</script>

<style scoped>
button.etapaAtivo{
  border: solid 1px #557ba1;
}
</style>