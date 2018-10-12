<template>
  <div class="alert-own alertsd" :class="dataOjb.className" v-show="dataOjb.isShow">
    <div class="alert-content flex">
        <div class="flex-grid">
            <div class="alert-icon">
                
            </div>
            <div class="alert-text">
              
            </div>
            <div class="alert-button">
                <span v-stat="{id:dataOjb.id,times:1}" @click="goToDraw" class="btn-one">

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
 import {loginApi} from '@/api/index'
 import {setStore,getStore} from '@/utils/utils.js'
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
                    isShow : false,
                    id:0,
                    t:0,
                    p:0
                }
            }
        }
    },
    mounted(){
     
    },

    methods:{
      closeDailog(){
          this.dataOjb.isShow = false;
      },
      goToDraw(){
          this.dataOjb.isShow = false;
            // let url = '';
            // if(this.dataOjb.t<3){
            //     url = '';//
            // }else{
            //     //b页面
            //     url = ''
            // }
            this.$store.commit('setp',this.dataOjb.p - 3);
           // window.location.href=url;//跳转抽奖页面
           var url = window.rootUrl+'?ae=2&ci=4&ui='+window.userId;
            history.replaceState({userid:window.userId,gotopage:1}, '招商猫', window.location.origin+window.location.pathname+'?userid='+window.userId+'&gotopage=1');
          loginApi(url,{},'GET').then((res)=>{
            if(res.status == 200){
                 if(res.data.rc==1){
                     //需要设置，本地存储isGotochoujiang
                     setStore('isGotochoujiang',true);
                     window.location.href = 'http://cmbls/FunctionJump?action=gofuncid&funcid=16335001&clean=false&closeCurrentView=false&cmb_app_trans_parms_start=here&needlogin=false&ActGroupID=AGP20180929145930vn5XQmuc';
                    //  if(res.data.urlIndex == 1){
                    //      //a页面
                    //  }else{
                    //      //b页面
                    //  }
                }
            }
          })
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
            .alert-icon{
               width: 5.034667rem;
               height: 100%;
               
               img{
                   height: 100%;
               }
            }
            .alert-button{
                height: 2.432rem;
                position: absolute;
                bottom: 0.8rem;
                z-index: 2001;
                width: 100%;
            }
            .btn-one{
                display: inline-block;
                width: 4.202667rem;
                 background-image: url('../../assets/img/guid/window_2_btn.png');
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
                 width: 11.946667rem;
                 background-image: url('../../assets/img/guid/window_2.png');
                 background-repeat: no-repeat;
                 background-size: contain;
                 box-sizing: border-box;
                 height: 11.776rem;
                 position: relative;
                 .close{
                     height: 1.92rem;
                     position: relative;
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
