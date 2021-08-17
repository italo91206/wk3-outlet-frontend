<template>
  <main id="admin-login">
    <div class="wrapper">
      <div class="card card-primary login-form">
        <div class="card-header">
          <h3 class="text-center">Wk3 Outlet</h3>
        </div>

        <div class="card-body">
          <div class="form-group">
            <label for="inputEmail">Usuário</label>
            <input
              type="text"
              id="inputEmail"
              v-model="userInput"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="">Senha</label>
            <input
              type="password"
              v-model="passwordInput"
              class="form-control"
            />
          </div>

          <p v-if="errorMsg">
            {{ errorMsg }}
          </p>
        </div>

        <div class="card-footer">
          <button @click="fazerLogin" class="btn btn-primary">
            Fazer login
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import service from '../services/login/login-service.js';

export default {
  name: "Login",
  data() {
    return {
      userInput: "login",
      passwordInput: "senha",
      info: "",
      errorMsg: "",
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

<style>
#admin-login {
  background-color: #373330;
  position: absolute;
  width: 100%;
  height: 100%;
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