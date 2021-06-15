<template>
    <main id="admin-login">
        <div class="wrapper">
            <div class="login-form">
                <h3 class="text-center">Wk3 Outlet</h3>

                <div class="form-group">
                    <label for="">Usuário</label>
                    <input type="text" v-model="userInput">
                </div>

                <div class="form-group">
                    <label for="">Senha</label>
                    <input type="password" v-model="passwordInput">
                </div>

                <p v-if="errorMsg">
                    {{ errorMsg }}
                </p>

                <div>
                    <button @click="fazerLogin">Fazer login</button>
                    <button @click="preencherAdmin">Preencher como admin</button>
                    <button @click="preencherDefault">Preencher como normal</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data(){
        return {
            uri: 'http://localhost:5000',
            userInput: '',
            passwordInput: '',
            info: '',
            loginDefault:{
                admin:{
                    email: "admin@wk3outlet.com.br",
                    password: "teste@123#"
                },
                default:{
                    email: "funcionario@wk3outlet.com.br",
                    password: "teste@123#"
                }
            },
            errorMsg: ''
        }
    },
    methods:{
        fazerLogin(){            
            axios
                .post(`${this.uri}/login/login`, {
                    email: this.userInput,
                    password: this.passwordInput
                })
                .then((response) => {
                    if(response.data.success == false){
                        this.errorMsg = response.data.message
                    }
                    else{
                        this.errorMsg = ""
                        this.$router.push('/dashboard')
                    }
                })
        },
        preencherAdmin(){
            this.userInput = this.loginDefault.admin.email;
            this.passwordInput = this.loginDefault.admin.password;
        },
        preencherDefault(){
            this.userInput = this.loginDefault.default.email;
            this.passwordInput = this.loginDefault.admin.password;
        }

    }
}
</script>

<style>
#admin-login{
    background-color: #373330;
    position: absolute;
    width: 100%;
    height: 100%;
}

#admin-login .login-form{
    max-width: 300px;
    max-height: 400px;
    margin: 200px auto;
}

#admin-login .form-group label{
    display: block;
}

.login-btn{
    width: 100%;
}

#admin-login .login-form{
    background-color: #fff;
    border: 1px solid #e3e3e3;
    box-shadow: 0 5px 30px 0 #000;
    padding: 50px;
}
</style>