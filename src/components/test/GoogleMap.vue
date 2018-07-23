<template>
  <gmap-map @click="mapClick($event)"  ref="googleMap"  :id="mapName" :center="center" :zoom="7" style="width: 1500px; height: 700px">
    <gmap-marker :key="index" v-for="(m, index) in markers" :icon="myicon" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
      <vue-google-info-window v-for="(m, key) in markers" :key="key+'info'" :content="m.content" :map="map" :position="m.position" :positions="m.positions" :options="options" :opened="true" @closeClick="close"  > </vue-google-info-window>

  </gmap-map>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";
import vueGoogleInfoWindow from '@/components/global/infoWindow'
import detailBox from '@/components/google-map/detailBox'
import _ from 'lodash';
export default {
  components: {
    detailBox,vueGoogleInfoWindow
  },
  data() {
    return {
      //https://github.com/xkjyeah/vue-google-maps/blob/vue2/src/components/mapImpl.js  这是gmap-map的封装
      Flag: false,
      name: 'shing chen',
      options:{},
      map:null,
      mapName: this.name + '-map',
      myicon:'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      center: { lat: 10.0, lng: 10.0 },
      markers: [{
        content:"zheshibiaoqji",
        position: { lat: 10.0, lng: 10.0 }
      }, {
        content:"zheshibiaoqji",
        position: { lat: 11.0, lng: 11.0 }
      }],
    }
  },
  mounted(){
    const vm = this;
    VueGoogleMaps.loaded.then(() => {
      setTimeout(() => {
        vm.map = vm.$refs.googleMap.$mapObject;
      }, 1000);
    });
  },
  methods: {
    mapClick(event) {
      let position = event.latLng
      const index = _.findIndex(this.markers, item => { return (position.lat === item.lat && position.lng === item.lng) })
      if (index === -1) {
        this.markers.push({'position':position,'content':'dgsagdgags'})
      }
    },
     close() {

     },
     draged(){
       debugger
     }

  }

}
</script>
