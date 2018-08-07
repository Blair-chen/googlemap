<template lang="pug">
div
  gmap-map(ref="googleMap"  :center="center" :zoom="zoom" )
  div.menu
    nav-menu(ref="menu")
  report-view(ref="report")
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in lines" class="google-ployline" :map="map" :key="index"
  :valueitem="m" :path="m.positions" :strokeColor="m.color"
  :strokeWeight="5" :events="event"  @onclick="onlickHandler" :editable="false")
  vue-google-info-window(v-for="(m, key) in marks" :key="key+'info'" :content="m.content" :map="map" :position="m.position"  :opened="true" )
</template>
<script>
import reportView from "./report";
import navMenu from "../menu/main";
import vueGooglemapPolyline from "../googlemap/googleMapPolyline";
import vueGoogleInfoWindow from "../googlemap/infoWindow";
import * as VueGoogleMaps from "vue2-google-maps";
import api from "store/search/api/index.js";
import { zoomMapping,  findPosition } from "../untils/tool.js";

export default {
  components: {
    vueGooglemapPolyline,
    vueGoogleInfoWindow,
    navMenu,
    reportView
  },

  data() {
    return {
      center: { lat: 39.9042, lng: 116.4074 },
      lines: [],
      map: null,
      event: { click: "onclick" },
      marks: [],
      zoom: 16,
      item: null
    };
  },
  mounted() {
    VueGoogleMaps.loaded.then(() => {
      const vm = this;
      setTimeout(() => {
        if (vm.$refs.googleMap.$mapObject) {
          this.map =vm.$refs.googleMap.$mapObject;
          this.cycleHandler();
        }

      }, 1000);
    });

  },
  methods: {
    cycleHandler() {
      this.mapLoadHandler();
      setInterval(() => {
        this.mapLoadHandler();
      }, 60000);
    },
    async mapLoadHandler() {
      this.lines = [];
      let mapObject = this.map;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      let params = {
        zoom: zoomMapping(mapObject.getZoom()),
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
      };
      let response = await api.searchCompare(params);
      this.lines = response;
      // if (response.status === 200 && this.isCurrentBound(response.data.bound)) {
      //   _.each(response.data.listWay, item => {
      //     item.color = colorMapping(item.flow);
      //   });
      //   this.lines = response.data.listWay;
      // }
    },

    onlickHandler(event, value) {
      let str="<table  border='1' cellspacing='0' > <tr><th width='70px'>type</th><th width='70px'>speed</th><th width='70px'>level</th><th width='70px'>reportTime</th></tr>"
      if (value.listSource) {
         _.each(value.listSource,item=>{
           str+="<tr><td align='center'>"+ item.type+"</td><td align='center'>"+ item.speed+"</td><td align='center'>"+ item.level+"</td><td align='center'>"+ item.reportTime+"</td></tr>"
         })
      }
      str+="</table>"
      let item = {
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        content: str
      };
      this.marks.push(item);
    },
    isCurrentBound(bound) {
      let mapObject = this.$refs.googleMap.$mapObject;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      if (
        this.isCatains(northeast.lat(), bound.northeast.lat) &&
        this.isCatains(northeast.lng(), bound.northeast.lng) &&
        this.isCatains(sourthwest.lat(), bound.sourthwest.lat) &&
        this.isCatains(sourthwest.lng(), bound.sourthwest.lng)
      ) {
        return true;
      }
      return false;
    },
    isCatains(source, target) {
      let sourceright = source + 1;
      let sourceleft = source - 1;
      if (target > sourceleft && target < sourceright) {
        return true;
      }
      return false;
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

