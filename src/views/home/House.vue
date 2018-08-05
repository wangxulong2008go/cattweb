<template>
  <div class="contain-box">
    我的小窝
  </div>
</template>
<script>
  export default {
    data(){
      return {
         
      }
    },
    created() {
   
    },
    destroyed(){
         document.querySelector('#app').removeEventListener('touchmove', this.scrollTouch,false);
    },
    mounted(){
      document.querySelector('#app').addEventListener('touchmove', this.scrollTouch,false);
    },
    methods:{
        scrollTouch(evt){
            if(!evt._isScroller) {
                evt.preventDefault();
                 evt.stopPropagation();
            }
        }
    }
  }
</script>
<style scoped lang="scss">
    .contain-box{
        background-image: url('../../assets/img/guid/guid_BG.png');
        background-repeat: no-repeat;
        background-size: cover;
        .progress-box{
            position:absolute;
            left: 2.2rem;
            right: 2.2rem;
            bottom: 2.2rem;
        }
    }
</style>
<style lang="scss">
   
   
</style>

