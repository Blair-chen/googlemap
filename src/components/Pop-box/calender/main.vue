<template lang="pug">
div
  div.clearfix.px3.pt2(slot="top1")
    div.right(style="margin-left: 490px;margin-bottom: 10px;")
      Date-picker.mr1.inline-block(type="year" v-model="year" :clearable="false" placeholder="选择年份" style="width:80px")
      Button-group
        Button(@click="isNext=false")
          Icon.mr1(type="chevron-left")
          span First half year
        Button(@click="isNext=true")
          span Second half year
          Icon.ml1(type="chevron-right")
  div.px2.absolute.pos-fit.overflow-auto
    Row.p2.mb2(:gutter="16" style="height:45%;min-height:50px" v-for="(item,index) in monthDates" :key="index")
      Col.h-100p(span="8" v-for="(date,index) in item" :key="index")
        calendar(:date="date" :dates="dates" @selectHandler="selectHandler" )
</template>

<script>
import calendar from './calendar';
import _ from 'lodash';

export default {
  components: {
    calendar
  },
   props: {
    dates:Array
  },

  data() {
    return {
      year: new Date(),
      isNext: new Date().getMonth() > 5
    };
  },
  computed: {
    monthDates() {
      let startMonth = 1;
      if (this.isNext) {
        startMonth = 7;
      }
      let year = this.year.getFullYear();
      let dates = _.map(new Array(6), (item, index) => {
        return new Date(year, index + startMonth - 1, 1);
      });
      //_.chunk([1,2,3,4,5,6],2)=>[[1,2,3],[4,5,6]]
      return _.chunk(dates, 3);
    },
  },
  methods: {
    selectHandler(date) {
      this.$emit("selectHandler",date);
    },
    reset(){
      this.year = new Date(),
      this.isNext=new Date().getMonth() > 5
    }
  }
};
</script>

<style lang="less">

</style>
