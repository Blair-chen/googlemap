<template lang="pug">
  gmap-map(ref="googleMap" @click="mapClick($event)" :id="mapName" :center="center" :zoom="zoom" style="width: 1500px; height: 700px")

</template>
<script>
import * as VueGoogleMaps from "vue2-google-maps";
export default {
  data() {
    return {
      Flag: false,
      name: 'shing chen',
      mapName: this.name + '-map',
      center: { lat: 25.034962, lng: 121.564422 },
      ploys: [],
      zoom:5,
      map:null
    }
  },
  mounted() {
     VueGoogleMaps.loaded.then(() => {
      const vm = this;
      setTimeout(() => {
        if (vm.$refs.googleMap.$mapObject) {
          this.map =vm.$refs.googleMap.$mapObject;
          this.loadRectangle();
        }
      }, 1000);
    });


  },
  methods: {
    loadRectangle() {

      // let amsterdam = new google.maps.LatLng(52.395715, 4.888916);
      // let london = new google.maps.LatLng(51.508742, -0.120850);
      // let myTrip = [ amsterdam, london];
      let flightPath = new google.maps.Rectangle({
    bounds: {
      north: 25.034962,
      south: 25.033115,
      east: 121.565422,
      west: 121.563523
    },
    strokeOpacity: 0,
    fillColor: '#00f',
    fillOpacity: 0.35,
    editable: true,
    map: this.map
  });
      this.zoom = 17

      flightPath.setMap(this.map);
    }


  }

}
</script>
<style lang="less">
.full() {
  width: 100%;
  height: 100%;
}

.vue-map-container {
  .full();
  .vue-map {
    .full();
  }
}
</style>

