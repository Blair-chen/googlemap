<template lang="pug">
  div.history
    date-picker( :open="open" :value="date" confirm type="date"   @on-change="handleChange" @on-clear="handleClear"  @on-ok="handleOk")
      a( href="javascript:void(0)" @click="handleClick")
        icon.icon-date( type="ios-calendar-outline")
        div.selected-date {{ date }} {{time}}
    Slider.slider-history(:min=0 :max=1440 v-model="slider" :tip-format="format" @on-change="changeSlider")
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      open: false,
      date: "",
      slider: 0,
      time: ""
    };
  },
  mounted() {
    const format = "YYYY-MM-DD";
    this.date = moment(new Date()).format(format);
  },
  methods: {
    handleClick() {
      this.open = !this.open;
    },
    handleChange(date) {
      this.time = "00:00";
      this.slider = 0;
      this.date = date;
    },
    handleClear() {
      this.open = false;
    },
    handleOk() {
      this.open = false;
    },
    format() {
      this.time = this.translateTime(this.slider);
      return this.time;
    },
    changeSlider() {
      this.$emit("changeHistoryTime", this.date + " " + this.time);
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
    }
  }
};
</script>
<style lang="less" scoped>
.history {
  margin-left: 73%;
  margin-top: 5%;
  height: 50px;
  width: 20%;
  position: absolute;
  background-color:#f2f4f4;
  box-shadow: 1px 1px 5px #888888;
  .slider-history {
    width: 95%;
    margin-left: 6px;
    margin-top: -10px
  }
  .icon-date {
    margin-left: 100px;
    float: left;
    margin-top: 0px;
  }
  .selected-date {
    margin-top: 10px;
    width: 200px;
    margin-left: 100px;
  }
}
</style>

