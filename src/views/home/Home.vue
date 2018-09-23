<template>
  <div class="contain-box relative">
      <div style="display:none">
        <div class="home-house"></div>
        <div class="home-city"></div>
    </div>
    <div class="map-box absolute">
        <div style="background:#999" v-bind:style="{'transform':'translate3d('+bigMapLeft + 'px,'+bigMapTop+'px,0)','width':bigMapWidth+'rem','height':bigMapHeight+'rem'}" class="map-flex absolute">
            <div class="map_bg" style="height:100%;width:100%;line-height:0;">
                <div class="one" style="display:flex">
                    <img width="100px" :src ="bgImage[0]" alt="bg">
                    <img width="100px" :src ="bgImage[1]" alt="bg">
                </div>
                 <div class="two" style="display:flex">
                    <img width="50%" :src ="bgImage[2]" alt="bg">
                    <img width="50%" :src ="bgImage[3]" alt="bg">
                </div> 
                <div class="three" style="display:flex">
                    <img width="50%" :src ="bgImage[4]" alt="bg">
                    <img width="50%" :src ="bgImage[5]" alt="bg">
                </div>
            </div>
            <div class="building-box" style="z-index:10">
                <div v-for="(item,index) in buildImage" :key="index" :style="item.style">
                    <img :src="item.src" :key="item.src" alt="1" style="height:100%;width:100%;touch-action: manipulation" />
                </div>
            </div>
            <div class="building-box" style="z-index:11">
              <div v-for="(item,index) in flageImage" v-if="item.isShow" class="flage-image" :key="index" :style="item.style">
                    <img :src="flageImageSrc" :key="index" alt="1" style="height:100%;width:100%" />
                </div>
            </div>
        </div>
        
        <!-- 用于实际拖动事件目标 -->
        <div id="mask" class="BMap_mask" style="position: absolute; left: 0px; top: 0px; z-index: 9; overflow: hidden; -webkit-user-select: none; width:100%; height: 100%; opacity: 0; background: rgb(0, 0, 0); transition: opacity 0.6s;"></div>
    </div>
    <div v-bind:style="{'width':smallWidth+'rem',height: smallHeight + 'rem'}" class="map-small-box absolute">
      <div class="small-box-bg absolute event-none" v-bind:style="{'transform':'translate3d('+smallMapLeft+'px,'+ smallMapTop + 'px,0)'}">
        <div class="small-viewport absolute" v-bind:style="{width:viewportWhidth+'rem','height': viewportHeight + 'rem'}"></div>
      </div>
    </div>
    <div class="absolute contorl-left-top">
      <div v-stat="{id:5,times:1}" @click="openClose" class="map-close map-icon"></div>
      <div v-stat="{id:6,times:1}" @click="openGuide" class="map-guide map-icon"></div>
      <div @click="goToHouse" class="map-house map-icon">
          <div v-if="thisShouxin" class="hand-letter-message"></div>
      </div>
      <div @click="openShare" class="map-share map-icon"></div>
    </div>
    <div class="absolute contorl-bottom-center">
      <div @click="goToHouses" class="map-go map-icon"></div>
    </div>
     <!-- <vue-lazy-component :timeout="1000"> -->
      <one-alert :dataOjb="closeDialogIsShow"> </one-alert>
      <guide-alert :dataOjb="guideDialogIsShow"> </guide-alert>
      <gong-alert :dataOjb="gongnengDialogIsShow"> </gong-alert>
      <list-alert :dataOjb="goCityListDialogIsShow"> </list-alert>
      <draw-alert :dataOjb="goDrawDialogIsShow"> </draw-alert>
      <xu-alert :dataOjb="goXuxiDialogIsShow"> </xu-alert>
      <cloud-alert :dataOjb="cloundXuxiDialogIsShow"> </cloud-alert>
     <!-- </vue-lazy-component> -->
     <message-alert :dataOjb="showMessageDialogIsShow"> </message-alert>
      <close-alert :dataOjb="gocloseDialogIsShow"> </close-alert>
      <div v-if="isFirstLogin">
          <div class="img-div" @click="isFirstLogin = false">
             <img :src="isFirstImage" alt="1">
             <div class="p-div">
               <p class="p1">每旅行一座城市即可获得一份手信，每日集齐三份手信即可参与抽奖，50元话费券、自拍杆、商城券等你来拿哟！</p>
               <p class="p2">累计旅行24座城市后即可抽取彩蛋大奖，更有机会获得iPhone X、 200元话费券、耳机、商城券等豪礼哟！</p>
             </div>
          </div>
          <div class="alert-mash" @click="isFirstLogin = false"></div>
      </div>
  </div>
</template>
<script>
window.CMBLS.gps = {};
function paramsXML(text){
  try //Internet Explorer
  {
  var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async="false";
  xmlDoc.loadXML(text);
  var city = xmlDoc.getElementsByTagName('city');
  return city[0].innerHTML;
  }
catch(e)
  {
  try //Firefox, Mozilla, Opera, etc.
    {
   var parser=new DOMParser();
   var xmlDoc=parser.parseFromString(text,"text/xml");
    var city = xmlDoc.getElementsByTagName('city');
    return city[0].innerHTML;
    }
  catch(e) {}
  }
}
window.CMBLS.gps.successCallback = function(id, message)
{
   var city = paramsXML(message)
    Bus.$emit("positionsCity", city);
};
window.CMBLS.gps.failCallback = function(id, message)
{
    Bus.$emit("positionsCity", '');
};
function cmblsJSExecutor(cmblsCommand)
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

