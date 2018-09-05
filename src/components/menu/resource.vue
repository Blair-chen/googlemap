<template lang="pug">
  div.zone.flex.flex-column.overflow-hidden
    div.header
      div.left
        div
          span.inline-block.region-select-map {{regin.name}}/
          span.inline-block.region-select-map.map-rechose(@click="reChoseMap") {{map}}
    div.flex-grow.body
      checkout(v-if="mapSelected" ref="checkout" :data="resource")
      div(v-else)
       ul.zone-names.clearfix.mt2
         li.zone-name(v-for="(item,index) in data"  @click="mapClickHandler(item)")
          span {{item.map}}
    div.footer.clearfix(style="margin-top:7px")
      div.right
        Button(type="text"  @click="cancelHandler") 取消
        Button(type="primary" @click="okHandler") 确定
</template>
<script>
import checkout from "./checkBox";
import _ from "lodash";
export default {
  components: {
    checkout
  },
  props: {
    regin: Object,
    data: Array
  },
  data() {
    return {
      map: null,
      mapSelected: false,
      //  data:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}],
      resource: null
    };
  },
  watch: {
    data(nv) {
      this.map = null;
      this.mapSelected = false;
    }
  },

  methods: {
    cancelHandler() {
      if (this.$refs.checkout) {
        this.$refs.checkout.reset();
      }
      this.$emit("cancelHandler");
    },
    mapClickHandler(item) {
      this.map = item.map;
      this.resource = item.resource;
      this.mapSelected = true;
    },
    reChoseMap() {
      this.map = null;
      this.mapSelected = false;
    },
    okHandler() {
      if (
        !this.$refs.checkout ||
        _.isEmpty(this.$refs.checkout.checkAllGroup)
      ) {
        this.$Message.warning("Please select a data source ");
        return null;
      }
      const value = this.$refs.checkout.checkAllGroup;
      this.$refs.checkout.reset();
      const param = {
        map: this.map,
        resource: value
      };
      this.$emit("okHandler", param);
    }
  }
};
</script>
<style lang="less" scoped>
.zone {
  position: absolute;
  height: 200px;
  width: 300px;
  margin-left: 50px;
  margin-top: 60px;
  position: absolute;
  box-shadow: 1px 1px 5px #888888;
  background-color: white;
  .header {
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  .body{
    height:55%;
    border-bottom: 1px solid #DDD
  }
  .region-select-map {
    font-size: 15px;
    margin-top: 10px;
    float: left;
    margin-left: 10px;
  }
  .map-rechose {
    cursor: pointer;
  }
  .zone-names {
    margin: 0.5rem 1rem;
    white-space: normal;
    .zone-name {
      cursor: pointer;
      display: inline-block;
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
      &:hover {
        background-color: #ddd;
        color: red;
      }
    }
  }
}
</style>
