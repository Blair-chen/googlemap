<template lang="pug">
  div.speed-box
    Button(type="primary" @click="modelId=true" style="margin-top: 80px;margin-left: 200px;") 选择时间
    time-select(ref="timeSelect"  :modelId="modelId" @close="closeHandler")
</template>
<script>
import timeSelect from "./calender/mainTime"
    export default {
      components: {timeSelect},
      data(){
        return{
           modelId:false
        }
      },
methods:{
  closeHandler() {
    this.modelId = false;
    }
}
    }
</script>
<style lang="less" scoped>
.speed-box {
  height: 200px;
}

</style>
