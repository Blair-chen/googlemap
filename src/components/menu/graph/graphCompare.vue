<template lang="pug">
  div.regin-chose
    span(style="position: absolute; margin-top: 17px;width: 100%;text-align: center;font-size:20px") region
    div.regin-all-box
      div.regin-box(@click="onClickHandler")
        span.span-box China
      div.regin-box
        span.span-box Australia
      div.regin-box
        span.span-box North America
      div.regin-box
        span.span-box South America
      div.regin-box
        span.span-box Europe
      div.regin-box
        span.span-box Korea
    model(ref="model" :modelId="modelId" @cilckHandler="clickHandler")
</template>
<script>
import model from "@/components/compare/modal/main";
import api from "store/search/api/index.js";
import {getCenter} from "@/components/untils/tool.js"
export default {
  components: {
    model
  },
  data() {
    return {
      modelId: false
    };
  },
  methods: {
    onClickHandler() {
      this.modelId = true;
      // this.$router.push('/compareView');
    },
    clickHandler(data) {
      this.modelId = false;
      if (data) {
       let response = api.loadCompareMap(data );
      if(response){
      this.center =getCenter(response) ;
      this.loading = false;
      //this.$router.push({name:"searchView"});
      this.$router.push({name:"compareView",params: { center: this.center }});
      }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.regin-chose {
  width: 1400px;
  height: 700px;
  position: absolute;
  .regin-all-box {
    width: 45%;
    height: 50%;
    position: absolute;
    top: 30%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: relative;
    .regin-box {
      cursor: pointer;
      &:hover {
        background-color: #08ad19;
      }
      margin-top: 50px;
      margin-left: 10px;
      float: left;
      background-color: aqua;
      width: 300px;
      height: 150px;
      border-radius: 10px;
      .span-box {
        position: absolute;
        margin-top: 50px;
        text-align: center;
        margin-left: 140px;
        font-size: 20px;
      }
    }
  }
}
</style>
