<template lang="pug">
  gmap-map(ref="googleMapPloylineInfo" @click="addRode($event)" :center="center" :zoom="7" style="width:1500px;height:700px")
    vue-googlemap-polyline( ref="ployline" v-for="(m, index) in ploys" class="google-ployline" :map="map" :key="index" :path="m" :strokeWeight="10" :events="event" @ploylineClick="addLatLng" @onclick="addLatLng" :editable="false")
    vue-google-info-window(v-for="(m, key) in marks" :key="key+'info'" :content="m.content" :map="map" :position="m.position" :positions="m.positions" :options="options" :opened="true" @closeClick="close")
</template>

<script>
import vueGoogleInfoWindow from "../global/infoWindow"
import vueGooglemapPolyline from "../global/googleMapPolyline";
import * as VueGoogleMaps from "vue2-google-maps";
import _ from "lodash";
export default {
  components: { vueGooglemapPolyline,vueGoogleInfoWindow },
  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
      map: null,
      event: { click: "onclick" },
      marks:[],
      options:{},
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
            lat: 10.23,
            lng: 10.19
          },
          {
            lat: 10.78,
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
      ],
      ploylineObject: []
    };
  },
  mounted() {
    const vm = this;
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        vm.map = vm.$refs.googleMapPloylineInfo.$mapObject;
        _.each(this.ploys, item => {
          let flightPath = new google.maps.Polyline({
            path: item,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 10
          });
          //flightPath.setMap(vm.$refs.googleMapPloylineInfo.$mapObject);
          //google.maps.event.addListener(flightPath, "click", vm.addLatLng);
        });
      }, 1000);
    });
  },
  methods: {
    addLatLng(event,rodelatlng) {
      let infoWindowPoly = new google.maps.InfoWindow();
      var contentString = "<b>这是一条路</b><br />";
      contentString +=
        "路段位置: <br />" +
        event.latLng.lat() +
        "," +
        event.latLng.lng() +
        "<br />";
      infoWindowPoly.setContent(contentString);
      infoWindowPoly.setPosition(event.latLng);
      infoWindowPoly.open(this.$refs.googleMapPloylineInfo.$mapObject);
      infoWindowPoly.addListener('click', ev => {
            this.remove(rodelatlng);
          });
    },
  close(rodelatlng) {
    let index = _.findIndex(this.ploys,item=>item === rodelatlng );
    if (index!==-1) {
       this.ploys.splice(index, 1);
    }
  },
  addRode(event) {
    let position = event.latLng;
    let rodelatlng=[];
    rodelatlng.push({lat:position.lat(),lng:position.lng()});
    _.each([1,2,3],item=>{
      rodelatlng.push({lat:position.lat()+item,lng:position.lng()+item});
    });
    this.ploys.push(rodelatlng);
    let item = {
      position:{lat:position.lat(),lng:position.lng()},
      positions:rodelatlng,
      content:'这是标记'+position.lat()+'维度'+position.lng()
    };
    this.marks.push(item);
  }
    },
};
</script>
<style lang="less" scoped>
.google-ployline {
  cursor: pointer;
  &:hover {
    color: primary_color;
    span {
      color: primary_color;
    }
  }
}
</style>


