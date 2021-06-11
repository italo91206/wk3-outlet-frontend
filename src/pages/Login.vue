<template>
    <main id="admin-login">
        <div class="wrapper">
            <form>
                <h3 class="text-center">Wk3 Outlet</h3>

                <div class="form-group">
                    <label for="">Usuário</label>
                    <input type="text" v-model="user">
                </div>

                <div class="form-group">
                    <label for="">Senha</label>
                    <input type="password" v-model="password">
                </div>

                <div>
                    <input type="button" value="login" class="login-btn" @click="fazerLogin">
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data(){
        return {
            user: '',
            password: '',
            info: ''
        }
    },
    methods:{
        fazerLogin(){
            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => (this.info = response))
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

#admin-login form{
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

#admin-login form{
    background-color: #fff;
    border: 1px solid #e3e3e3;
    box-shadow: 0 5px 30px 0 #000;
    padding: 50px;
}
</style>