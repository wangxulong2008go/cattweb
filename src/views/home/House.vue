<template>
  <div class="contain-box">
      <div class="body-box">
          <div class="wo-box flex-box">
              <div :class="nowData>1?'hashouse':''" class="flex-item house">
                <div v-show="nowData>1" class="house_one">
                    <span class="xinxin1 xinxin"></span>
                    <span class="xinxin2 xinxin"></span>
                    <span class="xinxin3 xinxin"></span>
                </div>
              </div>
              <div :class="nowData>0?'hashouse':''" class="flex-item house">
                <div v-show="nowData>0" class="house_one2">
                    <span class="xinxin1 xinxin"></span>
                    <span class="xinxin2 xinxin"></span>
                    <span class="xinxin3 xinxin"></span>
                </div>
              </div>
              <div :class="nowData>2?'hashouse':''" class="flex-item house">
                   <div v-show="nowData>2" class="house_one3">
                      <span class="xinxin1 xinxin"></span>
                      <span class="xinxin2 xinxin"></span>
                      <span class="xinxin3 xinxin"></span>
                  </div>
              </div>
          </div>
          <div class="tip">
              <div class="tip-img" :class="nowData==3?'all-img':''">

              </div>
          </div>
          <div class="btn">
               <span v-tap="gotoDraw" class="btn-one" :class="nowData<3?'btn-none':''">

                </span>
                <span v-tap="gotpHouse" class="btn-two">

                </span>
          </div>
      </div>
      <div v-tap="goBack" class="goback">

      </div>
      <div class="myhouse-icon">

      </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
         nowData:2,//总共有几个手信
      }
    },
    created() {
   
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', this.scrollTouch,false);
    },
    mounted(){
      document.querySelector('#app').addEventListener('touchmove', this.scrollTouch,false);
    },
    methods:{
        scrollTouch(evt){
            if(!evt._isScroller) {
                evt.preventDefault();
                 evt.stopPropagation();
            }
        }, goBack(){
          this.$router.back()
        },
        gotoDraw(){
          //去抽奖
          if(this.nowData<3){
            return false;
          }
        },
        gotpHouse(){
          //去旅行
        }
    }
  }
