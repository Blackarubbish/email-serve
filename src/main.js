import Vue from 'vue'
import App from './App.vue';
import Vant from 'vant';
import vcolorpicker from 'vcolorpicker'
import 'vant/lib/index.css';
import router from './router'

Vue.use(vcolorpicker)
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
