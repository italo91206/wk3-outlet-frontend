import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import jwt_decode from "jwt-decode";
import store from './store';

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

  const publicPages = ['/', '/admin'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page

  // console.log({authRequired})
  // console.log({loggedIn})

  if (authRequired){
    if(!loggedIn){
      //console.log('Não tenho permissão. Forçar login');
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
    next();
  }
})

new Vue({
  router,
  VueToast,
  store,
  render: h => h(App)
}).$mount('#app')
