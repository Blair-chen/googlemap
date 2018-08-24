<template lang="pug">
  gmap-map(ref="googleMap" @click="addInfowindow($event)" :center="center" :zoom="7" style="width:1500px;height:700px")
    vue-google-info-window( v-for="(m, key) in positions" :key="key" :content="content" :map="map" :position="m" :options="options" :opened="true" @closeClick="close")
</template>
<script>
import vueGoogleInfoWindow from '../global/infoWindow'
import * as VueGoogleMaps from "vue2-google-maps";
export default {
  components: {
    vueGoogleInfoWindow
  },
  data(){
    return {
      center:{lat:10.0,lng:10.0},
      content:"这就是标记，咬我呀",
      options:{},
      positions:[{lat:10.0,lng:10.0}],
      map:null
    }
  },
  mounted() {
    let vm= this;
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        this.map = this.$refs.googleMap.$mapObject
      }, 1000);
    });
  },
  methods: {
    addInfowindow(event) {
     let position = event.latLng;
     this.positions.push(position);
    },
    close(positions) {

    }
  }

}
</script>
