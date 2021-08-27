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
                  @change="validar_nome"
                />
                <span class="col-sm-8 text-danger" v-if="erro_nome" style="margin: 0 auto">{{erro_nome}}</span>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Sobrenome</label>
                <input
                  type="text"
                  class="col-sm-8 form-control"
                  v-model="usuarioToPost.sobrenome"
                  @change="validar_sobrenome"
                />
                <span class="col-sm-8 text-danger" v-if="erro_sobrenome" style="margin: 0 auto">{{erro_sobrenome}}</span>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Tipo</label>
                <select
                  name=""
                  id=""
                  class="col-sm-8 form-control"
                  v-model="tipoCargo"
                >
                  <option disabled selected value="0">Escolha um item</option>
                  <option value="cliente" >Cliente</option>
                  <option value="funcionario" >Funcionário</option>
                  <option value="administrador">Administrador</option>
                </select>
                <span class="col-sm-8 text-danger" v-if="erro_cargo" style="margin: 0 auto">{{erro_cargo}}</span>
              </div>

              <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Email</label>
                <input
                  type="text"
                  class="col-sm-8 form-control"
                  v-model="usuarioToPost.email"
                  @change="validar_email"
                />
                <span class="col-sm-8 text-danger" v-if="erro_email" style="margin: 0 auto">{{erro_email}}</span>
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
          class="btn btn-success float-right"
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
      erro_nome: null,
      erro_sobrenome: null,
      erro_email: null,
      erro_senha: null,
      erro_cargo: null,
      tipoCargo: 0,
    };
  },
  methods:{
    mudou(){
      this.isChanged = false;
    },
    validar_nome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_nome = "Não é possível inserir caracteres especiais";
      else
        this.erro_nome = null;
    },
    validar_sobrenome(e){
      var string = e.target.value;
      if(/[^A-z\s\d][\\^]?/.test(string))
        this.erro_sobrenome = "Não é possível inserir caracteres especiais";
      else
        this.erro_sobrenome = null;
    },
    validar_email(e){
      var valor = e.target.value;
      if(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(valor))
        this.erro_email = null;        
      else
        this.erro_email = 'Email inválido';
    },
    async salvarUsuario(){
      if(this.tipoCargo == 0)
        this.erro_cargo = 'Selecione um cargo.';
      else
        this.erro_cargo = null;
      
      if(this.erro_nome || this.erro_email || this.erro_senha || this.erro_sobrenome || this.erro_cargo)
        this.$toast.error('Alguns campos estão inválidos');
      else{
        const response = await service.novoUsuario(this.usuarioToPost);
        if(response.data.success){
          this.$toast.success('Usuário cadastrado com sucesso');
          this.$router.push('/admin/usuarios');
        }
        else
          this.$toast.error(response.data.message);
      }
    },
  },
  watch: {
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