function autoPlayAudio1() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            document.getElementById('audio').play();
        });
    }
  import {setStore,getStore} from '@/utils/utils.js'
  import {loginApi} from '@/api/index'
  import {buildJson,flageJson,cityListJson} from '@/utils/build.js'
  import oneAlert from '@/views/home/oneAlert.vue'
  import closeAlert from '@/views/home/closeAlert.vue'
  import guideAlert from '@/views/home/guideAlert.vue'
  import gongAlert from '@/views/home/gongAlert.vue'
  import listAlert from '@/views/home/listAlert.vue'
  import messageAlert from '@/views/home/messageAlert.vue'
  import drawAlert from '@/views/home/drawAlert.vue'
  import xuAlert from '@/views/home/xuAlert.vue'
  import cloudAlert from '@/views/home/cloudAlert.vue'
  export default {
    data(){
      return {
          isFirstLogin:false,
          thisShouxin:false,
          isLogin:false,
          p:0,//手信数量,
          t:0,//剩余旅行次数,
          c:0,//c=1，未去过记c=0
          isFirstImage:'static/win_lucky.png',
          bgImage:['static/map_bg_01.png','static/map_bg_02.png','static/map_bg_03.png','static/map_bg_04.png','static/map_bg_05.png','static/map_bg_06.png'],
          buildImage:[],
          flageImage:[],
          isShowShouxin:false,
          cloundXuxiDialogIsShow:{
            isShow : false,
            isMash:true,
            isClound:false 
          },
          closeDialogIsShow:{
            isShow : false,
            isMash:true
          },
          gocloseDialogIsShow:{
            isShow : false,
            isMash:true
          },
          guideDialogIsShow:{
            isShow : false,
            isMash:true
          },
          gongnengDialogIsShow:{
             isShow : false,
             isMash:true,
             title:'',
             content:''
          },
           goCityListDialogIsShow:{
             isShow : false,
             isMash:true,
             id:19
          },
          showMessageDialogIsShow:{
             isShow : false,
             isMash:true
          },
            goDrawDialogIsShow:{
             isShow : false,
             isMash:true,
             t:0,
             p:0,
             id:20
          },
            goXuxiDialogIsShow:{
             isShow : false,
             isMash:true
          },
          flageImageSrc:'static/map_image_icon.png',
          screenWidth:document.body.clientWidth,
          screenHeight:document.body.clientHeight,
          bigMapTop:0,
          bigMapLeft:0,
          bigMapWidth:78.9333,//单位是rem
          bigMapHeight:48.853,
          bigMapWidthr:0,
          bigMapHeightr:0,
          lastTwoPointBigX:[0,0],
          lastTwoPointBigY:[0,0],
          viewportHeight:0,
          viewportWhidth:1.2,
          smallWidth:5.866667,//与大地图比例相同
          smallWidthr:0,
          smallHeight:3.63,
          smallHeightr:0,
          smallMapTop:0,
          smallMapLeft:0,
          smallBigSCaleLeft:1,
          smallBigSCaleTop:1,
          lastTwoPointSmallX:[0,0],
          lastTwoPointSmallY:[0,0],
          smallTouchData:{
            startPageX:0,
            startPageY:0,
            offsetTop:0,
            offsetLeft:0
          },
          bigTouchData:{
            startPageX:0,
            startPageY:0,
            disX:0,
            disY:0
          },
          changeCityDataArr:[
            ['天津','滨海'],['武汉','襄阳','十堰','黄石','孝感','宜昌','黄冈','荆州'],['东莞'],
            ['南京','泰州','扬州','常州','镇江','盐城','连云港','徐州'],['长沙','衡阳','湘潭','株洲','娄底'],
            ['佛山','江门','中山'],['南通'],['呼和浩特','呼伦贝尔','鄂尔多斯','包头'],['重庆'],
            ['南昌','上饶','九江','景德镇','赣州'],['烟台','咸海'],['苏州'],['北京'],['郑州','南阳','安阳','许昌','洛阳'],
            ['杭州','绍兴','嘉兴','湖州','衢州','金华'],['上海'],['济南','滨州','聊城','临沂','淄博','济宁','东营'],
            ['沈阳','丹东','盘锦','鞍山','抚顺'],['昆明','红河','曲靖','丽江'],['广州','湛江','清远'],['无锡'],
            ['成都','乐山','泸州','绵阳'],['合肥','淮北','芜湖','六安','淮南','马鞍山','安庆'],['深圳','珠海','惠州']
          ]
      }
    },
   components:{
     oneAlert:oneAlert,
     guideAlert,
     gongAlert,
     listAlert,
     messageAlert,
     drawAlert,
     xuAlert,
     cloudAlert,
     closeAlert
   },
   watch: {
          screenWidth (val) {
              if (!this.timer) {
                    this.timer = true
                    this.$nextTick(this.setSmallBoxSize);
                    setTimeout(()=>{this.timer = false}, 400)
                }
          },
          screenHeight (val) {
              if (!this.timer) {
                    this.timer = true
                    //this.$nextTick(this.setSmallBoxSize);
                    setTimeout(()=>{this.timer = false}, 400)
                }
          },
          ps(val){
            this.p = val;
          }
          ,
          ts(val){
            this.t = val;
          }
          ,
          cs(val){
            this.c = val;
          }
      },
  activated(){
    if(window.fromRouter && window.fromRouter.path == '/house'){
      this.thisShouxin = false;
    }
    //执行埋点
    window.$post([{id:2,times:1}]);
    this.cloundXuxiDialogIsShow.isClound = false;
    if(window.isReturn){
      return false;
    }
    let isAuth = this.auth();
    // if(isAuth){
    //   this.getCityShouxinTimeData();
    // }
 
  },
  created() {
    let _that = this;
     Bus.$on("cloud",data=> {
         _that.openCloudAndGoCity(data);
        })
    Bus.$on("positionsCity",data=> {
      _that.gotoMapPosition(data);
    })
    // this.$Indicator.open({
    //         text: '正在努力加载中...',
    //         spinnerType: 'triple-bounce'
    //       });
     this.$nextTick(()=>{
      this.buildImage = buildJson();
      this.flageImage = flageJson();
      this.cityListJson = cityListJson();
      window.buildImage = this.buildImage;
      window.flageImage = this.flageImage;
      window.cityListJson = this.cityListJson;
    });
   // let needGuid = getStore('needGuid');
    //if(!needGuid){
      //setStore('needGuid',true);
      //  let pages = getStore('isGotoZhuanqu'); //专业，大奖，抽奖都要走这个，不需要去引导页面
      //  let pageschoujiang = getStore('isGotochoujiang');
      //  let pagesdajiang = getStore('isGotodajiang');
        let isReflesh = getStore('isReflesh');
        window.isReflesh = isReflesh;
      if(window.isReturn){
        return false;
      }
      if(isReflesh == true){
        window.isNeedGuid = true;
        setStore('isReflesh',false);
         _that.audioAutoPlay('audio');
      }else{
       // this.$router.push({path:'guid',query: {page:'guid'}});//手信返回则不需要引导页面
      }

      
    //}
   
    
  },
    destroyed(){
         document.querySelector('.contain-box').removeEventListener('touchmove', this.scrollTouch,false);
    },
    computed:{
        ps() {
        　　　　return this.$store.state.p
        　　},
        ts() {
        　　　　return this.$store.state.t
        　　},
        cs() {
        　　　　return this.$store.state.c
        　　},
    },
    mounted(){
       document.querySelector('.contain-box').addEventListener('touchmove', this.scrollTouch,false);
      document.querySelector('.map-small-box').addEventListener('touchstart',this.touchSmall, false);  
    //  document.querySelector('.map-small-box').addEventListener('touchmove',this.touchSmall, false);  
    //  document.querySelector('.map-small-box').addEventListener('touchend',this.touchSmall, false); 
      document.querySelector('#mask').addEventListener('touchstart',this.touchBig, false);  
     // document.querySelector('#mask').addEventListener('touchmove',this.touchBig, false);  
    //  document.querySelector('#mask').addEventListener('touchend',this.touchBig, false);  
     function musicInBrowserHandler() {
        var audio = document.getElementById('audio');
        audio.play();
          if (audio && audio.paused) {
              audio.play();
          }
          if(audio){
              document.body.removeEventListener('touchstart', musicInBrowserHandler);
          }
        
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);
      window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                window.screenHeight = document.body.screenHeight
                this.screenWidth = window.screenWidth
                this.screenHeight = window.screenHeight
            })()
        }
        this.smallDom=document.querySelector(".small-box-bg");
        this.bigDom=document.querySelector(".map-flex");
        this.init();
        
    },
    methods:{
       audioAutoPlay(id){  
        var audio = document.getElementById(id);  
        audio && audio.play();  
      //  autoPlayAudio1();
        document.addEventListener("WeixinJSBridgeReady", function () {  
            audio && audio.play();  
        }, false);  
        document.addEventListener('YixinJSBridgeReady', function() {  
            audio && audio.play();  
        }, false);  
    },
       scrollTouch(evt){
          this.audioAutoPlay('audio');
            if(!evt._isScroller) {
                evt.preventDefault();
                 evt.stopPropagation();
            }
        },
      getCityShouxinTimeData(){
        //只执行一次
        if(!this.isGetAllData && window.UrlParams.noneclear!=1){
         var url = window.rootUrl+'?ae=2&ci=12&ui='+window.userId;//清楚数据
          loginApi(url,{},'GET').then((res)=>{
            if(res.status == 200){
                 if(res.data.rc==1){
                  this.isGetAllData = true;
                  this.getCityAll();
                  this.getShouxin();
                  this.getreTimes();
                }
            }
          })
           this.isGetAllData = true;
          //  this.getCityAll();
          //  this.getShouxin();
          //  this.getreTimes();
        }else{
           this.isGetAllData = true;
           this.getCityAll();
           this.getShouxin();
           this.getreTimes();
        }
      },
      getCityAll(isLoading){
           //获取所有列表
        if(isLoading){
           this.$Indicator.open({
            text: '正在努力加载中...',
            spinnerType: 'triple-bounce'
          });
        }
         var url = window.rootUrl+'?ae=2&ci=6&ui='+window.userId;//去过所有城市
          loginApi(url,{},'GET').then((res)=>{
            if(isLoading){
              this.$Indicator.close();
            }
            if(res.status == 200){
                 if(res.data.rc==1){
                   let reData = res.data.hadTripCityCode || [];
                   //旗子
                   this.flageImage.forEach(element => {
                      reData.forEach(grid => {
                        if(element.code == grid){
                          element.isShow = true;
                        }
                      });
                   });
                   //地图城市
                    this.buildImage.forEach(element => {
                      reData.forEach(grid => {
                        if(element.code == grid){
                          element.isShow = true;
                        }
                      });
                   });
                   //城市列表
                   this.cityListJson.forEach(element => {
                      reData.forEach(grid => {
                        if(element.code == grid){
                          element.isExe = true;
                        }
                      });
                   });
                }
            }
          });
      },
      getShouxin(isLoading){
       //获取手信
       if(isLoading){
           this.$Indicator.open({
            text: '正在努力加载中...',
            spinnerType: 'triple-bounce'
          });
        }
         var url = window.rootUrl+'?ae=2&ci=1&ui='+window.userId;//手信个数
          loginApi(url,{},'GET').then((res)=>{
            if(isLoading){
              this.$Indicator.close();
            }
            if(res.status == 200){
                 if(res.data.rc==1){
                   let reData =res.data.giftNum || 0;
                   this.p = reData;
                   this.$store.commit('setp',reData);
                  // let pages = getStore('isGotoZhuanqu');
                   // if(pages == true){
                   // setStore('isGotoZhuanqu',false);
                    //手信显示判断
                    if(reData<3 && reData>0 && res.data.isFirstTimeAfterGiftNumChange){
                       this.thisShouxin = true;
                       if(window.isReflesh){
                         window.isReflesh = false;
                         this.showMessageDialogIsShow.isShow = true;//是否显示手信，及是否有弹窗
                       }
                      
                    }else if(reData == 3 && res.data.isFirstTimeAfterGiftNumChange){
                       this.thisShouxin = true;
                       if(window.isReflesh){
                         window.isReflesh = false;
                         this.goDrawDialogIsShow.isShow = true;//是否显示抽奖
                       }
                      
                    }
                //  }
                }
            }
          })
      },
       getreTimes(isLoading){
         //获取剩余次数
        if(isLoading){
            this.$Indicator.open({
              text: '正在努力加载中...',
              spinnerType: 'triple-bounce'
            });
          }
         var url = window.rootUrl+'?ae=2&ci=3&ui='+window.userId;//剩余次数
          loginApi(url,{},'GET').then((res)=>{
            if(isLoading){
              this.$Indicator.close();
            }
            if(res.status == 200){
                 if(res.data.rc==1){
                   let reData = res.data.surplusTripTime || 0;
                   this.t = reData>3?3:reData;
                   this.$store.commit('sett',reData);
                }
            }
          })
      },
      auth(){
           //跳转guid页面则不验证
           //不是引导页，和未登录走这个逻辑
        if(window.isNeedGuid && !this.isLogin){
           this.audioAutoPlay('audio');
              if(!window.userId || window.userId == ''){
                this.goToApp();
            }else{
              //window.userId = window.UrlParams.userid;
              //验证登录
              var url =  window.rootUrl+'?ae=1&ci=3&ui='+window.userId;//连接
              //loginApi(url,{},'GET').then((res)=>{
                 // if(res.status>0 && res.data){
                  //   if(res.data.rc == 1){
                       //登录则请求数据
                       this.isLogin = true;
                       //登录成功，则判断是否是第一次登录
                       this.showIsfirstDialog();
                       this.getCityShouxinTimeData();
                            //移动地图位置
                        if(!window.cats_p){
                          //this.gotoMapPosition();
                          cmblsJSExecutor('https://cmbls/gps?id=catweb&needaddress=true');
                        }
                       
                   //  }
                 // }else{
                    // this.gocloseDialogIsShow.isShow = true;//引导登录页面不需要
                    // window.$post([{id:4,times:1}]);//按钮埋点
                  //  this.goToApp();
                 // }
               // });
            }
            
        }
        if(this.isLogin){
           return true;
        }else{
          return false;
        }
       
      },
      goToApp(){
          //唤起app
          var url =  window.rootUrl+'?ae=1&ci=2&ui=-1'//+window.userId;//连接
          loginApi(url,{},'GET').then((res)=>{
            if(res.status>0 && res.data && res.data.url){
              location.href = res.data.url;
            }
          });
      },
      showIsfirstDialog(){
          // let isFirstLogin = getStore('isFirstLogin');
          // if(!isFirstLogin){
          //    //显示首次登录
          //   this.isFirstLogin = true;
          //   setStore('isFirstLogin',true);
          // }
           var url =  window.rootUrl+'?ae=2&ci=9&ui='+window.userId;//连接
          loginApi(url,{},'GET').then((res)=>{
            if(res.status == 200){
                 if(res.data.rc==1 && !res.data.isOlder){
                   this.isFirstLogin = true;
                }
            }
          });
      },
      //默认是根据大map，设置小map
      init(){
        //获取mapbox的大小比例，设置右上角的比例
        this.setSmallBoxSize();
      },
      setScaleMap(){
        let that = this;
        //关联大小地图比例
        this.smallBigSCaleLeft = this.bigMapWidth/this.smallWidth
        this.smallBigSCaleTop = this.bigMapHeight/this.smallHeight
        //小视口与屏幕比例
        that.$nextTick(()=>{
          that.viewportHeight = 1.2*(that.screenHeight/that.screenWidth); //vieport高度,与屏幕比例一致
        });
        
      },
      setSmallBoxSize(){
        let oHtml = document.querySelector("html")
        let fontSize = oHtml.style.fontSize
        fontSize = parseFloat(fontSize.replace(/px/,''));
        this.bigMapWidthr = fontSize * this.bigMapWidth;//获取真实大小
        this.bigMapHeightr = fontSize * this.bigMapHeight;//获取真实大小
        this.smallWidthr = fontSize * this.smallWidth ;
        this.smallHeightr = fontSize * this.smallHeight ;
       //设置比例
        this.setScaleMap();
         //获取mapbox的大小,设置可视区域
        this.setSmallBoxPosition();
      },
      setSmallBoxPosition(){
        //根据map位置，初始化显示小地图的框框位置
        let smallLeft = this.bigMapLeft/this.smallBigSCaleLeft
        let smallTop = this.bigMapTop/this.smallBigSCaleTop
        this.$nextTick(()=>{
          this.smallMapTop = -smallTop
          this.smallMapLeft = -smallLeft
        })
      },
      setSmallBoxSinglePosition(isSetBigMap){
        //单独设置小窗口位置
        let disX = this.smallTouchData.startPageX - this.smallTouchData.offsetLeft;
        let disY = this.smallTouchData.startPageY - this.smallTouchData.offsetTop;
        let dom = document.querySelector('.small-viewport')
        let smallboxSizeh = dom.offsetHeight;
        let smallboxSizew = dom.offsetWidth;
       //是否这是操作点为中心点
       disX -= smallboxSizew/2;
       disY -= smallboxSizeh/2;
       //是否需要小窗口一定全部显示
       if(this.smallWidthr < smallboxSizew + disX){
          disX = this.smallWidthr - smallboxSizew
        }
        if(this.smallHeightr < smallboxSizeh + disY){
          disY = this.smallHeightr - smallboxSizeh
        }
        if(disX < 0){
          disX = 0;
        }
        if(disY < 0){
          disY = 0;
        }
        this.smallMapLeft = disX
        this.smallMapTop = disY
        //是否更新大地图,默认时时更新
        if(isSetBigMap){
          this.setMapBoxPosition();
        }
      },
      touchSmall(event){
        event = event || window.event;  
        switch(event.type){  
            case "touchstart": 
             event.preventDefault();
             this.smallDom.style.webkitTransition = 'none';
             this.smallDom.style.transition = 'none';
              this.smallTouchData.startPageX = event.targetTouches[0].pageX; 
              this.smallTouchData.startPageY = event.targetTouches[0].pageY;
              this.smallTouchData.offsetTop =  event.targetTouches[0].target.offsetTop;//元素本身的位置
              this.smallTouchData.offsetLeft =  event.targetTouches[0].target.offsetLeft;
              document.querySelector('.map-small-box').addEventListener('touchmove',this.touchSmall, false);  
              document.querySelector('.map-small-box').addEventListener('touchend',this.touchSmall, false); 
            //  this.setSmallBoxSinglePosition(true);
                break;
            case "touchmove":  
                 event.preventDefault();  
                // console.log(event.targetTouches[0],'move') 
                if((Math.abs(event.targetTouches[0].pageX - this.smallTouchData.startPageX) >  6) || (Math.abs(event.targetTouches[0].pageY -  this.smallTouchData.startPageY) > 6)){
                  //最小设置6
                   this.smallTouchData.startPageX = event.targetTouches[0].pageX //+ (event.targetTouches[0].pageX-this.smallTouchData.startPageX)*2; 
                   this.smallTouchData.startPageY = event.targetTouches[0].pageY// + (event.targetTouches[0].pageY-this.smallTouchData.startPageY)*2;
                   //记录最后两点的x值
                  this.lastTwoPointSmallX.shift();
                   this.lastTwoPointSmallX.push(event.targetTouches[0].pageX);
                   this.lastTwoPointSmallY.shift();
                  this.lastTwoPointSmallY.push(event.targetTouches[0].pageY);
                   this.setSmallBoxSinglePosition(true)
                  // raf=requestAnimationFrame(this.setSmallBoxSinglePosition(true));
                }
                break;    
            case "touchend":  
            //console.log(event.changedTouches[0],'end')
                this.smallTouchData.startPageX = event.changedTouches[0].pageX + ((this.lastTwoPointSmallX[1] - this.lastTwoPointSmallX[0]) * 0.5); 
                this.smallTouchData.startPageY = event.changedTouches[0].pageY + ((this.lastTwoPointSmallY[1] - this.lastTwoPointSmallY[0]) * 0.5); 
                  //过渡时间
                //非线性衰减
                var t = 0.5;
                this.smallDom.style.webkitTransition = "all " + t + "s cubic-bezier(0.1, 0.85, 0.25, 1) 0s"; 
                this.smallDom.style.transition = "all " + t + "s cubic-bezier(0.1, 0.85, 0.25, 1) 0s"; 
                this.setSmallBoxSinglePosition(true);
                document.querySelector('.map-small-box').removeEventListener('touchmove',this.touchSmall, false);  
                document.querySelector('.map-small-box').removeEventListener('touchend',this.touchSmall, false); 
                break;  
            
        }  
      },
      setMapBoxPosition(isTrue){
        //是否需要根据小地图设置位置，或者是初始化
         this.bigDom.style.webkitTransition = 'none';
        this.bigDom.style.transition = 'none';
        let left = this.smallBigSCaleLeft * this.smallMapLeft
        let top = this.smallBigSCaleTop * this.smallMapTop
        this.bigMapLeft = -left
        this.bigMapTop = -top
      },
      getBounds(data){
       if(data>500){
         return 8/1,5;
       }else if(data>300){
         return 10/1.5;
       }else if(data>200){
         return 12/1.5;
       }else if(data>150){
         return 14/1.5;
       }else if(data>100){
         return 16/1.5;
       }else{
         return 18/1.5;
       }

      },
      touchBig(event){
         event = event || window.event;  
        switch(event.type){  
            case "touchstart": 
             this.bigDom.style.webkitTransition = "all " + 0.3 + "s cubic-bezier(0.3, 0.7, 0.35, 1) 0s"; 
             this.bigDom.style.transition = "all " + 0.3 + "s cubic-bezier(0.3, 0.7, 0.35, 1) 0s"; 
            // this.bigDom.style.webkitTransition = 'none';
             //this.bigDom.style.transition = 'none';
              this.bigTouchData.startPageX = event.targetTouches[0].pageX; 
              this.bigTouchData.startPageY = event.targetTouches[0].pageY;
              document.querySelector('#mask').addEventListener('touchmove',this.touchBig, false);  
              document.querySelector('#mask').addEventListener('touchend',this.touchBig, false);
              this.isStart = false; 
              this.nowTime =new Date();
              //this.setBigBoxSinglePosition(true);
                break;
            case "touchmove":
                 event.preventDefault();  
                if(new Date() - this.nowTime  >50){
                  this.nowTime = new Date();
                  this.isStart = true; 
                  this.bigDom.style.webkitTransition = "all " + 0.5 + "s cubic-bezier(0.3, 0.85, 0.35, 1) 0s"; 
                  this.bigDom.style.transition = "all " + 0.5 + "s cubic-bezier(0.3, 0.85, 0.35, 1) 0s"; 
                 //最小设置6
                   this.bigTouchData.disX = event.targetTouches[0].pageX - this.bigTouchData.startPageX; 
                   this.bigTouchData.disY = event.targetTouches[0].pageY - this.bigTouchData.startPageY;
                   //重置初始化位置，因为有可能移动了，停了下来
                   this.bigTouchData.startPageX = event.targetTouches[0].pageX; 
                   this.bigTouchData.startPageY = event.targetTouches[0].pageY; 
                     //记录最后两点的x值
                  this.lastTwoPointBigX.shift();
                   this.lastTwoPointBigX.push(event.targetTouches[0].pageX);
                   this.lastTwoPointBigY.shift();
                  this.lastTwoPointBigY.push(event.targetTouches[0].pageY);
                   this.setBigBoxSinglePosition(true);
                }
                break;    
            case "touchend":
                if(this.isStart) {
                  let force = new Date() - this.nowTime;
                  let distance = this.getBounds(force);
                  let xdistanc = event.changedTouches[0].pageX - this.bigTouchData.startPageX;
                  let ydistanc = event.changedTouches[0].pageY - this.bigTouchData.startPageY;
                  if(0 < xdistanc && xdistanc<10){
                    xdistanc = 15;
                  }
                  if(0 > xdistanc && xdistanc>-10){
                    xdistanc = -15;
                  }
                  if(0 < ydistanc && ydistanc<10){
                    ydistanc = 15;
                  }
                  if(0 > ydistanc && ydistanc>-10){
                    ydistanc = -15;
                  }
                  //console.log(xdistanc,ydistanc,'end')
                   this.bigTouchData.disX = event.changedTouches[0].pageX - this.bigTouchData.startPageX+ ((event.changedTouches[0].pageX - this.bigTouchData.startPageX) * distance); 
                  this.bigTouchData.disY = event.changedTouches[0].pageY - this.bigTouchData.startPageY+ ((event.changedTouches[0].pageY - this.bigTouchData.startPageY) * distance);  
                  var t = 1.0;
                  this.bigDom.style.webkitTransition = "all " + t + "s cubic-bezier(0.3, 0.7, 0.35, 1) 0s"; 
                  this.bigDom.style.transition = "all " + t + "s cubic-bezier(0.3, 0.7, 0.35, 1) 0s"; 
                }else{
                  this.buildEvent(event.changedTouches[0]);
                  // document.querySelector('#mask').style.display = 'none';
                  // window.setTimeout(()=>{
                  //   document.querySelector('#mask').style.display = 'block';
                  // })
                   this.bigTouchData.disX = event.changedTouches[0].pageX - this.bigTouchData.startPageX; 
                  this.bigTouchData.disY = event.changedTouches[0].pageY - this.bigTouchData.startPageY;  
                }
               
               this.setBigBoxSinglePosition(true);
                document.querySelector('#mask').removeEventListener('touchmove',this.touchBig, false);  
                document.querySelector('#mask').removeEventListener('touchend',this.touchBig, false); 
                break;  
            
        } 
      },
      setBigBoxSinglePosition(isSetBigMap){
        //根据滑动，设置大地图的位置
         //单独设置小窗口位置
        let disX = this.bigTouchData.disX
        let disY = this.bigTouchData.disY
        let mapWidthpx = this.bigMapWidthr;//获取真实大小
        let mapHeightpx = this.bigMapHeightr;
        let viewboxHeight = document.querySelector('#mask').offsetHeight;
        let viewboxWidth = document.querySelector('#mask').offsetWidth;
       if(-(mapWidthpx - viewboxWidth) > disX +  this.bigMapLeft){
          disX = -(mapWidthpx - viewboxWidth)
        }else{
          disX = disX + this.bigMapLeft
        }
        if(-(mapHeightpx - viewboxHeight) >  disY + this.bigMapTop){
          disY = -(mapHeightpx - viewboxHeight)
        }else{
           disY = disY + this.bigMapTop
        }
        if(disX > 0){
          disX = 0;
        }
        if(disY > 0){
          disY = 0;
        }
        this.bigMapLeft = disX
        this.bigMapTop = disY
        //是否更新小地图,默认时时更新
        if(isSetBigMap){
         this.setSmallBoxPosition()
        }
      },
      changeCityData(city){
        let cityName = city.replace(/市$/,'');
        let nameCity = '';
        this.changeCityDataArr.forEach(arr =>{
          arr.forEach(item =>{
            if(item == cityName){
              nameCity =  arr[0];
            }
          })
        })
        return nameCity;
      },
      gotoMapPosition(citydata){
        var cityName = '';
        if(!citydata){
          cityName = '北京';
        }else{
          cityName = this.changeCityData(citydata);
        }
        cityName = cityName || '北京';
        setTimeout(()=>{
          //默认去北京
          // this.screenWidth 
           //this.screenHeight
          let oHtml = document.querySelector("html");
          let fontSize = oHtml.style.fontSize;
          fontSize = parseFloat(fontSize);
          let mapWidthpx = this.bigMapWidthr;//获取真实大小
          let mapHeightpx = this.bigMapHeightr;
          let viewboxHeight = document.querySelector('#mask').offsetHeight;
          let viewboxWidth = document.querySelector('#mask').offsetWidth;
          this.buildImage.forEach((element,index)=>{
                if(element.chName == cityName){
                    let style = element.style;
                    let top = (parseFloat(style.top) || this.bigMapHeight - parseFloat(style.bottom) - parseFloat(style.height))*fontSize;
                    let left = (parseFloat(style.left) || this.bigMapWidth - parseFloat(style.right)- parseFloat(style.width))*fontSize;
                    let width = parseFloat(style.width)*fontSize;
                    let height = parseFloat(style.height)*fontSize;
                    let bigMapTop = top + (height/2) -(this.screenHeight/2);
                    let bigMapLeft = left + (width/2) -(this.screenWidth/2);
                    bigMapTop = -bigMapTop;
                    bigMapLeft = -bigMapLeft;
                    let t = 1.0;
                    this.bigDom.style.webkitTransition = "all " + t + "s cubic-bezier(0.3, 0.7, 0.35, 1) 0s"; 
                    this.bigDom.style.transition = "all " + t + "s cubic-bezier(0.3, 0.7, 0.35, 1) 0s";
                     if(-(mapWidthpx - viewboxWidth) > bigMapLeft){
                          bigMapLeft = -(mapWidthpx - viewboxWidth) +10
                        }
                      if(-(mapHeightpx - viewboxHeight) >  bigMapTop){
                        bigMapTop = -(mapHeightpx - viewboxHeight)+10
                      }
                     if(bigMapLeft > 0){
                      bigMapLeft = 0;
                    }
                    if(bigMapTop > 0){
                      bigMapTop = 0;
                    } 
                    this.bigMapLeft = bigMapLeft
                    this.bigMapTop = bigMapTop
                    this.setSmallBoxPosition()
                }
               
          })
         
        },100)
      },
      openClose(){
        this.$nextTick(()=>{
          this.closeDialogIsShow.isShow = true;
        });
      },
      openGuide(){
        this.$nextTick(()=>{
          this.guideDialogIsShow.isShow = true;
        });
      },
      goToHouse(){
        //只要在这里做埋点
        this.thisShouxin = false;
        window.$post([{id:13,times:1}]);
        this.$router.push({path:'house',query: {page:'house'}});
      },
      goToHouses(){
        let that = this;
        window.$post([{id:10,times:1},{id:22,times:1}]);
        that.$router.push({path:'city',query: {page:'city'}});
      },
      openShare(){
        //去分享
        location.href = window.shareUrl+'?datatime='+(new Date().getTime());
      },
      isInAerea(params){
        if((params.left<=params.x && params.x<=(params.left+params.width)) && (params.top<=params.y && params.y<=(params.top+params.height))){
          return true;
        }else{
          return false;
        }
      },
      buildEvent(touches){
        let oHtml = document.querySelector("html");
        let fontSize = oHtml.style.fontSize;
        fontSize = parseFloat(fontSize);
        let x = touches.pageX - this.bigMapLeft;
        let y = touches.pageY - this.bigMapTop;
        this.buildImage.forEach(element => {
          let style = element.style;
          let top = (parseFloat(style.top) || this.bigMapHeight - parseFloat(style.bottom) - parseFloat(style.height))*fontSize;
          let left = (parseFloat(style.left) || this.bigMapWidth - parseFloat(style.right)- parseFloat(style.width))*fontSize;
          let width = parseFloat(style.width)*fontSize;
          let height = parseFloat(style.height)*fontSize;
          let params = {
            x,y,top,left,width,height
          }
          if(this.isInAerea(params)){
            this.buildPage(element);
             return false;
          }
        });
        return false;
      },
      buildPage(item){
         if(item.type == 1){
            //是城市
            let c = item.isShow?1:0;
           
            if((c==1 && window.cats_p>=3) || (c==0 && window.cats_p>=3)){
              //前往抽奖
               window.$post([{id:8,times:1},{id:21,times:1}]);//埋点
                this.$nextTick(()=>{
                  this.goDrawDialogIsShow.isShow = true;
                  this.goDrawDialogIsShow.t = window.cats_t;
                  this.goDrawDialogIsShow.p = window.cats_p;
                });
                return false;
            }
           //  if((c==1 && window.cats_p<3) || (c==0 && window.cats_p<3 && window.cats_t>0)){
             if(c==1 || (c==0 && window.cats_p<3 && window.cats_t>0)){
              //确认前往
               window.$post([{id:7,times:1},{id:21,times:1}]);//埋点
                this.$nextTick(()=>{
                  this.goCityListDialogIsShow.isShow = true;
                  this.goCityListDialogIsShow.item = item;
                });
                return false;
            }
            if(c==0 && window.cats_p<3 && window.cats_t==0){
              //休息一下
               this.$nextTick(()=>{
                  window.$post([{id:9,times:1},{id:21,times:1}]);//埋点
                  this.goXuxiDialogIsShow.isShow = true;
                });
                return false;
            }
          }else if(item.type == 2){
            //功能页面
            window.$post([{id:3,times:1}]);//按钮埋点
            this.$nextTick(()=>{
              this.gongnengDialogIsShow.isShow = true;
              this.gongnengDialogIsShow.title = item.chName;
              this.gongnengDialogIsShow.content = item.content;
            });
          }
      },
      openCloudAndGoCity(data){
          if(data.type == 1){
            //地图城市
              this.$store.commit('setp',window.cats_p +1);
              this.$store.commit('sett',window.cats_t -1);
              this.setCitySelect(data.code);
              this.clound('page',data);//url
               window.$post([{id:16,times:1}]);//埋点
               var url = window.rootUrl+'?ae=2&ci=5&ui='+window.userId;//设置去过改城市
                loginApi(url,{params:JSON.stringify({cityCode:data.code})},'GET').then((res)=>{
                  if(res.status == 200){
                      if(res.data.rc==1){
                        
                      }
                  }
                })
          }else{
            console.log('type',data.type,data)
          }
          
          //this.$router.push({path:'city',query: {page:'city'}});
      },
      setCitySelect(code){
          //旗子
          this.flageImage.forEach(element => {
              if(element.code == code){
                element.isShow = true;
              }
          });
          //地图城市
          this.buildImage.forEach(element => {
              if(element.code == code){
                element.isShow = true;
              }
          });
          //城市列表
          this.cityListJson.forEach(element => {
              if(element.code == code){
                element.isExe = true;
              }
          });
      },
      clound(page,data){
        this.cloundXuxiDialogIsShow.isShow = true;
        window.setTimeout(()=>{
          this.cloundXuxiDialogIsShow.isShow = false;
          setStore('isGotoZhuanqu',true);
          this.$Indicator.open({
                text: '正在努力加载中...',
                spinnerType: 'triple-bounce'
              });
             // var origin = window.location.origin;
             // var pathname = window.location.pathname;
             // var search = window.location.search;
            history.pushState({ui:window.userId,gotopage:1}, '招商猫', window.location.origin+window.location.pathname+'?ui='+window.userId+'&gotopage=1');
              location.href = data.url+'&datatime='+(new Date().getTime());
        },5000)
      },
      tapMap(){
        //点击map上面时候，判断是否有可点击点
      }
      // jump (){
      //   this.$router.push({path: '/error', query:{}});
      // }
    },
  }
