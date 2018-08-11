<template>
  <div class="contain-box">
    <div class="body-box">
       <div class="body-scorll">
            <div class="flex-box">
                <div @click="selectedCity(item)" style="touch-action: none;" :class="item.isShow?'execit':''" class="flex-item" v-for="(item,index) in cityList" :key="index">
                    <div :class="item.isExe?'execits':''" class="icon">
                        <img v-lazy =item.src alt="2">
                    </div>
                    <div class="cityname">
                        {{item.chName}}
                    </div>
                </div>
            </div>
       </div>
       <!-- <div>
         <input type="range" class="range">
       </div> -->
    </div>
    <div class="body-footer">
      <span v-tap="gototavel" class="btn-one-go" :class="btnnone?'btnnone':''">
      </span>
    </div>
    <div v-tap="goBack" class="goback">

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
  import {cityListJson} from '@/utils/build.js'
  import cloudAlert from '@/views/home/cloudAlert.vue'
    import drawAlert from '@/views/home/drawAlert.vue'
  import xuAlert from '@/views/home/xuAlert.vue'
  export default {
    data(){
      return {
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
     cloudAlert
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
          }
         
      },
    created() {
        this.cityList = cityListJson();
    },
    activated(){
        this.cityList.sort(compare("isExe"));
         this.isnum = this.isnum+1;
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', this.scrollTouch,false);
    },
    mounted(){
      this.overscroll(document.querySelector('.body-scorll'));
      document.querySelector('#app').addEventListener('touchmove', this.scrollTouch,false);
    },
    methods:{
        scrollTouch(evt){
            if(!evt._isScroller) {
                evt.preventDefault();
                 evt.stopPropagation();
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
        this.cloundXuxiDialogIsShow.isShow = true;
        window.setTimeout(()=>{
          this.cloundXuxiDialogIsShow.isShow = false;
          //location.href = page;
         // this.$router.push({path:page,query: {page:page}});
        },5000)
      },
        gototavel(){
            if(!this.btnnone){
                //可点击状态
                let c = this.selected.isExe ?1:0;
                if(c==1 && this.p<3){
                    //城市专区
                   window.$post([{id:24,times:1},{id:16,times:1}]);//埋点
                   this.clound('page');
                }
                 if(c==0 && this.p<3 && this.t>0){
                    //城市专区
                    this.$store.commit('setp',this.$store.state.p +1);
                    this.$store.commit('sett',this.$store.state.t -1);
                    this.setCitySelect(this.selected.code);
                   window.$post([{id:24,times:1},{id:16,times:1}]);//埋点
                   this.clound('page');
                }
                if(c==0 && this.p<3 && this.t==0){
                     this.goXuxiDialogIsShow.isShow = true;
                     window.$post([{id:12,times:1},{id:24,times:1}]);//休息
                }
                if(this.p>=3){
                    //抽奖
                     window.$post([{id:11,times:1},{id:24,times:1}]);
                    this.goDrawDialogIsShow.isShow = true;
                    this.goDrawDialogIsShow.t = this.t;
                    this.goDrawDialogIsShow.p = this.p;
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
    .contain-box{
        background-image: url('../../assets/img/guid/list_bg2.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
       .body-box{
         height: calc(100% - 8.8rem);
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
       .btnnone{
           -webkit-filter:grayscale(1)
       }
    }
    .body-scorll::-webkit-scrollbar {
        display: none;
    }
  
</style>
<style lang="scss">
   
   
</style>

