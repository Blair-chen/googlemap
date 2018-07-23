<template>

</template>

<script>
export default {
  name: "vue-googlemap-polygon",
  data() {
    return {
    };
  },
  props: {
    path: Array,
    clickable: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    map: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: false
    },
    fillColor: String,
    fillOpacity: {
      type: Number,
      default: 1.0
    },
    geodesic: Boolean,
    strokeColor: String,
    strokeOpacity: Number,
    strokeWeight: Number,
    visible: {
      type: Boolean,
      default: true
    },
    zIndex: Number,
    events: Object
  },
  watch: {
    map(nv) {
      this.$map = nv;
      if (this.$map) {
        this.createPolygon();
      } else {
        this.$on("mapReady", map => {
          this.$map = map;
          this.createPolygon();
        });
      }
    }
  },
  destroyed() {
    this.$polygon.setMap(null);
    google.maps.event.clearInstanceListeners(this.$polygon);
  },
  methods: {
    createPolygon() {
      const options = {};
      for (let key in this.$props) {
        if (this.$props[key] !== undefined) {
          Object.assign(options, { [key]: this.$props[key] });
        }
      }
      ["draggable", "editable", "visible", "paths"].forEach(k => {
        this.$watch(k, nv => {
          this.$polygon[`set${k.charAt(0).toUpperCase() + k.slice(1)}`](nv);
        });
      });
      this.$polygon = new google.maps.Polygon(options);
      this.$polygon.setMap(this.$map);
      this.registerEvents();
    },
    registerEvents() {
      const paths = this.$polygon.getPaths();
      paths.forEach(p => {
        p.addListener("insert_at", o => {
          this.$emit("change", paths);
        });
        p.addListener("remove_at", o => {
          this.$emit("change", paths);
        });
        p.addListener("set_at", o => {
          this.$emit("change", paths);
        });
      });
      const events = this.events;
      if (!events) return;
      for (let eventName in events) {
        if (eventName)
          this.$polygon.addListener(eventName, ev => {
            this.$emit(events[eventName], ev);
          });
      }
    }
  }
};
</script>
