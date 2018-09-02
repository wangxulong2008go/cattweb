<template>
  <div style="height:100%">
    <div class="audio">
        <audio loop src="/static/bgm_CAT.mp3" id="audio" controls preload="auto">该浏览器不支持audio属性</audio>
    </div>
    <transition :name="transitionName">
      <div style="height:100%">
         <keep-alive exclude="Error">
          <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </transition>
  
  </div>
</template>

<script>
import router from '@/router';
import { Indicator } from 'mint-ui';

export default {
  data(){
    return{
      transitionName:''
    }
  },
  created() {
    
  },
  methods:{
    audioAutoPlay(id){  
        var audio = document.getElementById(id);  
        audio.play();  
        document.addEventListener("WeixinJSBridgeReady", function () {  
            audio.play();  
        }, false);  
        document.addEventListener('YixinJSBridgeReady', function() {  
            audio.play();  
        }, false);  
    }
  },
  mounted(){
   // this.audioAutoPlay('audio');
  },
  beforeRouteEnter(to, from, next){
    let that =this;
    if(to.path == '/error'){
      //错误页面不需要验证
      next();
    }else{
      getSession();
    }
    function getSession() {
      //调取登录接口状态
      // Indicator.open({
      //   text:'加载中...',
      //   spinnerType:'fading-circle'
      // });
      next();
      //if(this.s){
      // next();
      //}else{
      //  next({path:'/error'});
      }    
  },
  beforeRouteUpdate (to, from, next) {
    window.fromRouter = from;
    //Indicator.close();//全局关闭loading
    let isBack = this.$router.isBack;
    if (window.historyisHistory || isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false;
    window.historyisHistory = false;
    next()
  }

}
</script>

<style lang="scss">
  .audio{
    display: none;
  }
  @font-face {
      font-family: 'zhonghei';
      src:url(./assets/font/fzltzh_GBK.ttf);
  };
  .mint-spinner-triple-bounce>div{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAnCAYAAABaBotQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMDIxOGFhZC1jZGE2LTQzNDQtOTgxMi02MDkyYTUyZDliNjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDlFNkQzOTM4Q0FGMTFFODlDQjFFODA0MURENDk3RUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDlFNkQzOTI4Q0FGMTFFODlDQjFFODA0MURENDk3RUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmQwMjE4YWFkLWNkYTYtNDM0NC05ODEyLTYwOTJhNTJkOWI2MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpkMDIxOGFhZC1jZGE2LTQzNDQtOTgxMi02MDkyYTUyZDliNjAiLz4gPC9y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);
    background-size: contain;
    min-width: 28px;
    min-height: 20px;
    background-repeat: no-repeat;
    background-position-y: 3px;
    background-color: transparent !important;
  }
  .mint-indicator-wrapper{
    background-color: transparent;
  }
  .mint-spinner-triple-bounce-bounce1{
    animation-delay: -0.48s;
  }
  .mint-spinner-triple-bounce-bounce1{
    animation-delay: -0.24s;
  }
  .mint-indicator .mint-indicator-mask{
    background-color: #000000;
    opacity: 0.6;
  }
  .mint-indicator-text{
    color: #fcfcfc;
    font-size: 14px;
  }
  body .mint-indicator .mint-indicator-wrapper{
    z-index: 90001 !important;
  }
 
  @keyframes mint-spinner-triple-bounce {
    0%{
      transform: translateY(0);
    }
    20%{
      transform: translateY(20%);
    }
    40%{
      transform: translateY(40%);
    }
    50%{
      transform: translateY(50%);
    }
    60%{
      transform: translateY(40%);
    }
    80%{
       transform: translateY(20%);
    }
    100%{
       transform: translateY(0%);
    }
  }
   @keyframes active {
      0% {transform: scale(1,1);opacity: 0.8;}
      50%,100% {transform: scale(1.1,1.1);opacity: 1;}
  }
  @import "assets/css/normalize.css";
  @import "assets/css/weui.min.css";
  @import "assets/css/animate.css";
  @import "assets/css/base.scss";
  @import "assets/css/style.css";
</style>
