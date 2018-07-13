<template lang="pug">
div
  gmap-map(   ref="googleMap"  :center="center" :zoom="zoom" )
  div.search-box
    Input.ml10(type="text" icon="search" v-model="key" style="width:200px;height:0px;left:5px" placeholder="编号" @on-enter="search()" @on-click="search()")
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in ploys" class="google-ployline" :map="map" :key="index" :path="m" :strokeColor="color"
  :strokeWeight="15" :events="event" @ploylineClick="addLatLng" @onclick="addLatLng" :editable="false")
  vue-google-info-window(v-for="(m, key) in marks" :key="key+'info'" :content="m.content" :map="map" :position="m.position"  :opened="true" )

</template>
<script>
import vueGooglemapPolyline from "../global/googleMapPolyline";
import vueGoogleInfoWindow from "../global/infoWindow";
import * as VueGoogleMaps from "vue2-google-maps";
import api from "@/store/modules/search/api/index.js";
import axios from "axios";

export default {
  components: { vueGooglemapPolyline, vueGoogleInfoWindow },

  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
      key: null,
      ploys: [],
      map: null,
      event: { click: "onclick" },
      marks: [],
      zoom: 5,
      color: "#0000FF"
    };
  },
  mounted() {
    const vm = this;
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        if (vm.$refs.googleMap.$mapObject) {
          vm.map = vm.$refs.googleMap.$mapObject;
        }
      }, 1000);
    });
  },
  methods: {
    async search() {
      let item = this;
      let re = await axios
        .get("http://localhost:8080/findRoade", {
          params: {
            tile: this.key
          },
          headers: {
            "Access-Control-Allow-Origin":
              "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie "
          },
          crossdomain: true
        })
        .then(function(response) {
          if (response.status === 200) {
            item.ploys = response.data.positions;
            item.zoom = 20;
            item.$refs.googleMap.$mapObject.setCenter(response.data.center);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    addLatLng(event, path) {
      let item = {
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        positions: path,
        content: "这是标记" + event.latLng.lat() + "维度" + event.latLng.lng()
      };
      this.marks.push(item);
    }
  }
};
</script>
<style lang="less" scoped>
.search-box {
  display: block;
}
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

