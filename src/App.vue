<template lang="pug">
  div.vue-map
    search-rode
</template>
<script>
import searchRode from '@/components/rodesearch/search'
export default {
  name: 'app',
  components:{
    searchRode
  }

}
</script>

 <style>
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
 }
 .vue-map{
   height: 700px;
 }
 </style>
