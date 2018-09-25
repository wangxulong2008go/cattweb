// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var fullUrl = window.location.href;
var url = location.search; //获取url中"?"符后的字串  
//window.userId = 12; 
//window.rootUrl = 'https://47.107.50.56:12333/';
window.rootUrl = 'https://test.withmedia.net:12333/';
window.shareUrl = 'https://test.withmedia.net/project1/share.html'
//window.location.href = "tplogin://47.107.50.56:12333/login?corpno=001156&auth=4531b80926b9ff2b35f6f32073c254ba"; 
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
var CMBLS ={};
window.gobacks = -1;
window.CMBLS = CMBLS;
/* document.referrer
window.addEventListener('pageshow', function( e ){
//   debugger
//  alert(e.persisted);
})

window.addEventListener('pageshow', function( e ){
  if (e.persisted) {
    window.location.reload()
    }
  })
  window.addEventListener('pagehide', function(e) {
  var $body = document.body;
  var childs = $body.childNodes; 
  for(var i = 0; i < childs.length; i++) { 
    $body.removeChild(childs[i]); 
  }
  // 要等到回调函数完成，用户按返回才执行script标签的代码
  setTimeout(function() {
    var script = document.createElement("script");
    script.type = "type/javascript";
    var code = "window.location.reload()";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        script.text = code;
    }
    document.body.appendChild(script)
   //$body.append("<script type='text/javascript'>;<\/script>");
  });
  }); */
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  function handleVisibilityChange() {
    //暂停音乐
    var audio = document.getElementById('audio');  
    if (document.hidden) {
      audio && audio.pause();
    } else  {
	  var url = location.search; //获取url中"?"符后的字串 
	  var searchParmas = new Object();   
		if (url.indexOf("?") != -1) {   
		   var str = url.substr(1);   
		   var strs = str.split("&");   
		   for(var i = 0; i < strs.length; i ++) {
			 var value = strs[i].split("=")[1];
			if(value){
			  value = value.split('#')[0];
			}
			  searchParmas[strs[i].split("=")[0]]=unescape(value);   
		   }   
		}
	if(searchParmas.gotopage){
    window.isReturn = true;
    window.localStorage.setItem('isReflesh',true);
    window.localStorage.setItem('isGotochoujiang',false);
    window.localStorage.setItem('isGotodajiang',false);
    window.localStorage.setItem('isGotoZhuanqu',false);
    var origin = window.location.origin;
    var pathname = window.location.pathname;
    var search = window.location.search;
    window.location.href = origin + pathname + '?ui='+window.userId + '&noneclear=1';
	}
      audio && audio.play();
    }
  }
// resultMsg
window.UrlParams = theRequest; 
//window.userId = window.UrlParams.userid;
window.userId = window.UrlParams.ui;
function isgoback(){
  var isGotoZhuanqu = JSON.parse(window.localStorage.getItem('isGotoZhuanqu'));
  var isGotochoujiang = JSON.parse(window.localStorage.getItem('isGotochoujiang'));
  var isGotodajiang = JSON.parse(window.localStorage.getItem('isGotodajiang'));
  if(theRequest && theRequest.gotopage){
    //var userID = window.localStorage.getItem('userId');
    //if(window.userId && userID && userID != '' && userID != 'undefined' && userID == window.userId){
      window.isReturn = true;
      window.localStorage.setItem('isReflesh',true);
   // }else{
    //  window.localStorage.setItem('isReflesh',false);
   // }
    
    window.localStorage.setItem('isGotochoujiang',false);
    window.localStorage.setItem('isGotodajiang',false);
    window.localStorage.setItem('isGotoZhuanqu',false);
    var origin = window.location.origin;
    var pathname = window.location.pathname;
    var search = window.location.search;
    window.location.href = origin + pathname + '?ui='+window.userId;
    //window.history.go(0);
    return false;
  }
}
isgoback();

window.localStorage.setItem('userId',window.UrlParams.ui);

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
  //console.log(data,'埋点');
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
  window.gobacks = -history.length || -1;
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
