<template lang="pug">
  div.vue-map
    search-rode
</template>


       <!-- <div class="nav-list">
      <router-link class="nav-item" to="/helloworld">hello页</router-link>
      <router-link class="nav-item" to="/googleMapTest">地图</router-link>
      <router-link class="nav-item" to="/polyline">折线</router-link>
      <router-link class="nav-item" to="/ploygon"> 多边形</router-link>
      <router-link class="nav-item" to="/circle"> 圆形</router-link>
      <router-link class="nav-item" to="/infoWindow"> 信息</router-link>
      <router-link class="nav-item" to="/maptest">marker集群</router-link>
      <router-link class="nav-item" to="/search">搜索</router-link>
      <router-link class="nav-item" to="/geolocation">定位</router-link>
      <router-link class="nav-item" to="/ploylineInfoWindow">路段infoWindow </router-link>
      <router-link class="nav-item" to="/infoWindowTest">infoWindowde另一种实现方法</router-link>
    </div>
    <router-view></router-view> -->




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
