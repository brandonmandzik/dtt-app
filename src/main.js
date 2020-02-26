import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import routes from './routes.js'

Vue.config.productionTip = false

// VueRouter is used to map the components to the corresponding link clicked
// Vue needs to now which router to use so define one with our routes from routes.js
Vue.use(VueRouter) 
const router = new VueRouter({routes})

// pass router to Vue
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
