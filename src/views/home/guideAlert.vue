<template>
  <div class="alert-own" :class="dataOjb.className" v-show="dataOjb.isShow">
    <div class="alert-content flex">
        <div class="flex-grid">
            <div class="alert-text scroll-guide">
                <p class="content">
                    欢迎大家来到招喵小麦的世界，动动手指就能环游中国啦，还有机会获得精美奖品哦！iPhone X、百元话费券、商城券等你来拿！
                    <span class="title">活动时间：</span>即日起至10月31日
                    <span class="title">活动对象：</span>招商银行App所有客户均可参加活动
                    <span class="title">参与方式：</span>
                    <span style="display:block">1、用户登录之后，拖动地图点击任意城市，或者点击页面下方的“去旅行”，进入城市列表，点击任意一座城市，都可以让小麦来到对应的城市旅行。</span>
                    <span style="display:block">2、每次小麦旅行回来会为您带来一份手信，可以在“我的小窝”查看您拥有的手信及数量。小麦每天可以去旅行的城市不限，但最多只能带回三个手信。</span>
                    <span style="display:block">3、每集齐三份手信，即可参与一次抽奖，50元话费券、自拍杆、商城券等奖品等你来拿！每天最多只有一次抽奖机会。</span>
                    <span style="display:block">4、当小麦完成了所有城市的旅游之后，即可抽取惊喜彩蛋大奖，更有机会获得实物奖品，iPhone X、 200元话费券、耳机、商城券等豪礼等你来拿哟！</span>
                    <span class="title">注意事项：</span>
                    <span style="display:block">1、“我的小窝”容量有限，您拥有的手信第二天就会被清空，如果已经集满三个手信，请您尽快参与抽奖哦。</span>
                    <span style="display:block"> 2、如有问题请联系招商银行客服：95555。</span>
                </p>
            </div>
            <div class="alert-button">
                <span @click="closeDailogAndDestory" class="btn-one">

                </span>
                <span @click="closeDailog" class="btn-two">

                </span>
            </div>
            <div class="close">
                <div style="height:1.28rem"></div>
                <span @click="closeDailog"></span>
            </div>
        </div>
    </div>
    <div :class="dataOjb.isMash?'alert-mash':''">

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {

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
        // icon:{
        //     type:String,
        //     default:function(){
        //         return require('../../assets/img/icon/i_26.png');
        //     }
        // }
    },
    mounted(){
       this.overscroll(document.querySelector('.scroll-guide'));
    },
    computed: {
    isShow() {
    　　　　return this.dataOjb.isShow
    　　}
    },
    watch:{
        isShow(value){
           if(value){
             //   this.overscroll(document.querySelector('.scroll-guide'));
              //   document.querySelector('.alert-own').addEventListener('touchmove', this.scrollTouch,false);
           }else{
               //  document.querySelector('.alert-own').removeEventListener('touchmove',this.scrollTouch,false);
           }
        }
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
      closeDailogAndDestory(){
          //关闭页面逻辑
          this.dataOjb.isShow = false;
      },
      closeDailog(){
          this.dataOjb.isShow = false;
      }
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
        .content{
            font-size: 13px;
                font-family:'zhonghei';
            color: #b47436;
            display: block;
            text-align: left;
            margin-top: .426667rem;
            
        }
            .title{
            font-size: 14px;
                font-family:'zhonghei';
            color: #532e00;
            display: block;
            text-align: left;
            margin-top: 0.2rem;
        }
        .alert-content{
            position: relative;
            z-index: 2000;
            .alert-text{
               width: 100%;
               height: calc(100% - 3.904rem - 3.304rem);
               overflow-x: hidden;
               overflow-y: auto;
               margin-top: 3.304rem;
               margin-bottom: 0;
               padding-left: 1.536rem;
               margin-right: 0;
               -webkit-overflow-scrolling:touch;
               p{
                   text-align: left;
                   font-size: 14px;
               }
            }
            .alert-button{
                height: 2.517333rem;
                position: absolute;
                bottom: 1.152rem;
                z-index: 2001;
                width: 100%;
            }
            .btn-one{
                display: inline-block;
                width:6.122667rem;
                 background-image: url('../../assets/img/guid/zhinan_win_btn.png');
                 background-repeat: no-repeat;
                 background-size: contain;
                 box-sizing: border-box;
                 height: 100%;
            }
        }
        .flex{
            display: flex;
            align-items: center;
            height: 100%;
            text-align: center;
            .flex-grid{
                    top: -2rem;
                margin:0 auto;
                 width: 13.653333rem;
                 background-image: url('../../assets/img/guid/zhinan_window.png');
                 background-repeat: no-repeat;
                 background-size: contain;
                 box-sizing: border-box;
                 height: 18.666667rem;
                 position: relative;
                 padding-right: 1.536rem;
                 .close{
                     height: 1.92rem;
                     position: relative;
                     top:2.6rem;
                     left: 0.768rem;
                     span{
                     background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9d3yJTAAAAKnRSTlMA4y8uCCcN3oLtxbuml0M7ECr42NabVxz0vpGJUE6F23DozKBZJBjNc86W928EAAAB40lEQVRIx51X25aCMAwMyq0CFhcQRQTvuv7/B27TslApCCfzoJYyZ6Zp0kYYgstfWZDWjNVpkJ24C7PglqH1/oAVltPcvPLeA/D8/Cst9s+tzGUfBPtLK37243FemaqXkujmNK/Fzi1K1NO0HKHZhZz/Cdd2b2Id/sipwh5c3UrSog0MYBNJ6iofmErkDIcR8JW06xg8GcyDDaOwDzK8PWaOerstfMV2h5ofbm30wdYwgTXD1eiuCtRD3hQTNYtufET3jc8Jt/jmsc3OGuMCs4ARql1Q8JXzKXTR8EHiwcS+c5gJLjKBPVrBCGYj+pd0LRHRu1YhVbbpJUdWaZVxF5KW24Q0hA6VeL7QeQsLJTqEGNjmW9/CKxbjshsvsSSv+maiknKa2Lox661rLuRQN28n0is3QrNomd3ACA+Hl0oak7mUPhXPTJ8TZOKzX2RLxex+fMIRDzMIxEwMg0zHGeRBLB4HIFb6VGPTrelT4SnKEkTl79XQ1FR6JvbiJACGsgNwvOakMIHLY2Qi2SopOL8YHOp2kBOAnHLkJCeXFb2QoSQdHeTDino8kg9k+hVAv3To1xz9YqVf5fTmgd6uIBxCg0RoyQhNIKXtPJIb3W/IfUJrTW7mOy4/ZUHqMeaN/334AweBb5s601/AAAAAAElFTkSuQmCC');
                     height: 1.194667rem;
                     width: 1.194667rem;   
                     display: inline-block;
                      background-size: cover;
                      
                     }
                 }
            }
        }
    }
</style>
