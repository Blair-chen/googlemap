<template lang="pug">
  gmap-map(ref="googleMapPolyline" @click="mapClick($event)" :id="mapName" :center="center" :zoom="zoom" style="width: 1500px; height: 700px")

</template>
<script>
export default {
  data() {
    return {
      Flag: false,
      name: 'shing chen',
      mapName: this.name + '-map',
      center: { lat: 10.0, lng: 10.0 },
      ploys: [],
      zoom:5
    }
  },
  mounted() {

  },
  methods: {
    mapClick(event) {

      // let amsterdam = new google.maps.LatLng(52.395715, 4.888916);
      // let london = new google.maps.LatLng(51.508742, -0.120850);
      // let myTrip = [ amsterdam, london];
      let flightPath = new google.maps.Circle({
        center: event.latLng,
        radius: 200000,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4
      });
      this.zoom = 7

      flightPath.setMap(this.$refs.googleMapPolyline.$mapObject);
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

