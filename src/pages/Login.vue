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
import service from '../services/login/login-service.js';

export default {
  name: "Login",
  data() {
    return {
      userInput: "",
      passwordInput: "",
      info: "",
      errorMsg: "",
    };
  },
  methods: {
    async fazerLogin() {
      var email = this.userInput;
      var senha = this.passwordInput;
      const user = { email, senha };

      const response = await service.fazerLogin(user);
      console.log(response);
      
      // try {
      //   if (response.status == 200) {
      //     const token = response.data.token;
      //     localStorage.JWT = token;
      //     this.$router.push("/dashboard");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
  mounted(){
    this.$store.dispatch('auth/login');
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