<template>
  <div class="contain-box">
    <div class="body-box" style="position:relative">
       <div class="body-scorll">
            <div class="flex-box">
                <div @click="selectedCity(item)" :class="item.isShow?'execit':''" class="flex-item" v-for="(item,index) in cityList" :key="index">
                    <div :class="item.isExe?'execits':''" class="icon">
                        <img v-lazy =item.src alt="2">
                    </div>
                    <div class="cityname">
                        {{item.chName}}
                    </div>
                </div>
            </div>
            
       </div>
      <div class="scorllBar">
          <vue-slider @drag-start="dragStart" @drag-end="dragEnd" :width="12" @callback="setScrollCity" :tooltip="false" :processStyle="range.processStyle" :sliderStyle="range.sliderStyle" :bgStyle="range.bgStyle" :speed="range.speed" v-model="rangeValue" :direction="range.vertical" :height="range.height"></vue-slider>
      </div>
    </div>
    <div class="body-footer">
      <span @click="gototavel" class="btn-one-go" :class="btnnone?'btnnone':''">
      </span>
    </div>
    <div @click="goBack" class="goback">

    </div>
    <div style="display:none">
        {{isnum}}
    </div>
     <cloud-alert :dataOjb="cloundXuxiDialogIsShow"> </cloud-alert>
    <draw-alert :dataOjb="goDrawDialogIsShow"> </draw-alert>
    <xu-alert :dataOjb="goXuxiDialogIsShow"> </xu-alert>
  </div>
