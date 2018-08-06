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
       <div>
         <input type="range" class="range">
       </div>
    </div>
    <div class="body-footer">
      <span v-tap="gototavel" class="btn-one-go">
      </span>
    </div>
    <div v-tap="goBack" class="goback">

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
         cityList:[
            {
                isShow: true, //是否选中
                isExe:false,//是否去过
                src: 'static/list/image_bj_2.png',
                enName:'bj',
                chName:'北京',
                type:1,
                code:13
            },
            {
                isShow: false,isExe:true,
                src: 'static/list/image_sh_2.png',
                enName:'sh',
                chName:'上海',
                type:1,
                code:14
            },
             {
                isShow: false,isExe:true,
                src: 'static/list/image_shenzhen_2.png',
                enName:'shenzhen',
                chName:'深圳',
                type:1,
                code:15
            },
             {
                isShow: false,isExe:true,
                src: 'static/list/image_gz_2.png',
                enName:'gz',
                chName:'广州',
                type:1,
                code:16
            },
             {
                isShow: false,isExe:true,
                src: 'static/list/image_jn_2.png',
                enName:'jn',
                chName:'济南',
                type:1,
                code:17
            },
             {
                isShow: false,isExe:true,
                src: 'static/list/image_wh_2.png',
                enName:'wh',
                chName:'武汉',
                type:1,
                code:18
            },
             {
                isShow: false,isExe:true,
                src: 'static/list/image_cs_2.png',
                enName:'cs',
                chName:'长沙',
                type:1,
                code:19
            },
            {
                isShow: false,isExe:true,
                src: 'static/list/image_hhht_2.png',
                enName:'hhht',
                chName:'呼和浩特',
                type:1,
                code:20
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_cd_2.png',
                enName:'cd',
                chName:'成都',
                type:1,
                code:12
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_zz_2.png',
                enName:'zz',
                chName:'郑州',
                type:1,
                code:4
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_sy_2.png',
                enName:'sy',
                chName:'沈阳',
                type:1,
                code:9
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_yt_2.png',
                enName:'yt',
                chName:'烟台',
                type:1,
                code:6
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_nt_2.png',
                enName:'nt',
                chName:'南通',
                type:1,
                code:1
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_nj_2.png',
                enName:'nj',
                chName:'南京',
                type:1,
                code:7
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_sz_2.png',
                enName:'sz',
                chName:'苏州',
                type:1,
                code:23
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_dg_2.png',
                enName:'dg',
                chName:'东莞',
                type:1,
                code:22
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_wx_2.png',
                enName:'wx',
                chName:'无锡',
                type:1,
                code:24
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_hz_2.png',
                enName:'hz',
                chName:'杭州',
                type:1,
                code:21
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_hf_2.png',
                enName:'hf',
                chName:'合肥',
                type:1,
                code:11
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_tj_2.png',
                enName:'tj',
                chName:'天津',
                type:1,
                code:5
            },  {
                isShow: false,isExe:true,
                src: 'static/list/image_cq_2.png',
                enName:'cq',
                chName:'重庆',
                type:1,
                code:8
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_km_2.png',
                enName:'km',
                chName:'昆明',
                type:1,
                code:10
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_nc_2.png',
                enName:'nc',
                chName:'南昌',
                type:1,
                code:3
            }, {
                isShow: false,isExe:true,
                src: 'static/list/image_fs_2.png',
                enName:'fs',
                chName:'佛山',
                type:1,
                code:2
            }
        ]
      }
    },
    created() {
   
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
          this.cityList.forEach(element => {
            element.isShow = false;
            if(element.code == item.code){
              this.$nextTick(()=>{
                element.isShow = true;
              })
            }
          });
        },
        gototavel(){

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
          z-index: 2001;
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
          z-index: 2001;
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
    }
    .body-scorll::-webkit-scrollbar {
        display: none;
    }
  
</style>
<style lang="scss">
   
   
</style>

