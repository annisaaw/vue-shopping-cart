import Product from './components/Product.vue';
import Login from './components/Login.vue';
import Bill from './components/Bill.vue';

export const routes = [
  { path: '/', component: Login, name: 'login' },
  { path: '/product/', component: Product, name: 'product' },
  { path: '/bill/', component: Bill, name: 'bill' },
  { path: '*', redirect: '/', name: 'redirect'},
];