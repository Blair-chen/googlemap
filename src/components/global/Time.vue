<template lang="pug">
  div.speed-box
    Button(v-if="buttonFlag" type="primary" @click="modelId=true" style="margin-top: 80px;margin-left: 200px;") 选择时间
    Slider(v-else v-model="value" style="margin-top: 80px" :tip-format="format")
    time-select(ref="timeSelect"  :modelId="modelId" @close="closeHandler" @selectHandler="selectHandler")
</template>
<script>
import timeSelect from "./calender/mainTime"
    export default {
      components: {timeSelect},
      data(){
        return{
           modelId:false,
           buttonFlag:true,
           value:0
        }
      },
methods:{
  closeHandler() {

    this.modelId = false;
    },
    selectHandler(date) {
      this.buttonFlag = false;
      debugger
    },
    format (val) {
      //将0-100和时间列一个对应关系
      return '时间：XX：XX：XX；速度：xx';
    },
}
    }
</script>
<style lang="less" scoped>
.speed-box {
  height: 200px;
}

</style>
