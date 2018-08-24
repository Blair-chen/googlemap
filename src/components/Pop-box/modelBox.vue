<template lang="pug">
  div.speed-box(style="height:buttonFlag?400px:800px")
    Button(v-if="buttonFlag" type="primary" @click="TimeHandler" style="margin-top: 80px; margin-bottom: 100px;margin-left: 450px;") Select time
    div(v-else)
      chart-speed(ref="chart" :date="date" :speeds="speeds" @TimeHandler="TimeHandler")
    Spin.ivu-spin-table(size="large"  v-if="loading" fix)
    time-select(ref="timeSelect" :dates="dates" :modelId="modelId" @close="closeHandler" @selectHandler="selectHandler")
</template>
<script>
import chartSpeed from "./speedLineChart";
import moment from "moment";
import timeSelect from "./calender/mainTime";
import api from "store/search/api/index.js";
export default {
  components: { timeSelect ,chartSpeed},
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
    //select Time
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
      if(date===this.dat){
        this.buttonFlag = false;
      }
      this.loading =true;
      const format = "YYYY-MM-DD";
      this.date = moment(date).format(format);
      this.dates=[];
      let select = moment(date).format(format);
      const response = await api.loadSpeed(this.item.wayid, select);
      if (response.status === 200) {
        this.speeds = response.data;
        this.buttonFlag = false;
        this.loading =false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.speed-box {
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
