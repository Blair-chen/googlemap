<template lang="pug">
  div.speed-box
    Button(v-if="buttonFlag" type="primary" @click="TimeHandler" style="margin-top: 80px;margin-left: 200px;") 选择时间
    div(v-else)
      Button( type="primary" @click="TimeHandler" style="margin-left: 200px;margin-bottom: 20px;") 重选时间
      div(style="margin-top:10px")
        div(style="position: absolute;margin-top: -9px;font-size: 15px;") 时:
        Slider( v-model="valueh" :min="0" :max="24" style="margin-left: 29px;" :tip-format="formatHour")
      div
        div(style="position: absolute;margin-top: -9px;font-size: 15px;") 分:
        Slider( v-model="valuem" :min="0" :max="60" style="margin-left: 29px;" :tip-format="formatMinute")
      div
        div(style="position: absolute;margin-top: -9px;font-size: 15px;") 秒:
        Slider( v-model="values" :min="0" :max="60" style="margin-left: 29px;" :tip-format="formatSecond")
      div(style="font-size:1rem;margin-top: 20px;text-align:center") {{ formatDateValue(valueh,valuem,values)}}
    time-select(ref="timeSelect" :dates="dates" :modelId="modelId" @close="closeHandler" @selectHandler="selectHandler")
</template>
<script>
import moment from "moment";
import timeSelect from "./calender/mainTime";
import api from "store/search/api/index.js";
export default {
  components: { timeSelect },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      modelId: false,
      buttonFlag: true,
      valueh: 0,
      valuem: 0,
      values: 0,
      date: null,
      dates: null,
      speeds: [],
    };
  },
  methods: {
    async TimeHandler() {
      this.value = 0;
      this.speeds = [];
      this.valueh= 0;
      this.valuem= 0;
      this.values= 0;
      let response = await api.loadTime(this.item.wayid);
      if (response.status === 200) {
        this.dates = response.data;
      }
      this.modelId = true;
    },
    closeHandler() {
      this.modelId = false;
    },
    async selectHandler(date) {
      this.date = date;
      let selectMonth = this.date.getMonth() + 1;
      let select =
      this.date.getFullYear() + "-" + selectMonth + "-" + this.date.getDate();
      const response = await api.loadSpeed(this.item.wayid, select);
      if (response.status === 200) {
        this.speeds = response.data;
      }
      this.buttonFlag = false;
    },
    formatHour(val) {
      return "小时：" + val;
    },
    formatMinute(val) {
      return "分钟：" + val;
    },
    formatSecond(val) {
      return "秒数" + val;
    },
    formatDateValue(valueh, valuem, values) {
      valueh = valueh < 10 ? "0" + valueh : valueh;
      valuem = valuem < 10 ? "0" + valuem : valuem;
      values = values < 10 ? "0" + values : values;
      const selectYear = this.date.getFullYear();
      const selectMonth = this.date.getMonth() + 1;
      const selectDay = this.date.getDate();
      const currentTime = selectYear + "-" + selectMonth +  "-" +selectDay + " " + valueh +  ":" +valuem +":" + values;
    let speed = this.findRecentTime(this.speeds,currentTime);
      if (speed !=null) {
        if (moment(speed.dtime)===moment(currentTime)){
          return '时间:'+currentTime+';速度:'+speed.speed;
        }
         const format = "YYYY-MM-DD HH:mm:ss";
         let prev = moment(speed.dtime).format(format);
        return '时间:'+ prev+"-"+currentTime+';速度:'+speed.speed;
      }
      return '时间'+currentTime+';速度:'+0;
    },
   findRecentTime(speeds, date) {
      let RecentPrev = null;
      let deviation = null;
      _.each(speeds, item => {
        if (moment(item.dtime) <= moment(date)) {
          if (deviation === null) {
            deviation = moment(date) - moment(item.dtime);
            RecentPrev = item;
          }
          if (moment(date) - moment(item.dtime) < deviation) {
            deviation = moment(date) - moment(item.dtime);
            RecentPrev = item;
          }
        }
      });
      return RecentPrev;
    }
  }
};
</script>
<style lang="less" scoped>
.speed-box {
  height: 200px;
}
</style>
