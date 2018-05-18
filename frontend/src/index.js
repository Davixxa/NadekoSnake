import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import VueSession from 'vue-session'

//Components
import Home from './components/main/Home.vue'
import About from './components/main/About.vue';
import Product from './components/main/Product.vue';
import Login from './components/Login';
import Signup from './components/Signup';

//Account compononts
import accInfo from './components/account/info';
import accSettings from './components/account/settings';
import nameChange from './components/account/edit/nameChange';
import emailChange from './components/account/edit/emailChange';

//Agreements
import tos from './components/tos';

// Superuser components
import su from './components/admin/index';
import createProduct from './components/admin/product/createProduct';

//HowTos
// Passing parameters through url
  // https://router.vuejs.org/en/essentials/passing-props.html

Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/product/', component: Product },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },

  //Agreement paths
  { path: '/agreements/tos', component: tos },

  //Account paths
  { path: '/a', component: accInfo },
  { path: '/a/settings', component: accSettings },

  //Account settings paths
  { path: '/a/settings/changeName', component: nameChange },
  { path: '/a/settings/changeEmail', component: emailChange },

  // Superuser Paths
  { path: '/su', component: su },

  // Superuser Product Paths

  { path: '/su/product/createProduct', component: createProduct }


];


const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
