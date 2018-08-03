<template>
  <div class="contain-box relative">
    <div class="map-box absolute">
        <div style="background:#999" v-bind:style="{'top':bigMapTop+'px',left: bigMapLeft + 'px','width':bigMapWidth+'rem','height':bigMapHeight+'rem'}" class="map-flex absolute">
            <div class="map_bg" style="height:100%;width:100%;line-height:0;">
                <div class="one" style="display:flex">
                    <img width="100px" v-lazy ="bgImage[0]" alt="bg">
                    <img width="100px" v-lazy ="bgImage[1]" alt="bg">
                </div>
                 <div class="two" style="display:flex">
                    <img width="50%" v-lazy ="bgImage[2]" alt="bg">
                    <img width="50%" v-lazy ="bgImage[3]" alt="bg">
                </div> 
                <div class="three" style="display:flex">
                    <img width="50%" v-lazy ="bgImage[4]" alt="bg">
                    <img width="50%" v-lazy ="bgImage[5]" alt="bg">
                </div>
            </div>
            <div class="building-box">
                <div v-for="(item,index) in buildImage" :key="index" :style="item.style">
                    <img v-lazy="item.src" alt="1" style="height:100%;width:100%" />
                </div>
            </div>
            <div class="building-box">
              <div v-for="(item,index) in flageImage" v-if="item.isShow" class="flage-image" :key="index" :style="item.style">
                    <img v-lazy="flageImageSrc" alt="1" style="height:100%;width:100%" />
                </div>
            </div>
        </div>
        
        <!-- 用于实际拖动事件目标 -->
        <div id="mask" class="BMap_mask" style="position: absolute; left: 0px; top: 0px; z-index: 9; overflow: hidden; -webkit-user-select: none; width:100%; height: 100%; opacity: 0; background: rgb(0, 0, 0); transition: opacity 0.6s;"></div>
    </div>
    <div v-bind:style="{'width':smallWidth+'rem',height: smallHeight + 'rem'}" class="map-small-box absolute">
      <div class="small-box-bg absolute event-none" v-bind:style="{'top':smallMapTop+'px',left: smallMapLeft + 'px'}">
        <div class="small-viewport absolute" v-bind:style="{width:viewportWhidth+'rem','height': viewportHeight + 'rem'}"></div>
      </div>
    </div>
    <div class="absolute contorl-left-top">
      <div v-tap="openClose" class="map-close map-icon"></div>
      <div v-tap="openGuide" class="map-guide map-icon"></div>
      <div class="map-house map-icon"></div>
    </div>
    <div class="absolute contorl-bottom-center">
      <div class="map-go map-icon"></div>
    </div>
    <!-- <vue-lazy-component :timeout="1000">
        
    </vue-lazy-component> -->
    <one-alert :dataOjb="closeDialogIsShow"> </one-alert>
    <guide-alert :dataOjb="guideDialogIsShow"> </guide-alert>
  </div>