</template>
<script>
    var compare = function (prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop] ? 0:1;
            var val2 = obj2[prop]? 0:1;
            if (val1 > val2 ) {
                return -1;
            }else if(val1 < val2 ){
                return 1; 
            } else {
                return 0;//不变
            }            
        } 
    }
  import vueSlider from 'vue-slider-component';
  import {cityListJson} from '@/utils/build.js'
  import cloudAlert from '@/views/home/cloudAlert.vue'
    import drawAlert from '@/views/home/drawAlert.vue'
  import xuAlert from '@/views/home/xuAlert.vue'
   import {loginApi} from '@/api/index'
    import {setStore,getStore} from '@/utils/utils.js'
  export default {
    data(){
      return {
        fangchongfu:false,
         rangeValue:100,
        range:{
          vertical:'vertical',
          height:'100%',
          speed:0.2,
          bgStyle:{          //背景样式
            background:'url(static/list/list_slider_bar.png) no-repeat',
            backgroundSize:'100% 100%'
          },
          sliderStyle:{      //滑块样式
            width:'26px',
            height:'26px',
            left:'-6px',
            borderRadius:'0',
            background:'url(static/list/list_slider.png) no-repeat',
            backgroundSize:'26px 26px',
            bottom:'-6px',
            boxShadow:'none'
          },
          processStyle:{ //进度条样式
            background:'transparent'     
          }
        },
         isnum:0,
         btnnone:true,
         t:0,
         p:0,
         selected:null,
        goDrawDialogIsShow:{
            isShow : false,
            isMash:true,
            id:23,
            t:0,
            p:0
        },
         cloundXuxiDialogIsShow:{
            isShow : false,
            isMash:true,
            isClound:false 
          },
        goXuxiDialogIsShow:{
            isShow : false,
            isMash:true
        }
      }
    },
    components:{
    drawAlert,
     xuAlert,
     cloudAlert,
     vueSlider
   },
    computed:{
      pss(){
        this.p = this.$store.state.p;
        return this.$store.state.p
      },
      tss(){
         this.t = this.$store.state.t;
        return this.$store.state.t;
      }
    },
       watch: {
          pss(val,newvlue){
            this.p = newvlue;
          },
          tss(val,newvalue){
            this.t = newvalue;
          },
          // rangeValue(value){
          //   this.setScrollCity(value);
          // }
         
      },
    created() {
        this.cityList = cityListJson();
    },
    activated(){
      //判断是否是从专业回来,抽奖回来
      //  let pages = getStore('isGotoZhuanqu');
      //   if(pages == true){
      //     this.$router.push({path:'home',query: {page:'home'}});//前往首页
      //   }
      // if(typeof window.cats_p == 'undefined' || getStore('isGotoZhuanqu') || getStore('isGotochoujiang')){
      //   this.$router.push({path:'home',query: {page:'home'}});//前往首页
      // }
        this.cityList.sort(compare("isExe"));
         this.isnum = this.isnum+1;
         this.sDom =  document.querySelector('.body-scorll');
         this.scrollHeight = this.sDom.scrollHeight - this.sDom.offsetHeight;
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', this.scrollTouch,false);
    },
    mounted(){
      let that = this;
      this.overscroll(document.querySelector('.body-scorll'));
      document.querySelector('#app').addEventListener('touchmove', this.scrollTouch,false);
      // document.querySelector('.body-scorll').onscroll = function() {
      //   let value =  (that.scrollHeight -  that.sDom.scrollTop)*100/that.scrollHeight;
      //   that.$nextTick(function(){
      //     that.rangeValue = parseInt(value);
      //   })
      // };
      this.requestAnimationID = window.requestAnimationFrame(this.setRange);
    },
    methods:{
      setRange(){
         let that = this;
         if(that.scrollHeight){
           let value =  (that.scrollHeight -  that.sDom.scrollTop)*100/that.scrollHeight;
           that.rangeValue = value//parseInt(value);
         }
         this.requestAnimationID = window.requestAnimationFrame(this.setRange);
      },
      dragStart(){
         window.cancelAnimationFrame(this.requestAnimationID);
      },
      dragEnd(){
         this.requestAnimationID = window.requestAnimationFrame(this.setRange);
      },
        scrollTouch(evt){
            if(!evt._isScroller) {
                evt.preventDefault();
            }
        },
           overscroll(el){
                el.addEventListener('touchstart', function(){
                    var top = el.scrollTop;
                    var totalScroll = el.scrollHeight;
                    var currentScroll = top + el.offsetHeight;
                    if(top === 0) {
                        el.scrollTop = 1;
                    }else if(currentScroll === totalScroll){
                        el.scrollTop = top - 1;
                    }
                });
                el.addEventListener('touchmove', function(evt){
                    if(el.offsetHeight < el.scrollHeight){
                        evt._isScroller = true;
                    }
                });

        },
        setScrollCity(value){
          let scrollHeight = this.scrollHeight;
          this.sDom.scrollTop = scrollHeight - scrollHeight*value/100;
        },
        goBack(){
          this.$router.back()
        },
        selectedCity(item){
         this.btnnone = false;
          this.cityList.forEach(element => {
            element.isShow = false;
            if(element.code == item.code){
             // this.$nextTick(()=>{
                element.isShow = true;
                this.selected = item;
             // })
            }
          });
          this.isnum = this.isnum+1;
        },
        clound(page){
          let that = this;
        that.cloundXuxiDialogIsShow.isShow = true;
          //需要调用去往城市接口
          var url = window.rootUrl+'?ae=2&ci=5&ui='+window.userId;//设置去过改城市
                loginApi(url,{params:JSON.stringify({cityCode:that.selected.code})},'GET').then((res)=>{
                  if(res.status == 200){
                      if(res.data.rc==1){
                        
                      }
                  }
                })
        window.setTimeout(()=>{
          that.cloundXuxiDialogIsShow.isShow = false;
           setStore('isGotoZhuanqu',true);
             this.$Indicator.open({
                text: '正在努力加载中...',
                spinnerType: 'triple-bounce'
              });
          history.pushState({ui:window.userId,gotopage:1}, '招商猫', window.location.origin+window.location.pathname+'?ui='+window.userId+'&gotopage=1');
          location.href = that.selected.url;
         // this.$router.push({path:page,query: {page:page}});
        },5000)
      },
        gototavel(){
          let that =this;
            if(!this.btnnone && !this.fangchongfu){
                this.fangchongfu = true;
                setTimeout(()=>{
                  that.fangchongfu = false;
                },300)
                //可点击状态
                let c = this.selected.isExe ?1:0;
                if(c==1 && window.cats_p<3){
                    //城市专区
                   window.$post([{id:24,times:1},{id:16,times:1}]);//埋点
                   this.clound('page');
                   return ;
                }
                 if(c==0 && window.cats_p<3 && window.cats_t>0){
                    //城市专区
                    this.$store.commit('setp',window.cats_p +1);
                    this.$store.commit('sett',window.cats_t -1);
                    this.setCitySelect(this.selected.code);
                   window.$post([{id:24,times:1},{id:16,times:1}]);//埋点
                 
                   this.clound('page');
                   return ;
                }
                if(c==0 && window.cats_p<3 && window.cats_t==0){
                     this.goXuxiDialogIsShow.isShow = true;
                     window.$post([{id:12,times:1},{id:24,times:1}]);//休息
                     return ;
                }
                if(window.cats_p>=3){
                    //抽奖
                     window.$post([{id:11,times:1},{id:24,times:1}]);
                    this.goDrawDialogIsShow.isShow = true;
                    this.goDrawDialogIsShow.t = window.cats_t;
                    this.goDrawDialogIsShow.p = window.cats_p;
                }
            }
        },
     setCitySelect(code){
          //旗子
          window.flageImage.forEach(element => {
              if(element.code == code){
                element.isShow = true;
              }
          });
          //地图城市
           window.buildImage.forEach(element => {
              if(element.code == code){
                element.isShow = true;
              }
          });
          //城市列表
           window.cityListJson.forEach(element => {
              if(element.code == code){
                element.isExe = true;
              }
          });
           this.isnum = this.isnum+1;
      }
    }
  }
