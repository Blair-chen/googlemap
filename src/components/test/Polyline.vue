<template lang="pug">
  gmap-map(ref="googleMapPolyline" @click="mapClick($event)" :id="mapName" :center="center" :zoom="5" style="width: 1500px; height: 700px")
</template>
<script>
export default {
  data() {
    return {
      Flag: false,
      name: 'shing chen',
      mapName: this.name + '-map',
      center: { lat: 10.0, lng: 10.0 },
      ploys: []
    }
  },
  created() {
    //this.mapClick();
  },
  methods: {
    mapClick(event) {
     let position = event.latLng;
      const index = _.findIndex(this.ploys, item => { return (position.lat === item.lat && position.lng === item.lng) });

        this.ploys.push(event.latLng);
        // let amsterdam = new google.maps.LatLng(52.395715, 4.888916);
        // let london = new google.maps.LatLng(51.508742, -0.120850);
        // let myTrip = [ amsterdam, london];
        let flightPath = new google.maps.Polyline({
          path: this.ploys,
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 2
        });

        let a = this.$refs.googleMapPolyline;

        flightPath.setMap(this.$refs.googleMapPolyline.$mapObject);
      }


  }
}
</script>


