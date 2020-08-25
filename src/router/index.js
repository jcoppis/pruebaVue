import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('@/views/Home.vue');
const Login = () => import('@/views/Login.vue');
const Portfolio = () => import('@/views/Portfolio.vue');
const Stocks = () => import('@/views/Stocks.vue');

import store from '@/store/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
