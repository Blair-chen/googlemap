// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import * as VueGoogleMaps from 'vue2-google-maps'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VCharts from 'v-charts'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAE_TEkNH0Vxd4lJ-RTh6bbvGd6F6ZHkIo',
    language:"zh-CN"
    // libraries: 'places', //// If you need to use place input
  }
})
Vue.use(VCharts)
Vue.use(iView);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
