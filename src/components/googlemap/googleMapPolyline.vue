<template>
</template>

<script>
export default {
  name: "vue-googlemap-polyline",
  data() {
    return {};
  },
  props: {
    valueitem:Object,
    path: Array,
    clickable: {
      type: Boolean,
      default: true
    },
    map: {
      type: Object
    },
    draggable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
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

  mounted() {
    this.loadinit();
  },

  destroyed() {
    this.$polyline.setVisible(false);
    this.$polyline.setMap(null);
    google.maps.event.clearInstanceListeners(this.$polyline);
  },

  methods: {
    loadinit() {
      if (this.map) {
        this.$map = this.map;
      }
      if (this.$map) {
        this.createPolyline();
      } else {
        this.$on("mapReady", map => {
          this.$map = map;
          this.createPolyline();
        });
      }
    },
    createPolyline() {
      const options = {};
      for (let key in this.$props) {
        if (this.$props[key] !== undefined) {
          Object.assign(options, { [key]: this.$props[key] });
        }
      }
      this.$polyline = new google.maps.Polyline(options);
      this.$polyline.setMap(this.$map);
      this.registerEvents();
    },
    //event
    registerEvents() {
      const path = this.$polyline.getPath();
      path.addListener("insert_at", o => {
        this.$emit("change", path);
      });
      path.addListener("remove_at", o => {
        this.$emit("change", path);
      });
      path.addListener("set_at", o => {
        this.$emit("change", path);
      });
      const events = this.events;
      if (!events) return;
      for (let eventName in events) {
        if (eventName)
          this.$polyline.addListener(eventName, ev => {
            this.$emit(events[eventName],ev,this.valueitem);
          });
      }
    }
  }
};
</script>
