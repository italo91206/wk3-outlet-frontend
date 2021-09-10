<template>
  <main id="login-page">
    <v-card id="login-card">
      <v-card-title class="login-card--title">
        <div>
          <img src="/logotipo-redondo.svg" alt="" id="login-logo">
        </div>
        <h4>Acesso administrativo</h4>
      </v-card-title>
      
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="userInput" label="Email"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-text-field 
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                v-model="passwordInput"
                @click:append="show = !show"
                label="Senha"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" md="6">
              <v-btn
                color="success"
                class="mr-4"
                @click="fazerLogin"
              >
                Fazer Login
              </v-btn>
            </v-col>

            <v-col cols="6" md="6" class="esquece-senha--col">
              <a @click="senhaEsqueceu = !senhaEsqueceu">Esqueceu a senha ?</a>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" class="esquece-senha--aviso">              
              <p v-if="senhaEsqueceu">
                Por favor contate o administrador para a recuperação de senha.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </main>
</template>

<script>
// import service from '../services/login/login-service.js';

export default {
  name: "Login",
  data() {
    return {
      userInput: "",
      passwordInput: "",
      info: "",
      errorMsg: "",
      show: false,
      senhaEsqueceu: false,
    };
  },
  methods: {
    async fazerLogin() {
      var email = this.userInput;
      var senha = this.passwordInput;
      const user = { email, senha };

      const res = await this.$store.dispatch('auth/login', user);
      if(res.data.success){
        const usuario = res.data.data.usuario;
        // console.log(usuario);
        if(usuario.isEmployee || usuario.isAdmin){
          this.$store.dispatch('perfil/setPerfil', usuario);
          this.$router.push('/dashboard');
          // const nome = this.$store.state.perfil.perfil.nome;
          // console.log(nome);
          this.$toast.success(`Bem vindo de volta ${this.$store.state.perfil.perfil.nome}!`);
        }
        else
          this.$toast.error('Este perfil não possui permissões de acesso.');
      }
      else{
        this.$toast.error(res.data.message)
        // console.log(res);
        // console.log('login não existe: ' + res.data.message)
        // alert(res.data.message);
      }

    }
  }
}
</script>

<style lang="css">
.esquece-senha--aviso{
  color: rgb(177, 6, 6);
  text-align: center;
}

.esquece-senha--col{
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(54, 137, 231);
}

.login-card--title{
  display: block;
  text-align: center;
}

.login-card--title h4{
  margin-top: 20px;
}

#login-logo{
  width: 85px;
}

#login-page {
  display: flex;
  background-color: #373330;
  align-items: center;
  height: 101%;
  max-height: 100%;
  min-width: 50rem;
  padding: 80px 0;
}

#login-card {
  background-color: #fff;
  border: 1px solid #222020;
  box-shadow: 0 5px 30px 0 #000;
  width: 30rem;
  height: 35rem;
  min-width: 0;
  padding: 40px 50px;
  display: block;
  float: none;
  margin: auto;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 1;
}

#admin-login .login-form {
  max-width: 300px;
  max-height: 400px;
  margin: 200px auto;
}

#admin-login .form-group label {
  display: block;
}

.login-btn {
  width: 100%;
}

#admin-login .login-form {
  background-color: #fff;
  border: 1px solid #e3e3e3;
  box-shadow: 0 5px 30px 0 #000;
  padding: 25px;
}
</style>