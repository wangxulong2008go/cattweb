<template>
  <div class="contain-box" style="width:100%">
       <div class="infoHtml">
        <div style="display:none">
            <img src="../../assets/img/guid/shareimg.png" alt="share">
        </div>
        <div class="goback back" @click="goback">

        </div>
        <div class="foot-box">
            <div class="share-box" style="width:100%;">
                <div onclick="shareFunc('weixinsession')" style="display:inline-block;padding-left:12.5%">
                    <img src="../../assets/img/guid/weixin.png" alt="weixin">
                    <p><span>微信好友</span></p>
                </div>
                <div onclick="shareFunc('weixintimeline')" style="display:inline-block;padding-right:12%">
                <img src="../../assets/img/guid/people.png" style="padding:6px" alt="weixin">
                <p><span>朋友圈</span></p>
                </div>
            </div>
            <div class="cancel back" @click="goback">
                取消
            </div>
        </div>
        </div>
  </div>
</template>
<script>
window.CMBLS.socialShare = {};
function cmblsJSExecutosr(cmblsCommand)
{
    if (window.cmblsExecutor) {
        var cmblsExecutor = window.cmblsExecutor || {};
        window.cmblsExecutor.executeCmbls("1.0", cmblsCommand);
    } else {
        document.addEventListener('CMBLSExecutorReady', function () {
            var cmblsExecutor = window.cmblsExecutor || {};
            window.cmblsExecutor.executeCmbls("1.0", cmblsCommand);
        }, false);
    }
};

window.shareFunc = function(channel){
 // var url ="https://cmbls/socialshare?id=catshare&type=url&url=https://test.withmedia.net/project1/shareurl.html&channel="+channel+ "&text="+"iPhoneX、百元话费券、商城券等豪礼等你拿！";
  var title = '跟着招猫去旅行，每日抽奖赢豪礼！';
  var text = 'iPhone XS Max、百元话费券、商城券等豪礼等你拿！';
  var shareUrl =encodeURI('https://cmbls/socialshare?id=fdsfsdfsf&type=url&url=https://test.withmedia.net/project1/shareurl.html&picurl=https://test.withmedia.net/project1/sharestatic/image/shareimg.png&channel='+channel+'&title='+title+'&text='+text);
  //var shareUrl =encodeURI('https://cmbls/socialshare?id=fdsfsdfsf&type=url&url=https://project1.withmedia.net/project/shareurl.html&picurl=https://project1.withmedia.net/project/sharestatic/image/shareimg.png&channel='+channel+'&title='+title+'&text='+text);
  cmblsJSExecutosr(shareUrl);//分享
}
window.CMBLS.socialShare.successCallback = function(id,message){
  
}

window.CMBLS.socialShare.failCallback = function(id,message){
  alert(message)
}
 import {loginApi} from '@/api/index'
 function scrollTouch(evt){
            if(!evt._isScroller) {
                evt.preventDefault();
                 evt.stopPropagation();
            }
        }
  export default {
    data(){
      return {
          
      }
    },
    created() {
        
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', scrollTouch,false);
    },
    activated(){
   
    },
    mounted(){
      document.querySelector('#app').addEventListener('touchmove', scrollTouch,false);
    },
    methods:{
        goback(){
            history.go(-1);
        }
    }
  }
</script>
<style scoped lang="scss">
    .contain-box{
      
    }
    .infoHtml{
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.6);
  }
  .foot-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6rem;
    background: #fff;
    color: #666;
    font-size: 0.48rem;
  }
  .share-box{
    box-sizing: border-box;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #ddd;
    height: 3.3rem;
  }
  .share-box img{
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    padding: 2px;
    border: 1px solid #ddd;
    box-sizing: border-box
  }
  .share-box>div{
    box-sizing: border-box;
    width: 49%;
    text-align: center;
  }
  .cancel{
    text-align: center;
    font-size: 0.56rem;
    color: red;
    line-height: 2.698667rem;
  }
  .goback{
    display: inline-block;
    position: fixed;
    height: 1.898667rem;
    width: 1.877333rem;
    background-image: url('../../assets/img/guid/back.png');
    background-repeat: no-repeat;
    background-size: contain; 
    top: 0.4rem;
    left: 0.4rem;
    border-radius: 50%;
    box-shadow: 0px 1px 4px 2px #333;
  }
</style>


