import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import Book from './Book.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
// install router
Vue.use(VueRouter)
// routing
var router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/new-book', component: Book },
    // catch all redirect
    { path: '*', redirect: '/' }
  ],
});
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
