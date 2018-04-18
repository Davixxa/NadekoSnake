import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Users from './components/Users.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/users', component: Users  }
];

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
