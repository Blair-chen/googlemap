<template lang="pug">
div.regin-search-menu
  div.regin-box
      div(style="float:left")
        ul.absolute.right(style="background-color:#FFF")
          li(style="height: 40px;display: inline-block; border-left: 1px solid #ccc; width: 50px;text-align: center;vertical-align: top;")
            span(style="position: absolute; text-align: center;margin-top: 12px;margin-left: -7px;") regin
          li.nav-btn(v-for="(item,index) in  region" @click="selectRegion(item)" :key="index")
            span(style="position: absolute; text-align: center;margin-top: 12px;margin-left: -7px;") {{item.region}}

  resource(v-show="resourceFlag" ref="resource" :data="resource" @cancelHandler="cancelHandler" @okHandler="okHandler")
  div.features(v-show="buttonFlag")
    features.ml10(ref="features"  @featuresHandler="featuresHandler" )
  div.search-box(v-show="!buttonFlag")
    Input.ml10(type="text" :disabled="buttonFlag" icon="search" v-model="key" style="width:200px;height:7px" placeholder="wayid" @on-enter="search()" @on-click="search()")
    Button.ml1(icon="refresh" :disabled="buttonFlag" style="position: absolute; margin-top: 7px;"  @click="refresh")
  div.menu
    nav-menu(ref="menu")

</template>
<script>
import features from "../compare/features";
import resource from "./resource";
import api from "store/search/api/index.js"
import navMenu from "../menu/main"
import _ from 'lodash';
export default {
  components:{
    navMenu,resource,features
  },
  props:{
    buttonFlag:Boolean,
    data:String,
    sourceFlag:Boolean,

  },
  data(){
    return {
      region:null,
      button:"ANZ",
      key:null,
      resource:null,
      resourceFlag:false
    }
  },
  watch:{
    data(nv){
      if(nv){
        this.key = nv
      }
    },
    button(nv){
      if(nv){
        this.$emit("reginHandler",nv);
      }
    }
  },
  mounted(){
    this.region =api.loadRegion();
  },
methods:{
  refresh(){
    this.key = null;
    this.$emit("refresh");
  },
  cancelHandler(){
    this.resourceFlag = false;
  },
  okHandler(){
    //add api
    this.resourceFlag = false
  },
  selectRegion(value){
    if(!_.isEmpty(value.resource)){
      this.resource = value.resource;
      this.resourceFlag = true;
    }else {
      this.$emit("reginHandler",value.region);
    }

  },
  search(){
    this.$emit("search",this.key);
  },
   featuresHandler(value) {
      this.$emit("featuresHandler",value);
    },
}
}
</script>
<style lang="less" scoped>
.regin-search-menu{
  width: 100%;
  height: 50px;
  background-color:#F2F4F4;
    .features {
text-align: center;
  display: block;
}
.regin-box{
  position: absolute;
  margin-left: 10px;
  margin-top: 6px;
    .nav-btn {
    height: 40px;
    display: inline-block;
    border-left: 1px solid #ccc;
    width: 50px;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    &:hover {
      color: red;
    }
    .icon {
      font-size: 1.5rem;
      &.sysicon {
        font-size: 2rem;
      }
    }
    &.user {
      width: auto;
      padding: 0 1rem;
      &:hover {
        color: inherit;
        .user-pop {
          display: block;
        }
      }
      .user-info {
        img {
          height: 40px;
          width: 40px;
          margin-right: 0.5rem;
          margin-top: 4px;
          vertical-align: top;
        }
        .icon {
          font-size: 1.2rem;
        }
      }
      .user-pop {
        display: none;
        position: absolute;
        line-height: normal;
        right: 0;
        top:2px;
        left: 0;
        text-align: left;
        z-index: 1;
        background-color: #fff;
        box-shadow: 0 2px 6px #888;
        .item {
          padding: 0.5rem 1rem;
          transition: background-color 0.3s;
          a {
            color: inherit;
          }
          &:hover {
            background-color: red;
            color: #fff;
          }
        }
      }
    }
  }

}
.search-box{
  text-align: center;

}
.menu{
  margin-top: -6px;
  margin-left: 239px;
}
}

</style>
