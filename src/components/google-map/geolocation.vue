
<template lang="pug">
  gmap-map(ref="googlemap" :center="center" :zoom="3" style="width:1500px;height:700px")
</template>
<script>
import * as VueGoogleMaps from 'vue2-google-maps';
export default {
  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
    }
  },
  mounted() {
    const vm = this
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        let infoWindow = new google.maps.InfoWindow({ map: vm.$refs.googlemap.$mapObject });
       // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            vm.$refs.googlemap.$mapObject.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }, 1000)
    })
  }
}
</script>
<style>

</style>

