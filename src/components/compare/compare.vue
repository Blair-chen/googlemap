<template lang="pug">
div
  gmap-map(ref="googleMap" @tilesloaded="mapLoadHandler"  :center="center" :zoom="zoom" )
  div.top-menu
    nav-menu.z1002(ref="topMenu" :buttonFlag="true"  @reginHandler="regionHandler" @featuresHandler="featuresHandler")
  report-view(ref="report" :data="data")
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in lines" class="google-ployline" :map="map" :key="index"
  :valueitem="m" :path="m.positions" :strokeColor="m.color"
  :strokeWeight="3" :events="event"  @onclick="onlickHandler" :editable="false")
  vue-google-info-window(v-for="(m, key) in marks" :key="key+'info'" :content="m.content" :map="map" :position="m.position"  :opened="true" )
</template>
<script>

import reportView from "./report";
import navMenu from "../menu/regin";
import vueGooglemapPolyline from "../googlemap/googleMapPolyline";
import vueGoogleInfoWindow from "../googlemap/infoWindow";
import * as VueGoogleMaps from "vue2-google-maps";
import api from "store/search/api/index.js";
import { getCenter,zoomMapping, isCatains } from "../untils/tool.js";

export default {
  components: {
    vueGooglemapPolyline,
    vueGoogleInfoWindow,
    navMenu,
    reportView,
  },

  data() {
    return {
      featuresData: "differentLevel",
      center:  { lat: 39.9042, lng: 116.4074 },
      lines: [],
      map: null,
      event: { click: "onclick" },
      marks: [],
      zoom: 13,
      item: null,
      data: null,
      interval: null
    };
  },

  mounted() {
    VueGoogleMaps.loaded.then(() => {
      const vm = this.$refs.googleMap;
      setTimeout(() => {
        if (vm && vm.$mapObject) {
          this.map = vm.$mapObject;
          this.cycleHandler();
        }
      }, 1000);
    });
  },
  beforeDestroy() {
    clearTimeout(this.interval);
  },
  methods: {
    cycleHandler() {
      this.mapLoadHandler();
      this.ComapreReport();
      this.interval = setInterval(() => {
        this.mapLoadHandler();
        this.ComapreReport();
      }, 180000);
    },
    async ComapreReport() {
      let response = await api.getCompareReport();
      if (
        response.status === 200 &&  response.data != "" &&  !_.isEmpty(response.data)  ) {
        this.data = response.data;
      }
    },
    async mapLoadHandler() {
      if (this.map === null) {
        return null;
      }
      this.lines = [];
      let mapObject = this.map;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      let params = {
        zoom: zoomMapping(mapObject.getZoom()),
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
      };

      let response = await api[this.featuresData](params);
       this.lines = response;
      // if (response.status === 200) {
      //   if (response.data) {
      //     if (this.isCurrentBound(response.data.bound)) {
      //       this.lines = response.data.roadeslist;
      //     }
      //   } else {
      //     this.$Message.error("Server failed to read file");
      //   }
      // }
    },
    onlickHandler(event, value) {
      let str =
        "<table  border='1' cellspacing='0' > <tr><th width='70px'>type</th><th width='70px'>speed</th><th width='70px'>level</th><th width='70px'>reportTime</th></tr>";
      if (value.listSource) {
        _.each(value.listSource, item => {
          str += "<tr><td align='center'>" +item.type +"</td><td align='center'>" + item.speed +
            "</td><td align='center'>" +  item.level +  "</td><td align='center'>" +   item.reportTime +  "</td></tr>"; });
      } else {
        str += "<tr><td colspan='4' align='center'>No data</td></tr>";
      }
      str += "</table>";
      let item = {
        position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        content: str
      };
      this.marks.push(item);
    },
    isCurrentBound(bound) {
      let mapObject = this.map;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      if (
        isCatains(northeast.lat(), bound.northeast.lat) &&
        isCatains(northeast.lng(), bound.northeast.lng) &&
        isCatains(sourthwest.lat(), bound.sourthwest.lat) &&
        isCatains(sourthwest.lng(), bound.sourthwest.lng)
      ) {
        return true;
      }
      return false;
    },

    async loadData(params) {
      return await api[this.featuresData](params);
    },
    featuresHandler(value) {
      this.featuresData = value;
      this.mapLoadHandler();
    },
    regionHandler(value){

      let map= this.map;
      if(map) {
       map.setCenter(getCenter(value));
       map.setZoom(15);
      }else{
        this.center = getCenter(value);
        this.zoom = 15
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top-menu {
  margin-top: 5px;
  position: absolute;
  width: 100%;
  height: 50px;
  display: block;

}
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

