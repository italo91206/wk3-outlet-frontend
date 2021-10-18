import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import jwt_decode from "jwt-decode";
import store from './store';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false

import routes from './routes.js'

Vue.use(VueRouter);
Vue.use(VueToast);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // const publicPages = ['/', '/admin'];
  // const authRequired = !publicPages.includes(to.path) || to.meta.is_public;
  // const authRequired = to.meta.is_public;
  const is_public = to.meta.is_public;
  // console.log(authRequired);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page


  if(to.meta.is_public == true)
    console.log('Existe e é público.');
  else if(!to.meta.is_public)
    console.log('Existe mas não é público.');
  else if(to.meta.is_public == null)
    console.log('Não existe.');

  if(is_public){
    next();
  }
  else if(is_public === false){
    if(loggedIn == null){
      console.log('Preciso estar logado. Indo para o /admin ...');
      next('/admin');  
    }
    else{
      let usuario = jwt_decode(loggedIn);
      const permitir = usuario.usuario.isEmployee || usuario.usuario.isAdmin;
      // console.log(`Meu usuário tem acesso: ${permitir}`);
      if(permitir)
        next();
      else
        next('/admin');
    }
  }
  else{
    console.log('Rota não tratada');
  }


  // if (authRequired){
  //   if(!loggedIn){
  //     //console.log('Não tenho permissão. Forçar login');
  //     next('/admin');  
  //   }
  //   else{
  //     let usuario = jwt_decode(loggedIn);
  //     const permitir = usuario.usuario.isEmployee || usuario.usuario.isAdmin;
  //     // console.log(`Meu usuário tem acesso: ${permitir}`);
  //     if(permitir)
  //       next();
  //     else
  //       next('/admin');
  //   }
  // }
  // else{
  //   console.log('acesso liberado');
  //   next();
  // }
})

new Vue({
  router,
  vuetify,
  VueToast,
  store,
  render: h => h(App),
}).$mount('#app')
