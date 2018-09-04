<template lang="pug">
div
  gmap-map( v-if="center" @tilesloaded="mapLoadHandler"  ref="googleMap"  :center="center" :zoom="zoom" )
  div.top-menu
    nav-menu.z1002(ref="topMenu" :buttonFlag="false" @refresh="refresh" @search="search" @reginHandler="regionHandler" )
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in lines" class="google-ployline" :map="map" :key="index"
  :valueitem="m" :path="m.positions" :strokeColor="m.color"
  :strokeWeight="strokeWeight" :events="event"  @onclick="onlickHandler" :editable="false")
  modelView(ref="model" :modelId="display" @close="closeModel" :item="item")
</template>
<script>
import navMenu from "../menu/regin";
import vueGooglemapPolyline from "../googlemap/googleMapPolyline";
import modelView from "../Pop-box/model";
import * as VueGoogleMaps from "vue2-google-maps";
import api from "store/search/api/index.js";
import { getCenter,isCantainsBounds,zoomMapping,colorMapping, isCatains} from "../untils/tool.js";

export default {
  components: { vueGooglemapPolyline, modelView, navMenu },

  data() {
    return {
      center: { lat: -33.88658145569154, lng: 151.13988831025813 },
      lines: [],
      map: null,
      event: { click: "onclick" },
      zoom: 19,
      display: false,
      item: null,
      strokeWeight: 3,
      prevPosition: null
    };
  },
  mounted() {
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        const vm = this.$refs.googleMap;
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
    //polling
    cycleHandler() {
      this.interval = setInterval(() => {
        this.mapLoadHandler();
      }, 180000);
    },
    refresh() {
      this.mapLoadHandler();
    },
    // get rode by bound box
    mapLoadHandler() {
      this.lines = [];
      const boundList = this.createParams();
      _.each(boundList, params => {
        this.loadBoundingBox(params);
      });
    },
    async loadBoundingBox(params) {
      let response = await api.search(params);
      if (response.status === 200) {
        if (response.data != "" && !_.isEmpty(response.data)) {
          if (this.isCurrentBound(response.data.bound)) {
            this.prevPosition = response.data.bound;
            _.each(response.data.listWay, item => {
              item.color = colorMapping(item.flow);
            });
            this.lines.push(...response.data.listWay);
          }
        } else {
          this.$Message.error("Server failed to read file");
        }
      }
    },
    createParams() {
      let mapObject = this.$refs.googleMap.$mapObject;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      const zoom=zoomMapping(mapObject.getZoom());
      let params = {
        zoom: zoom,
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
      };
      let boundList = [];
      if (mapObject.getZoom() < 16) {
        const averageLat = (northeast.lat() - sourthwest.lat()) / 4;
        const averageLng = (northeast.lng() - sourthwest.lng()) / 4;
        boundList.push({zoom: zoom,sourthwest: {lat: sourthwest.lat() + 2 * averageLat, lng: sourthwest.lng()+averageLng }, northeast: { lat: sourthwest.lat() +3* averageLat, lng: sourthwest.lng() + 2 * averageLng } });
        boundList.push({zoom: zoom, sourthwest: { lat: sourthwest.lat() + 2 * averageLat,lng: sourthwest.lng()+2*averageLng}, northeast: {lat: sourthwest.lat() +3* averageLat, lng: sourthwest.lng() + 3 * averageLng } });
        boundList.push({ zoom: zoom,sourthwest: {lat: sourthwest.lat() +  averageLat, lng: sourthwest.lng()+averageLng },northeast: { lat: sourthwest.lat() +2* averageLat,lng: sourthwest.lng() + 2 * averageLng }});
        boundList.push({zoom: zoom, sourthwest: { lat: sourthwest.lat() +  averageLat, lng: sourthwest.lng()+2*averageLng},northeast: { lat: sourthwest.lat() +2* averageLat, lng: sourthwest.lng() + 3 * averageLng} });
        boundList.push({ zoom: zoom,northeast: {lat: sourthwest.lat() + averageLat,lng: northeast.lng() }, sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() } });
        boundList.push({zoom: zoom,northeast: { lat: northeast.lat(), lng: northeast.lng() },sourthwest: { lat: sourthwest.lat() + 3 * averageLat, lng: sourthwest.lng() }});
        boundList.push({ zoom: zoom,northeast: { lat: sourthwest.lat() + 3 * averageLat,lng: sourthwest.lng() + averageLng }, sourthwest: { lat: sourthwest.lat() + averageLat,lng: sourthwest.lng() }});
        boundList.push({zoom: zoom, northeast: {lat: sourthwest.lat() + 3 * averageLat,lng: northeast.lng()}, sourthwest: {lat: sourthwest.lat() + averageLat, lng: sourthwest.lng() + 3 * averageLng } });
      } else {
        boundList.push(params);
      }
      return boundList;
    },
    //get by wayid
    async search(key) {
      if (key === null) {
        return null;
      }
      this.lines = [];
      let response = await api.loadroute(key);
      if (response.status === 200) {
        if (_.isEmpty(response.data)) {
          this.$Message.warning("Wayid has no corresponding section");
        } else {
          _.each(response.data, item => {
            item.color = colorMapping(item.flow);
          });
          this.lines = response.data;
          this.zoom = 18;
          this.$refs.googleMap.$mapObject.setCenter(
            response.data[0].positions[0]
          );
        }
      }
    },
    closeModel() {
      this.display = false;
    },
    onlickHandler(event, value) {
      this.item = value;
      this.display = true;
    },
    //compare bound box
    isCurrentBound(bound) {
      let mapObject = this.$refs.googleMap.$mapObject;
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
    regionHandler(value) {
      let map = this.map;
      if (map) {
        map.setCenter(getCenter(value));
        map.setZoom(15);
      } else {
        this.center = getCenter(value);
        this.zoom = 15;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top-menu {
  position: absolute;
  width: 100%;
  height: 50px;
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

