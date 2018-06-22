<template>
  <div class="contain-box relative">
    <div class="map-box absolute">map</div>
    <div class="map-small-box">smallbox</div>
    <div class="contorl-left-top">左上角控制器</div>
    <div class="contorl-bottom-center">中心下</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        //获取mapbox的大小,设置可视区域
        this.setSmallBoxPosition();
      },
      setSmallBoxPosition(){
        //根据map位置，显示小地图的框框位置

      },
      setMapBoxPosition(isTrue){
        //是否需要根据小地图设置位置，或者是初始化
      },
      // jump (){
      //   this.$router.push({path: '/error', query:{}});
      // }
    },
  }
</script>