<template>
  <main id="usuarios-novo-page">
    <div class="row">
      <!-- Informações básicas -->
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="form" @change="mudou">
              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Nome</label>
                <input
                  type="text"
                  class="col-sm-8 form-control"
                  v-model="usuarioToPost.nome"
                />
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Sobrenome</label>
                <input
                  type="text"
                  class="col-sm-8 form-control"
                  v-model="usuarioToPost.sobrenome"
                />
              </div>

              <div class="form-group">
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="tipoPessoa"
                    value="pf"
                    v-model="tipoPessoa"
                  />
                  <label for="" class="form-check-label">Pessoa Física</label>
                </div>
                
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="tipoPessoa"
                    value="pj"
                    v-model="tipoPessoa"
                  />
                  <label for="" class="form-check-label">Pessoa Jurídica</label>
                </div>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Tipo</label>
                <select
                  name=""
                  id=""
                  class="col-sm-8 form-control"
                  v-model="tipoCargo"
                >
                  <option disabled value="">Escolha um item</option>
                  <option value="cliente" selected>Cliente</option>
                  <option value="funcionario" >Funcionário</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Email</label>
                <input
                  type="text"
                  class="col-sm-8 form-control"
                  v-model="usuarioToPost.email"
                />
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Senha</label>
                <input
                  type="text"
                  class="col-sm-8 form-control"
                  v-model="usuarioToPost.password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-9">
        <button
          class="btn btn-primary float-right"
          :disabled="isChanged"
          @click="salvarUsuario"
        >
          Salvar
        </button>
        <router-link to="/admin/usuarios" class="btn btn-default float-right"
          >Voltar</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import service from "@/services/usuarios/usuario-service.js";

export default {
  name: "UsuariosNovo",
  data() {
    return {
      usuarioToPost: {
        nome: "",
        sobrenome: "",
        email: "",
        password: "",
        isEmployee: false,
        isAdmin: false,
        isCompany: false
      },
      isChanged: true,
      tipoPessoa: '',
      tipoCargo: ''
    };
  },
  methods:{
    mudou(){
      this.isChanged = false;
    },
    async salvarUsuario(){
      const response = await service.novoUsuario(this.usuarioToPost);
      console.log(response);
    },
  },
  watch: {
    tipoPessoa() {
      if(this.tipoPessoa == 'pj')
        this.usuarioToPost.isCompany = true;
      else if(this.tipoPessoa == 'pf')
        this.usuarioToPost.isCompany = false;
    },
    tipoCargo(){
      if(this.tipoCargo == 'cliente'){
        this.usuarioToPost.isEmployee = false;
        this.usuarioToPost.isAdmin = false;
      }
      else if(this.tipoCargo == 'administrador'){
        this.usuarioToPost.isEmployee = false;
        this.usuarioToPost.isAdmin = true;
      }
      else if(this.tipoCargo == 'funcionario'){
        this.usuarioToPost.isEmployee = true;
        this.usuarioToPost.isAdmin = false;
      }
    }
  }
};
</script>

<style>
</style>