</script>
<style scoped>
.map_bg{
  display: flex;
  flex-direction:column;
}
.map-flex img{
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0,0,0);
}
.map_bg .one,.map_bg .two{
  flex-grow: 0;
  flex-shrink: 0;
  height: 25%;
}
.map_bg .two{
  margin-top:-1px;
}
.map_bg .three{
  flex-grow: 0;
  flex-shrink: 0;
  height: calc(50% + 2px);
  margin-top: -1px;
}
.map_bg img{
  width:50%;padding:0;box-sizing:border-box;
  flex-grow: 0;
  flex-shrink: 0;
  height: auto;
  flex-wrap: wrap;
}
.map_bg img:last-child{
  position: relative;
  margin-left: -1px;
  width: calc(50% + 1px);
}

.map-close{
  height: 1.92rem;
  width: 1.92rem;
  background:url('data:image/png;base64,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');
  background-size: cover;
}
.map-guide{
  height:2.8rem;
  width: 2.56rem;
  background:url('../../assets/img/icon/icon_rule.png');
  background-size: 2.39rem 2.688rem;
  background-position-y: 0rem;
  margin-top: 0.4rem;
}
.map-share{
   height:2.6026rem;
  width: 2.2613rem;
  background:url('../../assets/img/icon/icon_share.png');
  background-size: 100%;
  background-position-y: 0rem;
  margin-top: 0.4rem;
}
 .alert-mash{
      position: absolute;
      background: rgba(0, 0, 0, 0.6);
      height: 100%;
      width: 100%;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1909
  }
