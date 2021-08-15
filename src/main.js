import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.config.productionTip = false

import routes from './routes.js'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