</script>
<style scoped lang="scss">
.scorllBar{
  position: fixed;
  top:3.8rem;
  right: 1.8rem;
  width: 14px;
  bottom:5.8rem;
}
    .contain-box{
        background: url('../../assets/img/guid/list_bg2.png') #999;
        background-repeat: no-repeat;
        background-size: 100% 100%;
       .body-box{
         height: calc(100% - 9.4rem);
          position: absolute;
          top: 3.84rem;
          z-index: 1991;
          width: 100%;
          box-sizing: border-box;
          padding-left: 1.6rem;
          padding-right: 1.6rem;
          .body-scorll{
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            position: relative;
          }
       }
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
       .flex-box{
         display: flex;
         flex-wrap: wrap;
         .flex-item{
           width: 4.032rem;
           height: 5.312rem;
           flex-grow: 0;
           flex-shrink: 0;
             background-image: url('../../assets/img/guid/list_image_1.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            .icon{
              height: 3.2rem;
              width: 3.050667rem;
              margin: 0 auto;
              padding-right: .085333rem;
              margin-top: .64rem;
               position: relative;
              img{
                height: 100%;
                width:100%;
              }
            }
            .cityname{
            text-align: center;
            color: #ce4e30;
            font-family:'zhonghei';
            font-size: 12px;
            height: 1.2rem;
            line-height: 1.2rem;
            // position: relative;
            // top:.170667rem;
            }
         }
         .execit{
            background-image: url('../../assets/img/guid/list_image_2.png');
          
               
            }
         }
         .execits.icon{
              &:before{
                content: '';
               position: absolute;
               right: 0.185333rem;
               top:0.1rem;
               height: .96rem;
               width: .96rem;
               background-image: url('../../assets/img/guid/index_came_2.png');
               background-repeat: no-repeat;
               background-size: .96rem .96rem;
              }
         }
       .body-footer{
         height: 4rem;
          position: absolute;
          bottom: 0;
          z-index: 1991;
          width: 100%;
          text-align: center
       }
       .btn-one-go{
          display: inline-block;
                width: 6.762667rem;
                 background-image: url('../../assets/img/guid/list_btn_go.png');
                 background-repeat: no-repeat;
                 background-size: contain;
                 box-sizing: border-box;
                 height: 3.605333rem;
                 top:0.2rem;
                 position: relative;
       }
      .btn-one-go:active{
        animation: active .2s linear;
      }
       .btnnone{
           -webkit-filter:grayscale(1)
       }
       .btnnone:active{
          animation: none;
       }
    }
    .body-scorll::-webkit-scrollbar {
        display: none;
    }
    @keyframes active {
      0% {transform: scale(1,1);opacity: 0.8;}
      50%,100% {transform: scale(1.1,1.1);opacity: 1;}
  }
</style>
<style lang="scss">
   
   
</style>

