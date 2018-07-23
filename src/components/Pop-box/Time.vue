<template lang="pug">
  div.speed-box
    Button(v-if="buttonFlag" type="primary" @click="TimeHandler" style="margin-top: 80px;margin-left: 200px;") 选择时间
    div(v-else)
      Button( type="primary" @click="TimeHandler" style="margin-left: 200px;") 重选时间
      Slider( v-model="value" :min="0" :max="1440" style="margin-top: 60px" :tip-format="format")
      div(style="font-size:1rem;margin-top: 20px;text-align:center") {{format(value)}}
    time-select(ref="timeSelect" :dates="dates" :modelId="modelId" @close="closeHandler" @selectHandler="selectHandler")
</template>
<script>
import timeSelect from "./calender/mainTime";
import api from "store/search/api/index.js";
    export default {
      components: {timeSelect},
       props:{
          item:{
            type:Object
          }
        },
      data(){
        return{
           modelId:false,
           buttonFlag:true,
           value:0,
           date:null,
           dates:null,
           speeds:[],
        }
      },
methods:{
  async TimeHandler() {
    let response = await api.loadTime(this.item.wayid);
    if (response.status === 200) {
      this.dates = response.data;
    }
    this.modelId=true;
  },
  closeHandler() {
    this.modelId = false;
    },
  async selectHandler(date) {
      this.date = date;
      let selectYear = this.date.getFullYear();
      let selectMonth = this.date.getMonth() + 1;
      let selectDay = this.date.getDate();
      let select = selectYear + "-" + selectMonth + "-" + selectDay ;
      const response = await api.loadSpeed(this.item.wayid,select)
      if (response.status === 200) {
        _.each(response.data,item=>{
          let time =this.date2Str(item.dtime)

          this.speeds.push({time:time,speed:item.speed})
        })
      }
      this.buttonFlag = false;
  },
    format (val) {
      let selectYear = this.date.getFullYear();
      let selectMonth = this.date.getMonth() + 1;
      let selectDay = this.date.getDate();
      let select = selectYear + "年" + selectMonth + "月" + selectDay + "日";
      let hour=parseInt(this.value/60);
      let minute =this.value%60;
      if(hour<10) {
        hour = "0"+hour;
      }
      if (minute <10) {
        minute ="0"+minute;
      }

      let detailTime = hour+':'+minute
      let speed = _.find(this.speeds, { time:detailTime})? _.find(this.speeds, { time:detailTime}).speed:0;

      //将0-100和时间列一个对应关系
      return '时间：'+ select+ detailTime+'；速度：'+speed;
    },
    date2Str(date) {
      date = new Date(date);
    let h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return h+':'+minute;
    }
}
    }
</script>
<style lang="less" scoped>
.speed-box {
  height: 200px;
}

</style>
