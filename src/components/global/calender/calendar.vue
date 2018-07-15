<template lang="pug">
  div.calendar.h-100p
    div.h2(style="font-size:1rem") {{month}}
    table.clendar-table
      colgroup
        col(v-for="n in 7" :width="100/7+'%'")
      thead
        th.py1(v-for="(item,index) in week" :class="{stress:index>=5}") {{item}}
      tbody
        tr(v-for="(row,index) in vdata")
          td.relative.calendar-cell(v-for="(date,index) in row" :class="{current:isCurrentMonth(date),stress:index>=5&&isCurrentMonth(date)}")
            div(@click="selectHandler(date)") {{date.getDate()}}
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import './calendar-converter';

export default {
  props: {
    date: {
      type: Date,
      default() {
        return new Date();
      }
    },
    initSettingData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      week: ['一', '二', '三', '四', '五', '六', '日'],
      settingData: this.initSettingData
    };
  },
  computed: {
    month() {
      return this.date.getMonth()+1 +"月"
    },
    vdata() {
      const lastDates = this.lastMonthDates;
      const currentDates = this.currentMonthDates;
      const nextDates = this.nextMonthDates;
      const weekDayOfFirstDay = this.mapDayToZhCN(_.first(currentDates).getDay());// 第一天是星期几
      const lastDayNeeds = _.takeRight(lastDates, weekDayOfFirstDay - 1);
      const weekDayofEndDay = this.mapDayToZhCN(_.last(currentDates).getDay());// 最后一天是星期几
      const nextDayNeeds = _.take(nextDates, 7 - weekDayofEndDay);

      let dates = lastDayNeeds.concat(currentDates).concat(nextDayNeeds);
      dates = _.map(dates, item => {
        item.setting = this.getSetting(item);
        return item;
      });

      return _.chunk(dates, 7);
    },
    currentMonthDates() {
      return this.getMonthDates(this.date);
    },
    lastMonthDates() {
      const lastMonth = moment(this.date).subtract(1, 'M').toDate();
      return this.getMonthDates(lastMonth);
    },
    nextMonthDates() {
      const nextMonth = moment(this.date).add(1, 'M').toDate();
      return this.getMonthDates(nextMonth);
    }
  },
  methods: {
    selectHandler(date){
      let selectYear = date.getFullYear();
      let selectMonth = date.getMonth();
      let selectDay = date.getDate();
      let select = selectYear+"年"+selectMonth+1+"月"+selectDay +"日"
    },
    // 获取一个月每天的一个数组
    getMonthDates(date) {
      const lastDay = moment(date).endOf('month').date();
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
    equalDate(date1, date2) {
      const format = 'YYYY-MM-DD';
      return moment(date1).format(format) === moment(date2).format(format);
    },
    getSetting(date) {
      return _.find(this.settingData, item => this.equalDate(date, item.rq));
    },
    isCurrentMonth(date) {
      return date.getMonth() === this.date.getMonth();
    },
    convertToLunar(date) {
      const converter = new window.CalendarConverter();
      const result = converter.solar2lunar(date);
      return result;
    },
    isWeekend(date) {
      const day = date.getDay();
      return day === 6 || day === 0;
    },
    formatLunar(result) {
      if (result.lunarFestival) {
        return result.lunarFestival;
      }
      if (result.solarTerms) {
        return result.solarTerms;
      }
      if (result.solarFestival) {
        return result.solarFestival;
      };
      if (result.lunarDay === '初一') {
        return (result.isLeap ? '闰' : '') + result.lunarMonth + '月';
      }
      return result.lunarDay;
    },
    settingHandler(date) {
      let setting = date.setting || {};
      if (_.isEmpty(setting)) {
        setting.sfjr = !this.isWeekend(date);
      } else {
        setting.sfjr = !setting.sfjr;
      }
      setting.rq = date;
      this.$emit('on-add', setting);
      this.settingData = _.unionBy(_.cloneDeep(this.settingData), [setting], item => {
        return moment(item.rq).format('YYYY-MM-DD');
      });
    },
    cancelHandler(date) {
      this.$emit('on-cancel', date);
      this.settingData = _.filter(_.cloneDeep(this.settingData), item => {
        return !this.equalDate(date, item.rq);
      });
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
      border: 1px solid #DDD;
      font-weight: bold;
    }
    th {
      border-bottom-width: 2px;
    }
    .stress {
      color: #e02d2d !important;
    }
    .calendar-cell {
      text-align: center;
      font-size: 1rem;
      color: #ccc;
      &:hover {
        .handler.current {
          height: 30px;
        }
      }
      &.current {
        color: #333;
        cursor: pointer;
      }
      .lunar {
        font-weight: normal;
        font-size: 1rem;
      }
      .tag {
        position: absolute;
        padding: 2px;
        top: 0;
        left: 0;
        font-size: 1rem;
        color: #FFF;
        font-weight: normal;
        background-color: #888;
        &.holiday {
          background-color: #e02d2d;
        }
      }
      .handler {
        position: absolute;
        bottom: 0;
        font-size: 1rem;
        color: #333;
        font-weight: normal;
        width: 100%;
        background-color: wheat;
        height: 0;
        overflow: hidden;
        line-height: 30px;
        transition: height 0.3s ease-out;
      }
    }
  }
}
</style>
