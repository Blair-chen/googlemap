<template lang="pug">
  div.speed-box
    Button(v-if="buttonFlag" type="primary" @click="TimeHandler" style="margin-top: 80px;margin-left: 200px;") 选择时间
    div(v-else)
      Button( type="primary" @click="TimeHandler" style="margin-left: 200px;margin-bottom: 20px;") 重选时间
      Slider( v-model="value" :min="0" :max="1440" style="margin-top: 60px;" :tip-format="format")
      div.showing-box {{ formatDateValue(value)}}
    Spin.ivu-spin-table(size="large"  v-if="loading" fix)
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
      value: 0,
      date: null,
      dates: null,
      speeds: [],
      loading :false
    };
  },
  methods: {
    async TimeHandler() {
      this.value = 0;
      this.speeds = [];
      this.value = 0;
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
       this.buttonFlag = false;
      this.loading =true;
      this.date = date;
      let format = "YYYY-MM-DD";

      let select = moment(date).format(format);

      const response = await api.loadSpeed(this.item.wayid, select);
      if (response.status === 200) {
        this.speeds = response.data;
      }
      this.loading =false;
    },
    format(){
      let currentTime = this.getCurrentTime();
      let speed = this.binSearch(this.speeds,  0,this.speeds.length - 1,currentTime);
      if (speed != null) {
          return "时间:" + currentTime + ";速度:" + speed.speed;
      }
      return "时间" + currentTime + ";速度:" + 0;
    },
    formatDateValue() {
      let currentTime = this.getCurrentTime();
        let speed = this.binSearch(this.speeds,  0,this.speeds.length - 1,currentTime);
      if (speed != null) {
        if (moment(speed.dtimeStr).isSame(currentTime)) {
          return "时间:" + currentTime + ";速度:" + speed.speed;
        }
        const format = "YYYY-MM-DD HH:mm";
        let prev = moment(speed.dtime).format(format);
        return "时间:" + prev + "-" + currentTime + ";速度:" + speed.speed;
      }
      return "时间" + currentTime + ";速度:" + 0;
    },
    getCurrentTime() {
      let value = this.value;
      let hour =
        parseInt(value / 60) < 10
          ? "0" + parseInt(value / 60)
          : parseInt(value / 60);
      let minute =
        parseInt(value % 60) < 10
          ? "0" + parseInt(value % 60)
          : parseInt(value % 60);
      const selectYear = this.date.getFullYear();
      const selectMonth = this.date.getMonth() + 1;
      const selectDay = this.date.getDate();
      const currentTime =  selectYear +  "-" +  selectMonth +   "-" +  selectDay +   " " +   hour +  ":" +  minute;

      return currentTime;
    },
    //Get current speed or recent speed
    binSearch(arr, start, end, key) {
      if (start < 0 || end < 0) {
        return null;
      }
      let mid = parseInt((end - start) / 2) + start;
      let midValue = arr[mid];
      if (moment(midValue.dtimeStr).isSame(key)) {
        return arr[mid];
      }
      if (start >= end) {
        return arr[start - 1];
      } else if (moment(key) > moment(midValue.dtimeStr)) {
        return this.binSearch(arr, mid + 1, end, key);
      } else if (moment(key) < moment(midValue.dtimeStr)) {
        return this.binSearch(arr, start, mid - 1, key);
      }
      return null;
    }
  }
};
</script>
<style lang="less" scoped>
.speed-box {
  height: 200px;
  .time-box {
    position: absolute;
    margin-top: -9px;
    font-size: 15px;
  }
  .showing-box {
    font-size: 1rem;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
