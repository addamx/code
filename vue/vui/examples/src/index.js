import Vue from 'vue';
import App from './App';
import router from './router.config';
import Vui from '@/index.js'

Vue.config.productionTip = false;

Vue.use(Vui)

new Vue({
  el: '#app-container',
  router,
  components: {App},
  template: '<App />'
})
