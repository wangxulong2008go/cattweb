<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
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
  beforeRouteEnter(to, from, next){
    let that =this;
    if(to.path == '/home' || to.path == '/error'){
      //不需要验证
      next();
    }else{
      getSession();
    }
    function getSession() {
      Indicator.open({
        text:'加载中...',
        spinnerType:'fading-circle'
      });
      next();
      //if(this.s){
      // next();
      //}else{
      //  next({path:'/error'});
      }    
  },
  beforeRouteUpdate (to, from, next) {
    Indicator.close();//全局关闭loading
    let isFade = this.$router.isFade;
    let isBack = this.$router.isBack;
    if(isFade){
      this.transitionName = 'fade';
    }else if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false;
    this.$router.isFade = false;
    next()
  }

}
</script>

<style lang="scss">
  @import "assets/css/normalize.css";
  @import "assets/css/weui.min.css";
  @import "assets/css/animate.css";
</style>