</template>
<script>
  import {setStore,getStore} from '@/utils/utils.js'
  import {buildJson,flageJson} from '@/utils/build.js'
  import oneAlert from '@/views/home/oneAlert.vue'
  import guideAlert from '@/views/home/guideAlert.vue'
  export default {
    data(){
      return {
          bgImage:['static/map_bg_01.png','static/map_bg_02.png','static/map_bg_03.png','static/map_bg_04.png','static/map_bg_05.png','static/map_bg_06.png'],
          buildImage:[],
          flageImage:[],
          closeDialogIsShow:{
            isShow : false,
            isMash:true
          },
          guideDialogIsShow:{
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
          }
      }
    },
   components:{
     oneAlert:oneAlert,
     guideAlert
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
          }
      },
  created() {
    // this.$Indicator.open({
    //         text: '正在努力加载中...',
    //         spinnerType: 'triple-bounce'
    //       });
    let needGuid = getStore('needGuid');
    if(!needGuid){
      setStore('needGuid',true);
      this.$router.push({path:'guid',query: {page:'guid'}});
    }
    this.$nextTick(()=>{
      this.buildImage = buildJson();
      this.flageImage = flageJson();
    });
    
  },
    computed:{

    },
    mounted(){
      document.querySelector('.map-small-box').addEventListener('touchstart',this.touchSmall, false);  
      document.querySelector('.map-small-box').addEventListener('touchmove',this.touchSmall, false);  
      document.querySelector('.map-small-box').addEventListener('touchend',this.touchSmall, false); 
      document.querySelector('#mask').addEventListener('touchstart',this.touchBig, false);  
      document.querySelector('#mask').addEventListener('touchmove',this.touchBig, false);  
      document.querySelector('#mask').addEventListener('touchend',this.touchBig, false);  
      window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                window.screenHeight = document.body.screenHeight
                this.screenWidth = window.screenWidth
                this.screenHeight = window.screenHeight
            })()
        }
        this.init();
        
    },
    methods:{
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
              this.smallTouchData.startPageX = event.targetTouches[0].pageX; 
              this.smallTouchData.startPageY = event.targetTouches[0].pageY;
              this.smallTouchData.offsetTop =  event.targetTouches[0].target.offsetTop;//元素本身的位置
              this.smallTouchData.offsetLeft =  event.targetTouches[0].target.offsetLeft;
              this.setSmallBoxSinglePosition(true);
                break;
            case "touchmove":  
                 event.preventDefault();  
                // console.log(event.targetTouches[0],'move') 
                if((Math.abs(event.targetTouches[0].pageX - this.smallTouchData.startPageX) >  6) || (Math.abs(event.targetTouches[0].pageY -  this.smallTouchData.startPageY) > 6)){
                  //最小设置6
                   this.smallTouchData.startPageX = event.targetTouches[0].pageX; 
                   this.smallTouchData.startPageY = event.targetTouches[0].pageY;
                   this.setSmallBoxSinglePosition(true);
                }
                break;    
            case "touchend":  
            //console.log(event.changedTouches[0],'end')
                this.smallTouchData.startPageX = event.changedTouches[0].pageX; 
                this.smallTouchData.startPageY = event.changedTouches[0].pageY; 
                this.setSmallBoxSinglePosition(true);
                break;  
            
        }  
      },
      setMapBoxPosition(isTrue){
        //是否需要根据小地图设置位置，或者是初始化
        let left = this.smallBigSCaleLeft * this.smallMapLeft
        let top = this.smallBigSCaleTop * this.smallMapTop
        this.bigMapLeft = -left
        this.bigMapTop = -top
      },
      touchBig(event){
         event = event || window.event;  
        switch(event.type){  
            case "touchstart": 
              this.bigTouchData.startPageX = event.targetTouches[0].pageX; 
              this.bigTouchData.startPageY = event.targetTouches[0].pageY;
              //this.setBigBoxSinglePosition(true);
                break;
            case "touchmove":  
                 event.preventDefault();  
                if((Math.abs(event.targetTouches[0].pageX - this.bigTouchData.startPageX) >  6) || (Math.abs(event.targetTouches[0].pageY -  this.bigTouchData.startPageY) > 6)){
                  //最小设置6
                   this.bigTouchData.disX = event.targetTouches[0].pageX - this.bigTouchData.startPageX; 
                   this.bigTouchData.disY = event.targetTouches[0].pageY - this.bigTouchData.startPageY;
                   //重置初始化位置，因为有可能移动了，停了下来
                   this.bigTouchData.startPageX = event.targetTouches[0].pageX; 
                   this.bigTouchData.startPageY = event.targetTouches[0].pageY; 
                   this.setBigBoxSinglePosition(true);
                }
                break;    
            case "touchend":
                this.bigTouchData.disX = event.changedTouches[0].pageX - this.bigTouchData.startPageX; 
                this.bigTouchData.disY = event.changedTouches[0].pageY - this.bigTouchData.startPageY;  
                this.setBigBoxSinglePosition(true);
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
.map-house{
  height:2.8rem;
  width: 2.56rem;
  background:url('../../assets/img/icon/img.png');
  background-size: 16.62rem 13.78rem;
  background-position-y: -1.98rem;
  background-position-x: -2.62rem;
  margin-top: 0.3rem;
}
.map-go{
  height:3.6rem;
  width: 6.76rem;
  background:url('../../assets/img/icon/img.png');
  background-size: 16.62rem 13.78rem;
  background-position-y: -10.1rem;
  margin-top: 0.3rem;
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
</style>
