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
  methods: {
    mapClick(event) {
      let marker = new google.maps.Marker({
        position: event.latLang,
      });
      marker.setMap(this.$refs.googleMapPolyline.$mapObject);
      // let infowindow = new google.maps.InfoWindow({
      //   content: "Hello World!"
      // });

      // infowindow.open(this.$refs.googleMapPolyline.$mapObject, marker);
    }
  }

}
</script>
<style lang="less">

</style>

