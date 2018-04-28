import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'

//Components
import Home from './components/main/Home.vue'
import About from './components/main/About.vue';
import Product from './components/main/Product.vue';
import Login from './components/Login';
import Signup from './components/Signup';

//HowTos
// Passing parameters through url
  // https://router.vuejs.org/en/essentials/passing-props.html

Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/product', component: Product },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
];

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
