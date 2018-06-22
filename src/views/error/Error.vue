<template>
  <div>
    <div v-tap="goback">错误页面fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    mounted(){
      console.log('error');
    },
    methods:{
      goback(e,s){
        console.log(e,s);
        this.$router.goBack();
      }
    }
  }
</script>