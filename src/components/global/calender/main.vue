<template lang="pug">
 div.xtpz-gzr
      div.clearfix.px3.pt2(slot="top1")
        div.right(style="margin-left: 10px;margin-top: 10px;")
          Date-picker.mr1.inline-block(type="year" v-model="year" :clearable="false" placeholder="选择年份" style="width:80px")
          Button-group
            Button(@click="isNext=false")
              Icon.mr1(type="chevron-left")
              span 上半年
            Button(@click="isNext=true")
              span 下半年
              Icon.ml1(type="chevron-right")
      div.px2.absolute.pos-fit.overflow-auto
        Row.p2.mb2(:gutter="16" style="height:45%;min-height:50px" v-for="(item,index) in monthDates" :key="index")
          Col.h-100p(span="8" v-for="(date,index) in item" :key="index")
            calendar(:date="date" @on-add="addHandler"  @on-cancel="cancelhandler" @selectHandler="selectHandler")
</template>

<script>
import calendar from './calendar';
import _ from 'lodash';

export default {
  components: {
    calendar
  },
  created() {
    this.get();
  },
  data() {
    return {
      year: new Date(),
      isNext: new Date().getMonth() > 5
    };
  },
  watch: {
    year() {
      this.get();
    }
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
      console.log(_.chunk(dates, 3))
      return _.chunk(dates, 3);
    },
  },
  methods: {
    selectHandler(date) {
      this.$emit("selectHandler",date);
    },
    get() {
     // this.$store.dispatch(GET, this.year.getFullYear());
    },
    async addHandler(model) {
     // await this.$store.dispatch(SAVE, model);
      //this.get();
    },
    async cancelhandler(rq) {
     // await this.$store.dispatch(REMOVE, rq);
      this.get();
    }
  }
};
</script>

<style lang="less">
.xtpz-gzr {

}
</style>
