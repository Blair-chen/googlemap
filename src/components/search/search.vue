<template lang="pug">
div
  gmap-map( @tilesloaded="mapLoadHandler"  ref="googleMap"  :center="center" :zoom="zoom" )
  div.search-box
    Input.ml10(type="text" icon="search" v-model="key" style="width:200px;height:0px;left:5px" placeholder="wayid" @on-enter="search()" @on-click="search()")
    Button.ml1(icon="refresh" style="position: absolute; margin-top: 11px;margin-left: 10px;"  @click="refresh")
  div.menu
    nav-menu(ref="menu")
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in lines" class="google-ployline" :map="map" :key="index"
  :valueitem="m" :path="m.positions" :strokeColor="m.color"
  :strokeWeight="strokeWeight" :events="event"  @onclick="onlickHandler" :editable="false")
  modelView(ref="model" :modelId="display" @close="closeModel" :item="item")
</template>
<script>
import navMenu from "../menu/main"
import vueGooglemapPolyline from "../googlemap/googleMapPolyline";
import modelView from "../Pop-box/model";
import * as VueGoogleMaps from "vue2-google-maps";
import api from "store/search/api/index.js";
import { zoomMapping, colorMapping,isCatains } from "../untils/tool.js";

export default {
  components: { vueGooglemapPolyline, modelView,navMenu },

  data() {
    return {
      center: { lat: -33.88658145569154, lng: 151.13988831025813 },
      key: null,
      lines: [],
      map: null,
      event: { click: "onclick" },
      zoom: 19,
      display: false,
      item: null,
      strokeWeight:5
    };
  },
  mounted() {
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        const vm = this.$refs.googleMap.$mapObject;
        if (vm) {
          this.map = vm;
          this.cycleHandler();
        }
      }, 1000);
    });
  },
  beforeDestroy() {
    clearTimeout( this.interval);
  },
  methods: {
    //polling
     cycleHandler() {
      this.interval =setInterval(() => {
         this.mapLoadHandler();
      }, 180000);
    },
    refresh() {
      this.key = null;
      this.mapLoadHandler();
    },
    // get rode by bound box
    async mapLoadHandler() {
      if (this.key) {
        return null;
      }
      this.lines = [];
      let mapObject = this.$refs.googleMap.$mapObject;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      let params = {
        zoom: zoomMapping(mapObject.getZoom()),
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
      };
      let response = await api.search(params);

      if (response.status === 200 ) {
        if(response.data!=""&&!_.isEmpty(response.data)){
           if(this.isCurrentBound(response.data.bound)){
              _.each(response.data.listWay, item => {
                item.color = colorMapping(item.flow);
               });
               let zoom = mapObject.getZoom();
               if (zoom<16){
                 this.strokeWeight =3;
               }else{
                  this.strokeWeight =5;
               }
           this.lines = response.data.listWay;
            }
        }else {
          this.$Message.error("Server failed to read file");
        }
      }
    },
    //get by wayid
    async search() {
      if (this.key === null) {
        return null;
      }
       this.lines=[];
      let response = await api.loadroute(this.key);
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
    }
  }
};
</script>
<style lang="less" scoped>
.search-box {
  position: absolute;
  margin-top: 50px;
  display: block;
}
.menu{
  margin-top: -6px;
  margin-left: 239px;
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

