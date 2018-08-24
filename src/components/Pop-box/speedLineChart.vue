<template lang="pug">
div.spped-chart-box
  div.vchart-box
    ve-line.ml3(:data="chartData" :settings="chartSettings")
  div.time-change-box
    div(style="text-align:center;font-size:15px")
      span(style="text-align:center") Please slide slider to select start and end time
    Slider(v-model="value" :min="0" :max="1440" :step="inputValue" range show-input :tip-format="format")
    span(style="margin-left:150px;width:100px") Time Interval
    InputNumber( :min="3" v-model="inputValue" placeholder="time" clearable style="width: 50px;margin-left:10px")
    span(style="margin-left:10px;width:100px") minutes
  Button( type="primary" @click="TimeHandler" style="margin-top:30px;margin-left: 430px;margin-bottom: 20px;") Re-election time
</template>
<script>
import moment from "moment";
export default {
  props:{
    date:String,
    speeds:Array
  },
  data() {
    this.chartSettings = {
      xAxisType: "time"
    };
    return {
      inputValue: 5,
      value: [0, 1440],
      chartData: {
        columns: ["Time", "Speed"],
        rows: []
      }
    };
  },
  mounted() {
    this.chartData.rows = this.dates;
  },
  watch: {
    dates(nv) {
      this.chartData.rows = nv;
    }
  },
  computed: {
    dates() {
      let value = this.value;
      let count = parseInt((value[1] - value[0]) / this.inputValue);
      if(count<=0){
        return [];
      }
      return _.map(new Array(count), (item, index) => {
        let hour =
          parseInt((value[0] + index * this.inputValue) / 60) >= 10
            ? parseInt((value[0] + index * this.inputValue) / 60)
            : "0" + parseInt((value[0] + index * this.inputValue) / 60);
        let minute =
          (value[0] + index * this.inputValue) % 60 >= 10
            ? (value[0] + index * this.inputValue) % 60
            : "0" + (value[0] + index * this.inputValue) % 60;
        const time = this.date + " " + hour + ":" + minute;

        const speed=this.binSearch(this.speeds,0,this.speeds.length-1,time);
        return { Time: time, Speed:speed!=null?speed.speed:null };
      });
    }
  },
  methods: {
    format() {
      return this.getCurrentTime();
    },
    getCurrentTime() {
      let value = this.value;
      let bhour =
        parseInt(value[0] / 60) < 10
          ? "0" + parseInt(value[0] / 60)
          : parseInt(value[0] / 60);
      let bminute =
        parseInt(value[0] % 60) < 10
          ? "0" + parseInt(value[0] % 60)
          : parseInt(value[0] % 60);
      let lhour =
        parseInt(value[1] / 60) < 10
          ? "0" + parseInt(value[0] / 60)
          : parseInt(value[1] / 60);
      let lminute =
        parseInt(value[1] % 60) < 10
          ? "0" + parseInt(value[0] % 60)
          : parseInt(value[1] % 60);
      const format = "YYYY-MM-DD";
      let selectTime = moment(this.date).format(format);
      const currentTime = selectTime +  " " + bhour +  ":" +  bminute + "-" +  selectTime + " " +  lhour +  ":" +  lminute;
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
      if (start >= end&&start>0) {
       const intime = moment.duration(moment(key) - moment(arr[start].dtimeStr), 'ms');
        if(intime.asMinutes()<this.inputValue){
          return arr[start - 1];
        }
      } else if (moment(key) > moment(midValue.dtimeStr)) {
        return this.binSearch(arr, mid + 1, end, key);
      } else if (moment(key) < moment(midValue.dtimeStr)) {
        return this.binSearch(arr, start, mid - 1, key);
      }
      return null;
    },
    TimeHandler(){
       this.$emit("TimeHandler");
    }
  }
};
</script>
<style lang="less" scoped>
.spped-chart-box{
width: 1000px;
height:600px;

.vchart-box {
  margin-top: 10px;
  width: 900px;
  height: 400px;
  left: 50%;
  -webkit-transform: translate(-50%, 0%);
  -moz-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  -o-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  position: relative;
}
.time-change-box {
  width: 50%;

  position: absolute;
  top: 10%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: relative;
}
}
</style>
