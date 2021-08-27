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
              <!-- nome -->
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome</label>
                <input type="text" class="col-sm-8 form-control" @change="validar_nome" v-model="usuario.nome">
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>

              <!-- sobrenome -->
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Sobrenome</label>
                <input type="text" class="col-sm-8 form-control" @change="validar_sobrenome" v-model="usuario.sobrenome">
                <span class="col-sm-8 text-danger" v-if="erro_sobrenome" style="margin: 0 auto">{{erro_sobrenome}}</span>
              </div>
              
              <!-- Tipos de pessoa -->
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

              <!-- Tipo de usuário -->
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Tipo</label>
                <select name="" id="" class="col-sm-8 form-control" :disabled="isAdmin">
                  <option value="">Cliente</option>
                  <option value="" :selected="isEmployee">Funcionário</option>
                  <option value="" :selected="isAdmin">Administrador</option>
                </select>
              </div>

              <!-- rg -->
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">RG</label>
                <input type="text" class="col-sm-8 form-control" v-model="usuario.rg">
              </div>

              <!-- cpf -->
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
        <button class="btn btn-primary float-right" :disabled="isChanged" @click="atualizarUsuario">Salvar</button>
        <button @click="deletar" class="btn btn-danger float-right">Deletar</button>
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
      if(response.data.success){
        this.usuario = response.data.data;
      }
      else{
        this.$toast.error(response.data.message);
        this.$router.push('/admin/usuarios');
      }
    },
    async deletarUsuario(id){
      const response = await service.deletarUsuario(id);
      if(response.data.success){
        this.$toast.success('Usuário foi removido com sucesso!');
        this.$router.push('/admin/usuarios');
      }
      else
        this.$toast.error(response.data.message);
    },
    async atualizarUsuario(){
      const response = await service.atualizarUsuario(this.usuario);
      if(response.data.success){
        this.$toast.success('Usuário foi atualizado com sucesso!');
        this.$router.push('/admin/usuarios');
      }
      else
        this.$toast.error(response.data.message);
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
    },
    deletar(){
      let id = this.$route.params.id;  
      this.deletarUsuario(id);
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.listarUsuario(id);
  },
  watch: {
    usuario: function(){
      this.isAdmin = this.usuario.isAdmin ;
      this.isEmployee = this.usuario.isEmployee ;
    }
  }
};
</script>

<style scoped>
button.etapaAtivo{
  border: solid 1px #557ba1;
}
</style>