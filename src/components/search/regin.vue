<template lang="pug">
div.regin-search-menu
  div.regin-box
      Button(type="primary") regin
      RadioGroup(v-model="button" type="button")
        Radio(label="CN" )
        Radio(label="EU")
        Radio(label="ANZ")
        Radio(label="KOR" disabled)
        Radio(label="NA")
        Radio(label="SA")
  div.search-box
    Input.ml10(type="text" :disabled="buttonFlag" icon="search" v-model="key" style="width:200px;height:7px" placeholder="wayid" @on-enter="search()" @on-click="search()")
    Button.ml1(icon="refresh" :disabled="buttonFlag" style="position: absolute; margin-top: 7px;"  @click="refresh")
  div.menu
    nav-menu(ref="menu")

</template>
<script>
import navMenu from "../menu/main"
export default {
  components:{
    navMenu
  },
  props:{
    buttonFlag:Boolean,
    data:String,
    sourceFlag:Boolean
  },
  data(){
    return {
      button:"ANZ",
      key:null
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
methods:{
  refresh(){
    this.key = null;
    this.$emit("refresh");
  },
  search(){
    this.$emit("search",this.key);
  }
}
}
</script>
<style lang="less" scoped>
.regin-search-menu{
  width: 100%;
  height: 50px;
  background-color:#F2F4F4;
.regin-box{
  position: absolute;
  margin-left: 10px;
  margin-top: 6px;
   .user-pop {
       width: 296px;
    display: block;
    /* display: none; */
    position: absolute;
    line-height: normal;
    /* right: 0; */
    top: 6%;
    left: 70px;
    text-align: left;
    z-index: 1;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 6px #888;
    box-shadow: 0 2px 6px #888;
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
