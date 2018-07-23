<template lang="pug">
  div.speed-box
    Button(v-if="buttonFlag" type="primary" @click="modelId=true" style="margin-top: 80px;margin-left: 200px;") 选择时间
    div(v-else)
      Button( type="primary" @click="modelId=true" style="margin-left: 200px;") 重选时间
      Slider( v-model="value" :min="0" :max="1440" style="margin-top: 60px" :tip-format="format")
      div(style="font-size:1rem;margin-top: 20px;text-align:center") {{format(value)}}
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
           value:0,
           date:null
        }
      },
methods:{
  TimeHandler() {

  },
  closeHandler() {
    this.modelId = false;
    },
  selectHandler(date) {
      this.date = date;
      this.buttonFlag = false;
  },
    format (val) {
      let hour=parseInt(this.value/60);
      let minute =this.value%60;
      if(hour<10) {
        hour = "0"+hour;
      }
      if (minute <10) {
        minute ="0"+minute;
      }
      //将0-100和时间列一个对应关系
      return '时间：'+ this.date+hour+':'+minute+'；速度：xx';
    },
}
    }
</script>
<style lang="less" scoped>
.speed-box {
  height: 200px;
}

</style>
