// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var url = location.search; //获取url中"?"符后的字串  
window.userId = 12; 
window.rootUrl = 'http://119.23.29.43:12333/';
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
//动态适配
window.autoSize=function (){
  let oHtml = document.querySelector("html")
  let iW= oHtml.getBoundingClientRect().width;
  let fontSize = iW/16;
  oHtml.style.fontSize = fontSize>=40?40+"px":fontSize+"px";
 }
window.autoSize();
window.addEventListener("resize", window.autoSize, false);
window.addEventListener("orientationchange", window.autoSize, false);

//判断打开浏览器
let u = navigator.userAgent;
if (!!u.match(/AppleWebKit.*Mobile.*/)) {//判断是否是移动设备打开。有些逻辑需要区分浏览器类型
  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    window.isBrowserMobile = 'weixin'
  }
  if (ua.match(/WeiBo/i) == "weibo") {
    window.isBrowserMobile = 'weibo'
  }
  if (ua.match(/QQ/i) == "qq") {
    window.isBrowserMobile = 'qq'
  }
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    window.isBrowserMobile = 'ios'
  } 
  if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
    window.isBrowserMobile = 'android'
  }
} else {
   window.isBrowserMobile = 'pc'
}
window.$post= function (data) {
  console.log(data,'埋点');
  var params = {
      values:data
  }
  params = JSON.stringify(params);
  var url = window.rootUrl+'?ae=3&ci=1&ui='+window.userId + '&params='+params //埋点
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  // 添加http头，发送信息至服务器时内容编码类型
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
     // fn.call(this, );
    // console.log(xhr.responseText);
    }
  };
 // xhr.send(params);
  xhr.send();
}
//pushHistory();  暂时不处理,微信中进入页面就触发了popstate事件
// let Historybool=false;
// setTimeout(()=>{
//   Historybool = true;
// },1500) 
window.addEventListener("popstate", function(evt) {
  if(history.state == null){
    //首次可能在刷新的时候会触发，但这里不需要处理，因为beforeRouteUpdate方法处理的时候肯定不会是第一次
    window.historyisHistory = true;
  }
  //if(Historybool){
      //处理
  //}
}, false);

function pushHistory() {  
  var state = {  
      title: "title",  
      url: "#"  
  };  
  window.history.pushState(state, "title", "#");  
} 
import Vue from 'vue'
import router from './router'
// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import Store from './store'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  attempt: 1
})
import FastClick from 'fastclick';
FastClick.attach(document.body);
 //Vue.prototype.$echarts = echarts; //全局引入echarts
import {tap,swipeleft,swiperight,press,panstart,panmove,panend} from './assets/js/touchvue.js' 
import  Velocity from 'velocity-animate'
import { Indicator } from 'mint-ui';
//import VueLazyComponent from '@xunlei/vue-lazy-component'
//Vue.use(VueLazyComponent)
Vue.prototype.$Velocity = Velocity;
Vue.prototype.$Indicator = Indicator;
// 坑位埋点指令
Vue.directive('stat', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;
      window.$post([data]);
    }, false);
  }
});
//Vue.component('icon', Icon)
Vue.use(Mint);
Vue.use(Vuex);
//Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false;
window.Bus = new Vue();
const store = new Vuex.Store(Store)
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount("#app");
