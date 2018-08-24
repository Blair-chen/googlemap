<template>
  <gmap-map @click="test($event)" @tilesloaded="mapLoadHandler"  ref="googleMap"   :center="center" :zoom="zoom" style="width: 1500px; height: 700px">


  </gmap-map>
</template>

<script>
import api from "store/search/api/index.js";
import * as VueGoogleMaps from "vue2-google-maps";
import { zoomMapping } from "../untils/tool.js";

import _ from "lodash";
export default {

  data() {
    return {
      center: {lat: 39.9042, lng:116 },
      Flag: false,
      zoom: 23,
      options: {},
      map: null,


    };
  },
  mounted() {
    const vm = this;
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        vm.map = vm.$refs.googleMap.$mapObject;
      }, 1000);
    });
  },
  methods: {
    async mapLoadHandler() {
       let mapObject = this.$refs.googleMap.$mapObject;
      let northeast = mapObject.getBounds().getNorthEast();
      let sourthwest = mapObject.getBounds().getSouthWest();
      let params = {
        zoom: zoomMapping(mapObject.getZoom()),
        northeast: { lat: northeast.lat(), lng: northeast.lng() },
        sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
      };

      let response = await api.functionCount(params);
    }
  }
};
</script>
