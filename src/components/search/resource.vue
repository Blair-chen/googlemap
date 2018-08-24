<template lang="pug">
  div.zone.flex.flex-column.overflow-hidden(style="height: 200px; width: 200px;margin-left:50px;margin-top:60px;position:absolute;box-shadow: 1px 1px 5px #888888;    background-color: white;")
    div.header(style="height: 30px;width: 100%; border-bottom: 1px solid #DDD;")
      div.left
        div.h2(style="font-size；15px;margin-left:5px;margin-top:4px") Data Sources
    div.flex-grow.body(style="height:65%;border-bottom: 1px solid #DDD")
      checkout(ref="checkout" :data="resource")
    div.footer.clearfix
      div.right
        Button(type="text"  @click="cancelHandler") 取消
        Button(type="primary" @click="okHandler") 确定
</template>
<script>
import checkout from "../compare/modal/checkBox"
import _ from "lodash";
export default {
  components:{
    checkout
  },
  props:{
    data:Array
  },
  data(){
     return{
       resource:[]
     }
  },
  watch:{
    data(nv){
      if (!_.isEmpty(nv)) {
        this.resource = nv;
      }
    }
  },
  methods:{
    cancelHandler(){
      this.$refs.checkout.reset();
      this.$emit("cancelHandler");
    },
    okHandler(){
      const value = this.$refs.checkout.checkAllGroup;
      this.$refs.checkout.reset();
      this.$emit("okHandler",value);
    }
  }

}
</script>
<style lang="less" scoped>

</style>
