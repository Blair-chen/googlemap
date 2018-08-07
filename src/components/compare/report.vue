<template lang="pug">
div.report-box
  div.report-detail
    div.tip-list(style="height:0px")
      h3(style="  text-align: center; margin-top: 15px;") 数据来源分析
    Table.detail-table( style="" :columns="columns1" :data="data1")
    Icon.icon-box(type="ios-arrow-forward" style=" margin-left: 10px;")
    div.tip-list
      h3(style="  text-align: center") 路段颜色
      p(style="font-size:15px") 1,autonavi存在traffic palmgo不存在颜色为绿色，palmgo存在autonavi不存在显示蓝色。
      p(style="font-size:15px") 2,autonavi与palmgo的traffic_level不同显示红色。
      p(style="font-size:15px") 3,autonavi与palmgo速度相差超过20%显示黄色
</template>
<script>
export default {
  data() {
    return {
      isShowRight: true,
      columns1: [
        {
          title: "Type",
          key: "type",
          width: 100,
          fixed: 'left'
        },
        {
          title: "Coverage",
          key: "coverage",
          width: 100,

        },
          {
          title: "Speed",
          key: "speed",
          width: 100,

        },
          {
          title: "tp",
          key: "tp",
          width: 100,
        }
      ],
      data1: [
        {
          type: "高德",
          coverage: '50%'
        },
        {
          type: "gp",
          coverage: '50%'
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.report-box {
  position: absolute;
  .report-detail {
    position: absolute;
    height: 600px;
    background-color: white;
    width: 20px;
    cursor: pointer;
    transition: width 0.2s;
    -moz-transition: width 0.2s; /* Firefox 4 */
    -webkit-transition: width 0.2s; /* Safari and Chrome */
    -o-transition: width 0.2s; /* Opera */
    &:hover {
      width: 400px;
      .icon-box {
        display: none;
      }
      .detail-table {
        display: block;
      }
      .tip-list{
        display: block
      }
    }
    .icon-box {
      margin-top: 300px;
      font-size: 30px;
      cursor: pointer;
    }
    .detail-table {
      margin-top: 50px;
      display: none;
      width: 380px;
      margin-left: 10px;
      border-collapse: collapse;
      .caption {
        background: #686e7e;
        color: #fff;
      }
      &.small {
        td {
          padding: 5px;
        }
      }
    }
    .tip-list{
      margin-left: 10px;
      width: 90%;
      display: none
    }
  }
}
</style>


