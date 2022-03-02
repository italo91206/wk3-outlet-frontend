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
  const is_public = to.meta.is_public;
  const user = localStorage.getItem('user');

  if(user == null){
    if(to.path == '/login')
      next();
    else if(!is_public)
      next({ path: '/login' })
    else
      next();
  }
  else {
    let user_decoded = jwt_decode(user).usuario;
    let exp_date = new Date(user_decoded.exp * 1000);

    if(!is_public && exp_date < new Date()){
      localStorage.removeItem('user')
      next({ path: '/login '})
    }
    else {
      store.commit("perfil/setPerfil", user_decoded)
      next();
    }
  }
})

new Vue({
  router,
  vuetify,
  VueToast,
  store,
  render: h => h(App),
}).$mount('#app')
