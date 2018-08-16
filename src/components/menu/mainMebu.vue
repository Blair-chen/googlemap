<template lang="pug">
  div.login
    div.all-box
      div.compare-source-box(@click="ClickHandler('search')")
        span(style="position: absolute; margin-top: 14px;margin-left: -40px;font-size:15px") 历史速度
      div.compare-source-box(@click="ClickHandler('compare')")
        span(style="position: absolute; margin-top: 14px;margin-left: -40px;font-size:15px")  数据来源对比

</template>


<script>
import ss from "../../assets/first.png";
export default {
  name: 'HelloWorld',
  methods:{
    ClickHandler(value){
      this.$router.push('/'+value);
    }
  }
}
</script>
<style lang="less" scoped>
.login{
    width: 1500px;
  height: 800px;
 background-image: url("../../assets/first.png");
  background-size: 100%;
 background-repeat: no-repeat;
 position:relative;
.all-box{
  position: absolute;
  display: block;
  margin-left: 600px;
  margin-top: 300px;

 .compare-source-box{
    cursor: pointer;
  &:hover {
    background-color:#08AD19
  }
   text-align: center;
   margin-top: 6px;
    width:200px;
  height:50px;
  background-color: aqua;
  border-radius: 25px;
 }
}


}
</style>
