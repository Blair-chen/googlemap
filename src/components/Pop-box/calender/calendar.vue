<template lang="pug">
  div.calendar.h-100p
    div.h2(style="font-size:1rem") {{month}}
    table.clendar-table
      colgroup
        col(v-for="n in 7" :width="100/7+'%'")
      thead
        th.py1(v-for="(item,index) in week" ) {{item}}
      tbody
        tr(v-for="(row,index) in vdata")
          td.relative.calendar-cell(v-for="(date,index) in row" )
            Tooltip(:content="getDate(date)" placement="bottom" size="small" v-if="isCurrentMonth(date)&&compareExistHandler(date)")
              div.current( @click="selectHandler(date)" ) {{date.getDate()}}
            div.lunar(v-if="isCurrentMonth(date)&&!compareExistHandler(date)" )  {{date.getDate()}}

</template>

<script>
import moment from "moment";
import _ from "lodash";
import "./calendar-converter";

export default {
  props: {
    date: {
      type: Date,
      default() {
        return new Date();
      }
    },
    dates: Array
  },

  data() {
    return {
      week: ["Mon", "Tues", "Wedne", "Thurs", "Fir", "Satur", "Sun"],
      MonthDates: []
    };
  },
  watch: {
    dates(nv) {
      if (nv.length > 0) {
        const format = "YYYY-MM";
        const month = moment(this.date).format(format);
        const vm = this;
        _.each(nv, item => {
          if (month === moment(item).format(format)) {
            vm.MonthDates.push(item);
          }
        });
      } else {
        this.MonthDates = [];
      }
    }
  },
  computed: {
    month() {
      return this.date.getMonth() + 1 + "月";
    },
    vdata() {
      const lastDates = this.lastMonthDates;
      const currentDates = this.currentMonthDates;
      const nextDates = this.nextMonthDates;
      const weekDayOfFirstDay = this.mapDayToZhCN(
        _.first(currentDates).getDay()
      );
      const lastDayNeeds = _.takeRight(lastDates, weekDayOfFirstDay - 1);
      const weekDayofEndDay = this.mapDayToZhCN(_.last(currentDates).getDay()); //week of last day
      const nextDayNeeds = _.take(nextDates, 7 - weekDayofEndDay);
      let dates = lastDayNeeds.concat(currentDates).concat(nextDayNeeds);

      return _.chunk(dates, 7);
    },
    currentMonthDates() {
      return this.getMonthDates(this.date);
    },
    lastMonthDates() {
      const lastMonth = moment(this.date)
        .subtract(1, "M")
        .toDate();
      return this.getMonthDates(lastMonth);
    },
    nextMonthDates() {
      const nextMonth = moment(this.date)
        .add(1, "M")
        .toDate();
      return this.getMonthDates(nextMonth);
    }
  },
  methods: {
    compareExistHandler(date) {
      const format = "YYYY-MM-DD";
      let strDate = moment(date).format(format);
      if (_.findIndex(this.MonthDates, item => strDate === item) === -1) {
        return false;
      }
      return true;
    },
    compareDate(date) {
      if (date > new Date()) {
        return true;
      }
      return false;
    },
    getDate(date) {
      let selectMonth = date.getMonth() + 1;
      return (
        date.getFullYear() + "-" + selectMonth + "-" + date.getDate()
      );
    },
    selectHandler(date) {
      this.MonthDates = [];
      this.$emit("selectHandler", date);
    },
    getMonthDates(date) {
      const lastDay = moment(date)
        .endOf("month")
        .date();
      const month = date.getMonth();
      const year = date.getFullYear();
      let calendar = _.map(new Array(lastDay), (item, index) => {
        return new Date(year, month, index + 1);
      });
      return calendar;
    },
    mapDayToZhCN(day) {
      if (day === 0) return 7;
      return day;
    },
    isCurrentMonth(date) {
      return date.getMonth() === this.date.getMonth();
    }
  }
};
</script>

<style lang="less">
.calendar {
  .clendar-table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    td,
    th {
      border: 1px solid #ddd;
      font-weight: bold;
    }
    th {
      border-bottom-width: 2px;
    }
    .calendar-cell {
      text-align: center;
      .current {
        text-align: center;
        width: 37px;
        height: 25px;
        display: inline-block;
        padding: 0.2rem 0.5rem;
        font-size: 0.8rem;
        color: black;
        cursor: pointer;
        &:hover {
          background-color: #ddd;
          color: red;
          .handler.current {
            height: 30px;
          }
        }
      }
      .lunar {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        text-align: center;
        width: 37px;
        height: 25px;
        font-weight: normal;
        font-size: 0.8rem;
        color: #888;
      }
    }
  }
}
</style>
