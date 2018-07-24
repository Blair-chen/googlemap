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
import moment from "moment";
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
      prevSpeed:0,
      prevTime:null
    }
  },
  methods:{
    async TimeHandler() {
      this.value = 0;
      this.prevSpeed = 0;
      this.speeds = [];
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
      const format = "YYYY-MM-DD";
      let select = moment(date).format(format);
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
      const format = "YYYY-MM-DD";
      let select = moment(this.date).format(format);
      let hour=parseInt(this.value/60);
      let minute =this.value%60;
      hour  = hour<10?('0'+hour):hour
      minute = minute < 10 ? ('0' + minute) : minute;
      const detailTime = hour+':'+minute
      let speed = this.prevSpeed;
      if (!_.isEmpty(_.find(this.speeds, { time:detailTime}))) {
         speed = _.find(this.speeds, { time:detailTime}).speed;
         this.prevSpeed = speed;
         this.prevTime =select+" "+ detailTime;
        return '时间：'+ select+ " " +detailTime+'；速度：'+speed;
      }
      debugger
     if(this.prevTime!==null&&moment(this.prevTime)<moment(select+" "+ detailTime) )
     {
       return '时间：'+this.prevTime+'-'+ select+" "+ detailTime+'；速度：'+speed
     }else{
       return '时间：'+ select+ "  "+detailTime+'；速度：'+speed;
     }

    },
    date2Str(date) {
      date = new Date(date);
      let h = date.getHours();
      h = h<10?('0'+h):h;
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
