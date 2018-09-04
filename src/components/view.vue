<template lang="pug">
div
  gmap-map( v-if="center" @tilesloaded="mapLoadHandler"  ref="googleMap"  :center="center" :zoom="zoom" )
  div.top-menu
    nav-menu.z1002(ref="topMenu"  @refresh="refresh" @search="search" @reginHandler="regionHandler" @timeTypeChange="timeTypeChange" @featuresHandler="featuresHandler" @keyHandler="keyHandler")
  report-view(v-if="buttonFlag" ref="report" :data="data")
  vue-googlemap-polyline( ref="ployline" v-for="(m, index) in lines" class="google-ployline" :map="map" :key="index"
  :valueitem="m" :path="m.positions" :strokeColor="m.color"
  :strokeWeight="strokeWeight" :events="event"  @onclick="onlickHandler" :editable="false")
  vue-google-info-window(v-for="(m, key) in marks" :key="key+'info'" :content="m.content" :map="map" :position="m.position"  :opened="true" )
  modelView(ref="model" :modelId="display" @close="closeModel" :item="item")
  history-slider(v-if="historyFalg" @changeHistoryTime="changeHistoryTime")
</template>
<script>
import reportView from "./compare/report";
import navMenu from "./menu/regin"
import vueGooglemapPolyline from "./googlemap/googleMapPolyline";
import modelView from "./Pop-box/model";
import * as VueGoogleMaps from "vue2-google-maps";
import api from "store/search/api/index.js";
import vueGoogleInfoWindow from "./googlemap/infoWindow";
import historySlider from "./history/silder"
import {getCenter, zoomMapping, colorMapping,isCatains } from "./untils/tool.js";

export default {
  components: { historySlider,vueGooglemapPolyline, modelView,navMenu,reportView ,vueGoogleInfoWindow},

  data() {
    return {
      center:  { lat: 39.9042, lng: 116.4074 },
      lines: [],
      map: null,
      event: { click: "onclick" },
      zoom: 19,
      display: false,
      item: null,
      strokeWeight:5,
      mapSource:null,
      resource:null,
      buttonFlag:false,
      marks: [],
      data:null,
      key:null,
      historyFalg:false,
      time:null,
      feature:null,
    };
  },
  mounted() {
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        const vm = this.$refs.googleMap;
        if (vm&&vm.$mapObject) {
          this.map = vm.$mapObject;
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
      if(!this.mapSource||!this.resource){ return null; }
      if (this.key){  return null;  }
      this.lines = [];
      let params = this.createParam();
      let response = await api.search(params);
      if (response.status === 200 ) {
        if(response.data!=""&&!_.isEmpty(response.data)){
           if(this.isCurrentBound(response.data.bound)){
              _.each(response.data.listWay, item => { item.color = colorMapping(item.flow); });
               let zoom = mapObject.getZoom();
               if (zoom<16){this.strokeWeight =3;
               }else{ this.strokeWeight =5; }
           this.lines = response.data.listWay;
            }
        }else {
          this.$Message.error("Server failed to read file");
        }
      }
    },
    createParam(){
      let time="RealTime";
      if(this.historyFalg){  time=this.time; }
      let mapObject = this.$refs.googleMap.$mapObject;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      let params = {
        zoom: zoomMapping(mapObject.getZoom()),
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() },
        map:this.mapSource,
        resource:this.resource,
        time:time,
        feature:this.feature
      };
      return params;
    },
    //get by wayid
    async search(key) {
      if (key === null) {return null; }
      this.key =key;
       this.lines=[];
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
      if(this.buttonFlag){
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
      }else{
      this.item = value;
      this.display = true;
      }

    },
    //compare bound box
    isCurrentBound(bound) {
      let mapObject = this.$refs.googleMap.$mapObject;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      if ( isCatains(northeast.lat(), bound.northeast.lat) &&   isCatains(northeast.lng(), bound.northeast.lng) &&  isCatains(sourthwest.lat(), bound.sourthwest.lat) &&isCatains(sourthwest.lng(), bound.sourthwest.lng)  ) {
        return true;
      }
      return false;
    },
    regionHandler(value){
      let map= this.map;
      if(map) {
       map.setCenter(getCenter(value.region));
       map.setZoom(15);
      }else{
        this.center = getCenter(value.region);
        this.zoom = 15
      }
      this.mapSource = value.map;
      this.resource=value.resource;
      if(value.resource.length>1){
        this.feature ="differentLevel";
        this.buttonFlag = true
      }else{
        this.feature =null;
        this.buttonFlag = false;
      }
    },
    timeTypeChange(value){
      if(value==="RealTime"){
        this.historyFalg= false;
      }else if(value="History"){
         this.historyFalg= true;
      }
      this.time =null;
    },
    changeHistoryTime(value){
      this.time = value;
      this.mapLoadHandler();
    },
    featuresHandler(value){
      this.feature = value;
       this.mapLoadHandler();
    },
    keyHandler(value){
      this.key =value;
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