.img-div{
  position: absolute;
    bottom: calc(50% - 10rem);
    left: calc(50% - 6.4rem);
    z-index: 2098;
    width: 14.421333rem;
    height: 21.952rem;
}
.img-div img{
      height: 100%;
      width: 100%;
    }
.p-div{
  position: absolute;
  bottom: 3.8rem;
  font-size: 13px;
  letter-spacing: 0px;
  left: 1.066667rem;
  right: 2.346667rem;
  color: rgba(255,255,255,.8);
  line-height: 18px;
}
.p-div p{
  height: 2.4rem;
}
.p-div .p2{
  margin-top: 1.4rem;
}
.map-house{
  height:2.8rem;
  width: 2.56rem;
  background:url('../../assets/img/icon/img.png');
  background-size: 16.62rem 13.78rem;
  background-position-y: -1.98rem;
  background-position-x: -2.62rem;
  margin-top: 0.3rem;
  position: relative;
  left: -0.1rem;
}
 .hand-letter-message{
    position:absolute;
    top: -0.4rem;
    right: -0.6rem;
    height: 1.045333rem;
    width: 1.493333rem;
     background:url('../../assets/img/icon/icon_home_pop.png');
    background-size: cover;
  
  }
.map-go{
  height:3.6rem;
  width: 6.76rem;
  background:url('../../assets/img/icon/img.png');
  background-size: 16.62rem 13.78rem;
  background-position-y: -10.1rem;
  margin-top: 0.3rem;
}
 .map-go:active{
      animation: active .2s linear;
    }
.map-icon{
  background-repeat: no-repeat;
}
.building-box{
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 8;
  top:0;
}
.map-small-box{
  background:url('../../assets/img/icon/map_little.png');
  background-size: cover;
}
 .home-house{
    background: url('../../assets/img/guid/home_bg.png') #999;
  }
  .home-city{
     background: url('../../assets/img/guid/list_bg2.png') #999;
  }
</style>
