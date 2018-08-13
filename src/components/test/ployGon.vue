
<template lang="pug">
  gmap-map(ref="googleMapPolygon" @click="mapClick($event)" :id="mapName" :center="center" :zoom="5" style="width: 1500px; height: 700px")
    google-play-gon(v-for="(m, index) in ploys" class="google-ployline" :map="map" :key="index" :path="m" :strokeWeight="5" :events="event" @ploylineClick="addLatLng" @onclick="addLatLng" :editable="false")
</template>
<script>
import googlePlayGon from "../global/vuePlayGon";
import * as VueGoogleMaps from "vue2-google-maps";
export default {
  components: {
    googlePlayGon
  },
  data() {
    return {
      Flag: false,
      name: "shing chen",
      mapName: this.name + "-map",
      center: { lat: 10.0, lng: 10.0 },
      event: { click: "onclick" },
      map: null,
      ploy:[],
      ploys: [
        [
          {
            lat: 10.0,
            lng: 10.0
          },
          {
            lat: 10.15,
            lng: 10.15
          },
          {
            lat: 13.23,
            lng: 10.19
          },
          {
            lat: 17.78,
            lng: 10.9
          }
        ],
        [
          {
            lat: 11.0,
            lng: 10.0
          },
          {
            lat: 12.15,
            lng: 13.15
          },
          {
            lat: 12.23,
            lng: 12.19
          },
          {
            lat: 11.78,
            lng: 10.9
          }
        ]
      ]
    };
  },
  mounted() {
    const vm = this;
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        vm.map = vm.$refs.googleMapPolygon.$mapObject;
      }, 1000);
    });
  },
  methods: {
    addLatLng(event) {
      let infoWindowPoly = new google.maps.InfoWindow();
      var contentString = "<b>这是一个多边形</b><br />";
      contentString +=
        "路段位置: <br />" +
        event.latLng.lat() +
        "," +
        event.latLng.lng() +
        "<br />";
      infoWindowPoly.setContent(contentString);
      infoWindowPoly.setPosition(event.latLng);
      infoWindowPoly.open(this.$refs.googleMapPolygon.$mapObject);
    },
    mapClick(event) {
      let position = event.latLng;
      const index = _.findIndex(this.ploys, item => {
        return position.lat === item.lat && position.lng === item.lng;
      });
      this.ploy.push(event.latLng);
      let flightPath = new google.maps.Polygon({
        path: this.ploy,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4
      });

      flightPath.setMap(this.$refs.googleMapPolygon.$mapObject);
    }
  },


};
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



