<template>
  <div class="alert-own alertsd" :class="dataOjb.className" v-show="dataOjb.isShow">
    <div class="alert-content">
       <div class="clound" :class="isClound?'isClound':''"></div>
       <div class="air" :class="isClound?'ismover':''"></div>
    </div>
    <div :class="dataOjb.isMash?'alert-mash':''">

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
          isClound:false
      }
    },
    props:{
         dataOjb: {
            type: Object,
            default: function () {
                return {
                    className:'defaulted',
                    isMash:true,
                    isShow : false
                }
            }
        }
    },
    mounted(){
      this.cloundDom = document.querySelector('.clound');
    },
  computed: {
    isShow() {
    　　　　return this.dataOjb.isShow
    　　}
    },
     watch:{
        isShow(value){
           if(value){
               setTimeout(()=>{
                    this.isClound = true;
                    this.cloundDom.style.webkitTransition = 'all 2s';
                    this.cloundDom.style.transition = 'all 2s';
               },50)
           }else{
               setTimeout(()=>{
                    this.isClound = false;
                    this.cloundDom.style.webkitTransition = 'none';
                    this.cloundDom.style.transition = 'none';
               },50)
           }
        }
    },
    methods:{
      
      
    }
  }
</script>
<style lang="scss" scoped>
    .alert-own{
        position: fixed;
        -webkit-overflow-scroll:auto;
        z-index: 1999;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        .alert-mash{
            position: absolute;
            background: rgba(0, 0, 0, 0.6);
            height: 100%;
            width: 100%;
            bottom: 0;
            top: 0;
            left: 0;
            right: 0;
        }
        .alert-content{
            position: relative;
            z-index: 2000;
            height: 100%;;
          .clound{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              transform: scale(5);
               background-image: url('../../assets/img/guid/closees.png');
                 background-repeat: no-repeat;
                 background-size: cover;
          }
          .air{
               position: absolute;
              top: calc(50% - 5.333333rem);
              right: -12.8rem;
              width: 11.093333rem;
              height: 10.666667rem;
              transition: all 2s;
              transform: translateX(0);
               background-image: url('../../assets/img/guid/cate.gif');
            background-repeat: no-repeat;
            background-size: cover;
          }
          .ismover{
            transform: translateX(calc(100% - 12.8rem - 12.8rem));
          }
          .isClound{
              transform: scale(1);
               opacity: 1;
          }
        }
      
    }
</style>
