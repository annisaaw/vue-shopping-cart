import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import { routes } from './routes.js'
import { store } from './store'

Vue.use(VueRouter);
Vue.use(VueCookies);

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
