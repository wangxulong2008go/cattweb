<template>
  <div class="contain-box">
      <div class="body-box">
          <div class="wo-box flex-box">
              <div :class="nowData>0?'hashouse':''" class="flex-item house">
                <div v-show="nowData>0" class="house_one">
                    <span class="xinxin1 xinxin"></span>
                    <span class="xinxin2 xinxin"></span>
                    <span class="xinxin3 xinxin"></span>
                </div>
              </div>
              <div :class="nowData>1?'hashouse':''" class="flex-item house">
                <div v-show="nowData>1" class="house_one2">
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
         
          <div class="btn">
               <span @click="gotoDraw" class="btn-one" :class="nowData<3?'btn-none':''">

                </span>
                <span @click="gotpHouse" class="btn-two">

                </span>
          </div>
          <div class="btn-big">
            <span @click="gotoBigDraw" class="btn-egg"></span>
          </div>
      </div>
       <div class="tip">
              <div class="tip-img" :class="nowData==3?'all-img':''">

              </div>
          </div>
      <div @click="goBack" class="goback">

      </div>
      <div class="">

      </div>
    <draw-alert :dataOjb="goDrawDialogIsShow"> </draw-alert>
    <xu-alert :dataOjb="goXuxiDialogIsShow"> </xu-alert>
    <big-alert :dataOjb="goBigDialogIsShow"> </big-alert>
  </div>
</template>
<script>
  import drawAlert from '@/views/home/drawAlert.vue'
  import xuAlert from '@/views/home/xuAlert.vue'
  import bigAlert from '@/views/home/bigAlert.vue'
  import {loginApi} from '@/api/index'
  import {setStore,getStore} from '@/utils/utils.js'
  export default {
    data(){
      return {
        isLotteryFinalAward:true,//默认进行过了
         nowData:0,//总共有几个手信
         t:0,//剩余次数
          goDrawDialogIsShow:{
            isShow : false,
            isMash:true,
            id:27,
            t:0,
            p:0
        },
          goXuxiDialogIsShow:{
            isShow : false,
            isMash:true
        },
          goBigDialogIsShow:{
            isShow : false,
            isMash:true
        }
      }
    },
   components:{
     drawAlert,
     xuAlert,
     bigAlert
   },
    created() {
   
    },
    activated(){
     // console.log(this.$route.query,'ss')
     //判断是否是从抽奖页面回来
    // if(typeof window.cats_p == 'undefined' || getStore('isGotochoujiang') || getStore('isGotodajiang')){
    //     this.$router.push({path:'home',query: {page:'home'}});//前往首页
    //   }
    this.nowData =  window.cats_p;
    this.getdajiang();
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', this.scrollTouch,false);
    },
    mounted(){
      document.querySelector('#app').addEventListener('touchmove', this.scrollTouch,false);
    },
    computed:{
      pss(){
        this.nowData = this.$store.state.p;
        return this.$store.state.p
      },
      tss(){
         this.t = this.$store.state.t;
        return this.$store.state.t;
      }
    },
       watch: {
          pss(val,newvlue){
           // this.nowData = newvlue;
          },
          tss(val,newvalue){
            this.t = newvalue;
          }
         
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
          window.$post([{id:25,times:1}]);//按钮埋点
          // let url = '';
          // if(this.t<3){
          //   url = '';//
          // }else{
          //   //b页面
          //   url = ''
          // }
          this.$store.commit('setp',this.nowData - 3);
          //window.location.href=url;//跳转抽奖页面
           var url = window.rootUrl+'?ae=2&ci=4&ui='+window.userId;
          loginApi(url,{},'GET').then((res)=>{
            if(res.status == 200){
                 if(res.data.rc==1){
                   //需要设置存储isGotochoujiang
                     setStore('isGotochoujiang',true);
                     history.pushState({ui:window.userId,gotopage:1}, '招商猫', window.location.origin+window.location.pathname+'?ui='+window.userId+'&gotopage=1');
                     window.location.href = 'http://www.baidu.com';
                     if(res.data.urlIndex == 1){
                         //a页面
                     }else{
                         //b页面
                     }
                }
            }
          })
        },
        gotpHouse(){
          //去旅行
          // if(this.nowData>=3){
          //    //前往抽奖
          //   this.$nextTick(()=>{
          //     window.$post([{id:14,times:1},{id:26,times:1}]);//按钮埋点
          //     this.goDrawDialogIsShow.isShow = true;
          //     this.goDrawDialogIsShow.t = window.cats_t;
          //     this.goDrawDialogIsShow.p = this.nowData;

          //   });
          // }else if(window.cats_t == 0){
          //   //休息
          //   this.goXuxiDialogIsShow.isShow = true;
          //    window.$post([{id:15,times:1},{id:26,times:1}]);//按钮埋点
          // }else{
            //前往城市列表
             window.$post([{id:26,times:1}]);//按钮埋点
             this.$router.push({path:'city',query: {page:'city'}});
         // }
        },
        gotoBigDraw(){
          //抽大奖
          //判断是否满足24
           //城市列表
           let lengthCity = 0;
          window.cityListJson.forEach(element => {
              if(element.isShow){
                ++lengthCity;
              }
          });
          if(lengthCity == window.cityListJson.length && lengthCity>0 && !this.isLotteryFinalAward){
             this.goBigDialogIsShow.isAll = false;
          }else{
             this.goBigDialogIsShow.isAll = true;
          }
          this.goBigDialogIsShow.isShow = true;
        },
        getdajiang(){
            var url = window.rootUrl+'?ae=2&ci=10&ui='+window.userId;//获取是否可以抽大奖
            loginApi(url,{},'GET').then((res)=>{
              if(res.status == 200){
                  if(res.data.rc==1){
                     this.isLotteryFinalAward = res.data.isLotteryFinalAward;
                  }
              }
            })
        }
    }
  }
