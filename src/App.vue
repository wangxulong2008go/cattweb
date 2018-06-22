<template>
  <div style="height:100%">
    <transition :name="transitionName">
      <keep-alive exclude="Error">
          <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
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
  mounted(){
  
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
    Indicator.close();//全局关闭loading
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
  @import "assets/css/normalize.css";
  @import "assets/css/weui.min.css";
  @import "assets/css/animate.css";
  @import "assets/css/base.scss";
  @import "assets/css/style.css";
</style>
