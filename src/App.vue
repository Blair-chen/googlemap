<template lang="pug">
  div.vue-map
    search
</template>
<script>
import search from '@/components/search/search'
export default {
  name: 'app',
  components:{
    search
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
