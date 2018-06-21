<template>
  <div>
    <div @click="goback()">错误页面fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>
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
      goback(){
        this.$router.goBack();
      }
    }
  }
</script>