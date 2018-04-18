import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'

//Components
import Home from './components/Home.vue'
import Users from './components/Users.vue';
import About from './components/About.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users  },
  { path: '/about', component: About }
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