</script>
<style scoped lang="scss">
    .contain-box{
        background-image: url('../../assets/img/guid/home_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .goback{
         position: absolute;
         top:.64rem;
         left: .64rem;
         height: 1.898667rem;
         width: 1.877333rem;
         background-image: url('../../assets/img/guid/back.png');
         background-repeat: no-repeat;
         background-size: contain;
       }
       .body-box{
            position: absolute;
            top: 8.2rem;
       }
       .myhouse-icon{
          position: absolute;
         top:-2.6rem;
         left: calc(50% - 3.306667rem);
         height: 7.573333rem;
         width: 6.592rem;
         background-image: url('../../assets/img/guid/house__08.png');
         background-repeat: no-repeat;
         background-size: contain;
       }
       .flex-box{
         display: flex;
         .flex-item{
           flex-grow: 0;
           flex-shrink: 0;
         }
         .house{
            height: 5.909333rem;
            width: 5.333333rem;
            background-image: url('../../assets/img/guid/home_image_none.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
         }
         .hashouse{
           background-image: url('../../assets/img/guid/house__21.png');
           position: relative;
           &:before{
              content: '';
               position: absolute;
               right: 0.76rem;
               top: 2.9rem;
               height: 1.344rem;
               width: 3.029333rem;
               background-image: url('../../assets/img/guid/house__29.png');
               background-repeat: no-repeat;
               background-size: 100% 100%;
               z-index: 0;
               animation: shadow .5s linear infinite;
           }
         }
        
         .house_one{
            height: 2.965333rem;
            width: 2.88rem;
            background-image: url('../../assets/img/guid/house__34.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
            margin-top: 1.1rem;
            animation: rotate .5s linear infinite;
            position: relative;
            z-index: 2;
            .xinxin{
              display: inline-block;
              height: 10px;
              width: 10px;
              background-image: url('../../assets/img/guid/house__53.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
                top: 1rem;
                position: absolute;
                left: -0.5rem;
                animation: xinxin .5s linear infinite;
                animation-delay: 0s;
            }
            .xinxin3{
              top:-0.4rem;
              left: 2.0rem;
              animation-delay: -0.18s;
            }
            .xinxin2{
              height: 6px;
              width: 6px;
              top:0;
              left: 2.8rem;
              animation-delay: -0.34s;
            }
         }
          .house_one2{
            height: 2.965333rem;
            width: 2.88rem;
            background-image: url('../../assets/img/guid/house__24.png');
            background-repeat: no-repeat;
            background-size: cover;
            margin: 0 auto;
            margin-top: 1.1rem;
            animation: rotate .5s linear infinite;
            position: relative;
            z-index: 2;
            .xinxin{
              display: inline-block;
              height: 10px;
              width: 10px;
              background-image: url('../../assets/img/guid/house__53.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
                top: 1rem;
                position: absolute;
                left: -0.5rem;
                animation: xinxin .5s linear infinite;
                animation-delay: 0s;
            }
            .xinxin3{
              top:-0.4rem;
              left: 2.0rem;
              animation-delay: -0.18s;
            }
            .xinxin2{
              height: 6px;
              width: 6px;
              top:0;
              left: 2.8rem;
              animation-delay: -0.34s;
            }
         }
          .house_one3{
            height: 2.965333rem;
            width: 2.88rem;
            background-image: url('../../assets/img/guid/house__11.png');
            background-repeat: no-repeat;
            background-size: cover;
            margin: 0 auto;
            margin-top: 1.1rem;
            animation: rotate .5s linear infinite;
            position: relative;
            z-index: 2;
            .xinxin{
              display: inline-block;
              height: 10px;
              width: 10px;
              background-image: url('../../assets/img/guid/house__53.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
                top: 1rem;
                position: absolute;
                left: -0.5rem;
                animation: xinxin .5s linear infinite;
                animation-delay: 0s;
            }
            .xinxin3{
              top:-0.4rem;
              left: 2.0rem;
              animation-delay: -0.18s;
            }
            .xinxin2{
              height: 6px;
              width: 6px;
              top:0;
              left: 2.8rem;
              animation-delay: -0.34s;
            }
         }
       }
       .tip{
          text-align: center;
          padding-top: 0.6rem;
          .tip-img{
             height: 4.842667rem;
              width: 15.104rem;
              background-image: url('../../assets/img/guid/home_image_txt_1.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin: 0 auto;
          }
           .all-img{
             background-image: url('../../assets/img/guid/home_image_txt_2.png');
           }
       }
      .btn{
        height: 3.392rem;
        width: 100%;
        position: fixed;
        bottom:1.4rem;
        .btn-one{
             display: inline-block;
              width: 6.357333rem;
              background-image: url('../../assets/img/guid/window_2_btn.png');
              background-repeat: no-repeat;
              background-size: contain;
              box-sizing: border-box;
              height: 100%;
              margin-left:.64rem;
        }
         .btn-two{
             display: inline-block;
              width: 6.357333rem;
              background-image: url('../../assets/img/guid/home_btn_2.png');
              background-repeat: no-repeat;
              background-size: contain;
              box-sizing: border-box;
              height: 100%;
              margin-left:.64rem;
        }
        .btn-none{
           background-image: url('../../assets/img/guid/home_btn_3.png');
        }
      }
    }
    @keyframes rotate {
        0% {
        transform: translateY(0) ;
      }
        25% {
            transform: translateY(5px);
        }
        50% {
            transform: translateY(10px) scale(1.06, 0.94);
          
        }
        75% {
            ransform: translateY(5px) ;
        }
        100% {
            transform: translateY(0) ;
        }
    }
    @keyframes shadow {
      0%, 100% {transform: scaleX(1);}
      50% {transform: scaleX(1.2);}
  }
    @keyframes xinxin {
      0%, 100% {transform: scale(1,1);opacity: 0;}
      50% {transform: scale(1.4,1.4);opacity: 1;}
  }
</style>
<style lang="scss">
   
   
</style>

