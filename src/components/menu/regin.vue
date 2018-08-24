<template lang="pug">
div.regin-search-menu
  div.regin-box
      div(style="float:left")
        ul.absolute.right(style="background-color:#FFF")
          li.nav-btn
            span.span regin
          li.nav-btn(v-for="(item,index) in  region" :class='{select:item.id==(select && select.id)}' @click="select=item,resourceFlag = true" :key="index")
            span.span {{item.region}}
  resource(v-if="buttonFlag&&resourceFlag" ref="resource" :data="resource" @cancelHandler="cancelHandler" @okHandler="okHandler")
  div.search-box
    features.ml10(v-if="buttonFlag" ref="features"  @featuresHandler="featuresHandler" )
    Input.ml10(v-if="!buttonFlag" type="text"  icon="search" v-model="key" style="width:200px;height:7px" placeholder="wayid" @on-enter="search()" @on-click="search()")
    Button.ml1(v-if="!buttonFlag" icon="refresh"  style="position: absolute; margin-top: 7px;"  @click="refresh")
  div.menu
    nav-menu(ref="menu" :class="{active:buttonFlag}" )

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
      key:null,
      resource:null,
      resourceFlag:false,
      select:null
    }
  },
  watch:{
    data(nv){
      if(nv){
        this.key = nv
      }
    },
    select(nv){
    if(nv){
      if(!_.isEmpty(nv.resource)&&this.buttonFlag){
      this.resource = nv.resource;
      if(!this.resourceFlag){
        this.$emit("reginHandler",nv.region);
      }
    }else {
      this.$emit("reginHandler",nv.region);
    }
      }
    }
  },
  mounted(){
    let region =api.loadRegion();
    this.select = region[0];
    this.region = region;
  },
methods:{
  refresh(){
    this.key = null;
    this.$emit("refresh");
  },
  cancelHandler(){
    this.resourceFlag = false;
  },
  okHandler(value){

    //add api
    this.$emit("reginHandler",this.select.region);
    this.resourceFlag = false
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
    &:not(:first-child):hover {
      color: red;
    }
   .span{
     position: absolute;
      text-align: center;
      margin-top: 12px;
      margin-left: -7px;
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
.active{
  margin-top: 10px
}
 .select{
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
