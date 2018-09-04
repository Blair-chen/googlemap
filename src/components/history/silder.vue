<template lang="pug">
  div.history
    date-picker( :open="open" :value="date" confirm type="date"   @on-change="handleChange" @on-clear="handleClear"  @on-ok="handleOk")
      a( href="javascript:void(0)" @click="handleClick")
        icon(style="margin-left:300px;float:left" type="ios-calendar-outline")
        div(style="width:200px;margin-left:300px") {{ date }} {{time}}
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
  mounted(){
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
    changeSlider(){
      this.$emit("changeHistoryTime",this.date+" "+this.time);
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
  margin-left: 25%;
  margin-top: 40%;
  height: 70px;
  width: 50%;
  position: absolute;
 background-color: white;
  .slider-history {
    width: 40
  }
}
</style>

