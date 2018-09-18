<template lang="pug">
div.spped-chart-box
  div.vchart-box
    ve-line.ml3(ref="chart" :data="chartData" :settings="chartSettings")
  div.time-change-box
    div.span-title
      span(style="text-align:center") Please slide slider to select start and end time
    Slider(v-model="value" :min="0" :max="1439" @on-change="createDatesByStartTimeAndEndTime" :step="1" range show-input :tip-format="topIndex")
    div.time-picker-box
      span.span-time-box Start Time
      TimePicker.time-select-box(v-model="startTime" @on-change="startTimeHandler" format="HH:mm" placeholder="Select time" )
      span.span-time-box End Time
      TimePicker.time-select-box(v-model="endTime" @on-change="endTimeHandler" format="HH:mm" placeholder="Select time" )
  Button.re-button( type="primary" @click="TimeHandler" ) Re-election time
</template>
<script>
import moment from "moment";
export default {
  props: {
    date: String,
    speeds: Array
  },
  data() {
    this.chartSettings = {
      xAxisType: "time"
    };
    return {
      startTime: "00:00",
      endTime: "23:59",
      format:"YYYY-MM-DD",
      dates:[],
      value: [0, 1439],
      chartData: {
        columns: ["Time", "Speed"],
        rows: []
      }
    };
  },
  mounted() {
    this.createDatesByStartTimeAndEndTime();

  },
  watch: {
    value(nv) {
      if (nv) {
        this.startTime = this.translateTime(nv[0]);
        this.endTime = this.translateTime(nv[1]);
      }
    },
    speeds(nv){
      this.createDatesByStartTimeAndEndTime();
    }
  },
  methods: {
    createDatesByStartTimeAndEndTime(){
      let value = this.value;
      let count = parseInt((value[1] - value[0]) );
      if (count <= 0) {
        return [];
      }
     const dates =  _.map(new Array(count), (item, index) => {
        let hour =
          parseInt((value[0] + index) / 60) >= 10
            ? parseInt((value[0] + index ) / 60)
            : "0" + parseInt((value[0] + index ) / 60);
        let minute =
          (value[0] + index ) % 60 >= 10
            ? (value[0] + index) % 60
            : "0" + (value[0] + index ) % 60;
        const time = this.date + " " + hour + ":" + minute;
        const speed = this.binSearch( this.speeds, 0,  this.speeds.length - 1,  time );
        return { Time: time, Speed: speed != null ? speed.speed : null };
      });
      const newchardata={
        columns: this.chartData.columns,
        rows:dates
      }
      this.chartData = _.cloneDeep(newchardata);
    },
    endTimeHandler() {
      const time = moment(moment(this.date).format(this.format) + " " + this.endTime);
      const value = [this.value[0], time.hours() * 60 +time.minute()];
      this.value = value;
      this.createDatesByStartTimeAndEndTime();
    },
    startTimeHandler() {
      const time = moment(moment(this.date).format(this.format) + " " + this.startTime);
      const value = [time.hours() * 60 +time.minute(), this.value[1]];
      this.value = value;
      this.createDatesByStartTimeAndEndTime();
    },
    topIndex() {
      return this.getCurrentTime();
    },
    getCurrentTime() {
      const value = this.value;
      const startTime = this.translateTime(value[0]);
      const endTime = this.translateTime(value[1]);
      let selectTime = moment(this.date).format(this.format);
      return  selectTime + " " + startTime + "-" + selectTime + " " + endTime;
    },
    translateTime(value) {
      let bhour =
        parseInt(value / 60) < 10
          ? "0" + parseInt(value / 60)
          : parseInt(value / 60);
      let bminute =
        parseInt(value % 60) < 10
          ? "0" + parseInt(value % 60)
          : parseInt(value % 60);
      return bhour + ":" + bminute;
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
      if (start >= end && start > 0) {
        const intime = moment.duration(
          moment(key) - moment(arr[start].dtimeStr),
          "ms"
        );
        if (intime.asMinutes() < 1) {
          return arr[start - 1];
        }
      } else if (moment(key) > moment(midValue.dtimeStr)) {
        return this.binSearch(arr, mid + 1, end, key);
      } else if (moment(key) < moment(midValue.dtimeStr)) {
        return this.binSearch(arr, start, mid - 1, key);
      }
      return null;
    },
    TimeHandler() {
      this.dates = [];
      this.value = [0, 1439];
      this.$emit("TimeHandler");
    },
    //time bin
    binSearchTimeBin(arr, start, end, key) {
      if (start < 0 || end < 0) {
        return null;
      }
      let mid = parseInt((end - start) / 2) + start;
      let midValue = arr[mid];
      if (moment(midValue.dtimeStart).isSame(key)||moment(midValue.dtimeEnd).isSame(key)
      ||moment(key).isBetween(midValue.dtimeStart, midValue.dtimeEnd)) {
        return arr[mid];
      } else if (moment(key) > moment(midValue.dtimeEnd)) {
        return this.binSearch(arr, mid + 1, end, key);
      } else if (moment(key) < moment(midValue.dtimeStart)) {
        return this.binSearch(arr, start, mid - 1, key);
      }
      return null;
    },

  }
};
</script>
<style lang="less" scoped>
.spped-chart-box {
  width: 1000px;
  height: 600px;

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
    .span-title {
      text-align: center;
      font-size: 15px;
    }
    .time-picker-box {
      margin-bottom: 5px;
      .time-select-box {
        width: 112px;
        margin-left: 10px;
      }
      .span-time-box {
        margin-left: 20px;
        width: 100px;
      }
    }
  }
  .re-button {
    margin-top: 30px;
    margin-left: 430px;
    margin-bottom: 20px;
  }
}
</style>
