import Vue from 'vue';
import App from './App';
import router from './router.config';
import Vui from '@/index.js';
import 'packages/vui-css/src/index.css';

Vue.config.productionTip = false;

Vue.use(Vui)

new Vue({
  el: '#app-container',
  router,
  components: {App},
  template: '<App />'
})
