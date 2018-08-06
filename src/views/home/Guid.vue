<template>
  <div class="contain-box">
    <div class="progress-box">
        <div class="progress-label">{{progressValue}}%</div>
        <mt-progress :value="progressValue" :bar-height="18"></mt-progress>
    </div>
  </div>
</template>
<script>
 function scrollTouch(evt){
            if(!evt._isScroller) {
                evt.preventDefault();
                 evt.stopPropagation();
            }
        }
  export default {
    data(){
      return {
          progressValue:0,
          isDon:false
      }
    },
    created() {
        // var id = this.$route.query.page;
        this.setProgress();
        this.test();
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', scrollTouch,false);
    },
    mounted(){
      document.querySelector('#app').addEventListener('touchmove', scrollTouch,false);
    },
    methods:{
     setProgress(){
         let that = this;
         setTimeout(()=>{
             that.progressValue = that.progressValue + 1;
             if(100>that.progressValue && that.progressValue >= 90){
                 if(that.isDon){
                     that.setProgress();
                 }
             }else if(that.progressValue >=100){
                 that.$router.push({path:'home',query: {page:'home'}});
             }else{
                 that.setProgress();
             }

         },100);
     },
     test(){
         //用于测试，到时候可以调用接口，初始化接口
         let that = this;
         setTimeout(()=>{
             that.isDon = true;
             that.setProgress();
         },20000)
     }
    }
  }
</script>
<style scoped lang="scss">
    .contain-box{
        background-image: url('../../assets/img/guid/guid_BG.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .progress-box{
            position:absolute;
            left: 2.2rem;
            right: 2.2rem;
            bottom: 2.2rem;
        }
    }
</style>
<style lang="scss">
    .progress-box{
        .mt-progress-runway{
            border-radius: 8px;
            background: rgba(0,0,0,0.7);
        }
        .progress-label{
            text-align: center;
            color: #fff;
            font-family:'zhonghei';
        }
        .mt-progress-progress{
            border-bottom-left-radius: 8px;
            border-top-left-radius: 8px;
            height: 14px !important;
            margin-left:2px;
            margin-right:2px;
            background:#d6fdff;
            &:after{
                   content: '';
                    right: -12px;
                    top: -4px;
                    position: absolute;
                    height: 24px;
                    width: 24px;
                    display: inline-block;
                    border-radius:50%;
                    background-image: url('../../assets/img/guid/logo.png');
                    background-repeat: no-repeat;
                    background-size: cover;
            }
        }
    }
</style>

