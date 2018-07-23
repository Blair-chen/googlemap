
<template>
<div>
  <slot>
  <!-- <div class="you-will-never-find-this"></div> -->
  </slot>
</div>
</template>

<script>
import _ from "lodash";

import propsBinder from "@/components/untils/propsBinder.js";
import eventsBinder from "@/components/untils/eventsBinder.js";
import mutationObserver from "@/components/untils/mutationObserver.js";
import MapComponent from "./mapComponent.js";

const props = {
  options: {
    type: Object,
    twoWay: false,
    required: false,
    default() {
      return {};
    }
  },
  map: Object,
  content: {
    twoWay: false,
    default: null
  },
  opened: {
    type: Boolean,
    default: true,
    twoWay: true
  },
  position: {
    type: Object,
    twoWay: false
  },
  positions: {
    type:Array,
    default:null
  },
  zIndex: {
    type: Number,
    twoWay: true
  }
};


export default MapComponent.extend({
  replace: false,
  props: props,
  data() {
    return {
      isOpen:this.opened
    }
  },
  created() {
    this.$markerObject = null;
  },
  mounted() {
    this.loadInfoWindow();
  },
  watch: {
    map(nv) {
      if (nv !== null) {
        this.loadInfoWindow(nv);
      }
    }
  },
  destroyed() {
    if (this.disconnect) {
      this.disconnect();
    }
    if (this.$infoWindow) {
      this.$infoWindow.setMap(null);
    }
    this.destroyed = true;
  },

  methods: {
    loadInfoWindow() {
      if(this.map) {
        this.$map = this.map;
      }
      this.destroyed = false;
      this.$el.style.display = "none";
      this.createInfoWindow(this.$map);
    },
    openInfoWindow() {
      if (this.isOpen) {
        if (this.$markerObject !== null) {
          this.$infoWindow.open(this.$map, this.$markerObject);
        } else {
          this.$infoWindow.open(this.$map);
        }
      } else {
        this.$infoWindow.close();
      }
    },

    createInfoWindow(map) {
      if (this.destroyed) return;
      var el = document.createElement("div");
      el.innerHTML = this.content;
      google.maps.event.addDomListener(el, "click", ev => {
        this.$emit("g-click", ev);
      });
      // setting options
      const options = _.clone(this.options);
      options.content = el;
      // only set the position if the info window is not bound to a marker
      if (this.$markerObject === null) {
        options.position = this.position;
      }
      this.$infoWindow = new google.maps.InfoWindow(options);
      // watching
      this.$infoWindow.addListener("closeclick", () => {
        this.isOpen = false;
        this.$emit('closeClick',this.positions);
      });
      // Open if needed
      this.openInfoWindow();
    }
  },

  events: {
    "marker-ready"(marker, map) {
      this.$markerObject = marker.$markerObject;
      marker.$on("g-click", () => {
        this.isOpen = !this.isOpen;
      });
    }
  }
});
</script>

