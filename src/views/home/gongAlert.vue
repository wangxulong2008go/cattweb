<template>
  <div class="alert-own" :class="dataOjb.className" v-show="dataOjb.isShow">
    <div class="alert-content flex">
        <div class="flex-grid">
            <div class="alert-text scroll-gong">
                <p>
                    功能页面内容
                </p>
            </div>
            <div class="alert-button">
                <span v-tap="closeDailogAndDestory" class="btn-one">

                </span>
                <span v-tap="closeDailog" class="btn-two">

                </span>
            </div>
            <div class="close">
                <div style="height:1.28rem"></div>
                <span v-tap="closeDailog"></span>
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
       this.overscroll(document.querySelector('.scroll-gong'));
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
        .alert-content{
            position: relative;
            z-index: 2000;
            .alert-text{
               width: 100%;
               height: calc(100% - 3.904rem - 2.304rem);
               overflow-x: hidden;
               overflow-y: auto;
               margin-top: 2.304rem;
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
                height: 2.645333rem;
                position: absolute;
                bottom: 1.152rem;
                z-index: 2001;
                width: 100%;
            }
            .btn-one{
                display: inline-block;
                width: 4.821333rem;
                 background-image: url('../../assets/img/guid/house_window_1_btn.png');
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
                margin:0 auto;
                 width: 10.986667rem;
                 background-image: url('../../assets/img/guid/house_window_2.png');
                 background-repeat: no-repeat;
                 background-size: contain;
                 box-sizing: border-box;
                 height: 14.997333rem;
                 position: relative;
                 padding-right: 1.536rem;
                 .close{
                     height: 1.92rem;
                     position: relative;
                     top:3.6rem;
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
