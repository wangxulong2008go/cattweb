<template>
  <div class="contain-box relative">
    <div class="map-box absolute">
    <!--  地图原始大小比例设置3:4，具体的根据原型来，不过需要修改对应比例，与smallmap相对应 -->
        <div style="background:#999" v-bind:style="{'top':bigMapTop+'px',left: bigMapLeft + 'px','width':bigMapWidth+'rem','height':bigMapHeight+'rem'}" class="map-flex absolute">
            neirong<div>fsdfdf</div>
            neirong<div>fsdfdf</div>
            neirong<div>fsdfdf</div>
            neirong<div>fsdfdf</div>
            neirong<div>fsdfdf</div>
            neirong<div>fsdfdf</div>
            neirong<div>fsdfdf</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
            neirong<div>fdf99999</div>
        </div>
        <!-- 也可以用canvas自动画出可是区域地图 -->
        <!-- <canvas></canvas> -->
        <!-- 用于实际拖动事件目标 -->
        <div v-tap="tapMap" id="mask" class="BMap_mask" style="position: absolute; left: 0px; top: 0px; z-index: 9; overflow: hidden; -webkit-user-select: none; width:100%; height: 100%; opacity: 0; background: rgb(0, 0, 0); transition: opacity 0.6s;"></div>
    </div>
    <div v-bind:style="{'width':smallWidth+'px',height: smallHeight + 'px'}" class="map-small-box absolute">
      <div class="small-box-bg absolute event-none" v-bind:style="{'top':smallMapTop+'px',left: smallMapLeft + 'px'}">
        <div class="small-viewport absolute"></div>
      </div>
    </div>
    <div class="absolute contorl-left-top">左上角控制器</div>
    <div class="absolute contorl-bottom-center">中心下</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
          screenWidth:document.body.clientWidth,
          screenHeight:document.body.clientHeight,
          smallWidth:0,//按屏幕比例，现在是屏幕的三分之一
          smallHeight:0,//4:3
          bigMapTop:0,
          bigMapLeft:0,
          bigMapWidth:80,//单位是rem
          bigMapHeight:80,
          bigMapWidthr:0,
          bigMapHeightr:0,
          smallMapTop:0,
          smallMapLeft:0,
          smallBigSCaleLeft:1,
          smallBigSCaleTop:1,
          viewPortWidth:1,
          viewPortHeight:1,
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
    computer:{

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
        let dom = document.querySelector('.small-viewport')
       // dom.style.width = dom.offsetWidth + 'px'
       // dom.style.height = (this.screenHeight/this.screenWidth) * dom.offsetWidth + 'px';
        //关联大小地图比例
        this.smallBigSCaleLeft = this.bigMapWidthr/this.smallWidth
        this.smallBigSCaleTop = this.bigMapHeightr/this.smallHeight
        //小视口与大视口比例
        this.viewPortWidth = this.screenWidth/dom.offsetWidth;
        this.viewPortHeight = this.screenHeight/dom.offsetHeight;
      },
      setSmallBoxSize(){
        this.smallWidth = this.screenWidth*0.3
        this.smallHeight = (this.screenWidth*0.3*4/3)//小map不根据屏幕比例iPhoneX的太长，导致太难看，固定3:4的比例
        let oHtml = document.querySelector("html")
        let fontSize = oHtml.style.fontSize
        fontSize = parseFloat(fontSize.replace(/px/,''));
        this.bigMapWidthr = fontSize * this.bigMapWidth;//获取真实大小
        this.bigMapHeightr = fontSize * this.bigMapHeight;//获取真实大小
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
          this.smallMapTop = smallTop
          this.smallMapLeft = smallLeft
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
       if(this.smallWidth < smallboxSizew + disX){
          disX = this.smallWidth - smallboxSizew
        }
        if(this.smallHeight < smallboxSizeh + disY){
          disY = this.smallHeight - smallboxSizeh
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
        console.log(disX)
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
         
        }
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