</script>
<style scoped lang="scss">
    .contain-box{
        background: url('../../assets/img/guid/home_bg.png') #999;
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
            top: calc(50% - 6rem);
            width: 100%;
       }
       .myhouse-icon{
          position: absolute;
         top:-2.6rem;
         left: calc(50% - 3.306667rem);
         height: 7.573333rem;
         width: 6.592rem;
         background: url('../../assets/img/guid/house__08.png') #999;
         background-repeat: no-repeat;
         background-size: contain;
       }
      .wo-box {
             width: 16rem;
             margin: 0 auto;
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
            animation: rotate 1s linear infinite;
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
                animation: xinxin 1s linear infinite;
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
            animation: rotate 1s linear infinite;
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
            animation: rotate 1s linear infinite;
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
                animation: xinxin .8s linear infinite;
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
          position: absolute;
          top: calc(50% - 6rem + 5.84rem);
          left:calc(50% - 7.51rem);
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
        bottom:13%;
        text-align: center;
        .btn-one{
             display: inline-block;
              width: 6.357333rem;
              background-image: url('../../assets/img/guid/window_2_btn.png');
              background-repeat: no-repeat;
              background-size: contain;
              box-sizing: border-box;
              height: 100%;
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
    .btn-big{
        height: 3.392rem;
        width: 100%;
        position: fixed;
        bottom: 0.4rem;
        text-align: center;
        .btn-egg{
           display: inline-block;
            width: 3.541333rem;
            background-image: url('../../assets/img/guid/home_image11.png');
            background-repeat: no-repeat;
            background-size: contain;
            box-sizing: border-box;
            height: 100%;
            -webkit-transform-origin: 70% 100%;
            transform-origin: 70% 100%;
             animation: leftright .5s linear infinite;
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
   @keyframes leftright {
      0% {transform: rotate(-5deg);}
      50% {transform: rotate(5deg);}
      100% {transform: rotate(-5deg);}
  }
    @keyframes xinxin {
      0%, 100% {transform: scale(1,1);opacity: 0;}
      50% {transform: scale(1.4,1.4);opacity: 1;}
  }
</style>
<style lang="scss">
   
   
</style>

