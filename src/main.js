import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import store from './store/store';
import Vuelidate from 'vuelidate';
import { Axios } from './axios-auth';

Vue.use(Vuelidate);

Vue.config.productionTip = false

Axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  if(err.response.status === 401) {
    store.dispatch('auth/logout');
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
