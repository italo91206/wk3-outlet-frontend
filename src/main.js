import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

import routes from './routes.js'

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
