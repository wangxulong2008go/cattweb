// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var url = location.search; //获取url中"?"符后的字串   
var theRequest = new Object();   
if (url.indexOf("?") != -1) {   
   var str = url.substr(1);   
   var strs = str.split("&");   
   for(var i = 0; i < strs.length; i ++) {
     var value = strs[i].split("=")[1];
    if(value){
      value = value.split('#')[0];
    }
      theRequest[strs[i].split("=")[0]]=unescape(value);   
   }   
}   
window.UrlParams = theRequest; 
import Vue from 'vue'
import router from './router'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import Store from './store'
// Vue.prototype.$echarts = echarts; //全局引入echarts
Vue.component('icon', Icon)
Vue.use(Mint);
Vue.use(Vuex);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false;
const store = new Vuex.Store(Store)
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount("#app");
