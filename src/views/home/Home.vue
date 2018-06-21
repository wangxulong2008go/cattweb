<template>
  <div>
    <div class="s" @click="jump()">tiaozfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        console.log('完成');
      },
      jump (){
        this.$router.push({path: '/error', query:{}});
      }
    },
  }
</script>