<template lang="pug">
div
  gmap-map(@click="test" @tilesloaded="mapLoadHandler"  ref="googleMap"  :center="center" :zoom="zoom" )
  div.search-box
    Input.ml10(type="text" icon="search" v-model="key" style="width:200px;height:0px;left:5px" placeholder="编号" @on-enter="search()" @on-click="search()")
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in ploys" class="google-ployline" :map="map" :key="index" :valueitem="m" :path="m.positions" :strokeColor="m.color"
  :strokeWeight="8" :events="event"  @onclick="addLatLng" :editable="false")
  vue-google-info-window(v-for="(m, key) in marks" :key="key+'info'" :content="m.content" :map="map" :position="m.position"  :opened="true" )
  modelView(ref="model" :modelId="display" @close="closeModel")
</template>
<script>
import vueGooglemapPolyline from "../global/googleMapPolyline";
import vueGoogleInfoWindow from "../global/infoWindow";
import modelView from "../global/model"
import * as VueGoogleMaps from "vue2-google-maps";
import api from "store/search/api/index.js";
import { zoomMapping, colorMapping, findPosition } from "../untils/tool.js";

export default {
  components: { vueGooglemapPolyline, vueGoogleInfoWindow,modelView },

  data() {
    return {
      center: { lat: 31.211245659387767, lng: 121.40444739359441 },
      key: null,
      ploys: [],
      map: null,
      event: { click: "onclick" },
      marks: [],
      zoom: 18,
      color: "#0000FF",
      display: false
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
    test(event) {
      debugger
    },
    async mapLoadHandler() {
      let northeast = this.$refs.googleMap.$mapObject
        .getBounds()
        .getNorthEast();
      let sourthwest = this.$refs.googleMap.$mapObject
        .getBounds()
        .getSouthWest();
      let params = {
        zoom: zoomMapping(this.$refs.googleMap.$mapObject.getZoom()),
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
      };
      let response = await api.search(params);
      if (response.status === 200) {
        _.each(response.data, item => {
          item.color = colorMapping(item.flow);
        });
        this.ploys = response.data;
      }
    },
    async search() {
      let response = await api.loadroute(this.key);
      if (response.status === 200) {
        _.each(response.data, item => {
          item.color = colorMapping(item.flow);
        });
        this.ploys = response.data;
        this.zoom = 18;
        //  item.$refs.googleMap.$mapObject.setCenter(response.data.center);
      }
    },
    closeModel() {
      this.display = false;


    },
    addLatLng(event, value) {
      this.display = true
      // let item = {
      //   position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
      //   positions: value.positions,
      //   content: "这是标记" + event.latLng.lat() + "维度" + event.latLng.lng()
      // };
      // this.marks.push(item);
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

