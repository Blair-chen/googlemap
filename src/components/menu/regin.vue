<template lang="pug">
div.regin-search-menu
  div.regin-box
    div(style="float:left")
        ul.absolute.right(style="background-color:#FFF")
          li.nav-btn
            span.span regin
          li.nav-btn(v-for="(item,index) in  region" :class='{select:item.id==(select && select.id)}' @click="select=item" :key="index")
            span.span {{item.region}}
    RadioGroup.radio-box(v-model="button" type="button" )
        Radio(label="RealTime")
        Radio(label="History")
  resource(v-if="Falg" ref="resource" :data="resource" :regin="select" @cancelHandler="cancelHandler" @okHandler="okHandler")
  div.search-box
    features.ml10(v-if="buttonFlag" ref="features"  @featuresHandler="featuresHandler" )
    Input.input-box.ml10(v-if="!buttonFlag" type="text"  icon="search" v-model="key" placeholder="wayid" @on-enter="search()" @on-click="search()")
    Button.ml1.buttonn-refresh(v-if="!buttonFlag" icon="refresh"   @click="refresh")


</template>
<script>
import features from "../compare/features";
import resource from "./resource";
import api from "store/search/api/index.js";
import navMenu from "../menu/main";
import _ from "lodash";
export default {
  components: {
    navMenu,
    resource,
    features
  },
  props: {
    data: String
  },
  data() {
    return {
      region: null,
      key: null,
      resource: null,
      Falg: false,
      button: "RealTime",
      select: null,
      buttonFlag: false
    };
  },
  watch: {
    key(nv){
      this.$emit("keyHandler",nv);
    },
    button(nv){
      if(nv){
        this.$emit("timeTypeChange",nv);
      }
    },
    data(nv) {
      if (nv) {
        this.key = nv;
      }
    },
    select(nv) {
      if (nv) {
        if (!_.isEmpty(nv.resource)) {
          this.resource = nv.resource;
          this.Falg = true;
        } else {
          this.$emit("reginHandler", nv.region);
        }
      }
    }
  },
  mounted() {
    let region = api.loadRegion();
    this.select = region[0];
    this.region = region;
  },
  methods: {
    refresh() {
      this.key = null;
      this.$emit("refresh");
    },

    cancelHandler() {
      this.Falg = false;
      this.select = null;
    },
    okHandler(value) {
      if (value.resource.length > 1) {
        this.buttonFlag = true;
      }
      value.region = this.select.region;
      this.$emit("reginHandler", value);
      this.Falg = false;
    },
    search() {
      this.$emit("search", this.key);
    },
    featuresHandler(value) {
      this.$emit("featuresHandler", value);
    }
  }
};
</script>
<style lang="less" scoped>
html{
    font-size:10px;
}
.regin-search-menu {
  width: 100%;
  height: 3rem;
  background-color: #f2f4f4;
  .features {
    text-align: center;
    display: block;
  }
  .regin-box {
    width: 50%;
    position: absolute;
    margin-left: 10px;
    float: left;
    margin-top: 6px;
    .radio-box{
      margin-top:5px;
      float: right
    }
    .nav-btn {
      height: 40px;
      display: inline-block;
      border-left: 1px solid #ccc;
      width: 50px;
      text-align: center;
      vertical-align: top;
      cursor: pointer;
      &:not(:first-child):hover {
        color: red;
      }
      .span {
        position: absolute;
        text-align: center;
        margin-top: 12px;
        margin-left: -7px;
      }
    }
  }
  .search-box {
    width: 50%;
    float: right;
    position: relative;
    text-align: center;
    .input-box{
       width:200px;
       height:7px;
       margin-top: 7px;
    }
    .buttonn-refresh{
      position: absolute;
       margin-top: 10px;
    }
  }
  .menu {
    margin-top: -6px;
    margin-left: 239px;
  }
  .active {
    margin-top: 10px;
  }
  .select {
    height: 40px;
    display: inline-block;
    border-left: 1px solid #ccc;
    width: 50px;
    text-align: center;
    vertical-align: top;
    background-color: aqua;
  }
}
</style>
