<template lang="pug">
div.report-box
  div.report-detail
    div.tip-list(style="height:0px")
      h3(style="  text-align: center; margin-top: 15px;") 数据来源分析
    formReport.detail-table(ref="formReport" :data="model")
    Icon.icon-box(type="ios-arrow-forward" style=" margin-left: 10px;")
    div.tip-list.mt5
      h3(style="  text-align: center") 路段颜色
      p(style="font-size:15px") autonavi与palmgo的traffic_level不同显示红色。

</template>
<script>
import formReport from './form';
export default {
  components:{
    formReport
  },
  props:{
    data:Object
  },
  data() {
    return {
      model:{},
      isShowRight: true,

    };
  },
  watch:{
    data(nv){
      if(nv){
        this.model = nv;
      }
    }
  }
};
</script>
<style lang="less" scoped>
 .ivu-table .demo-table-info-cell-auto {
        text-align:right;
        background-color: #2db7f5;
    }
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
      width: 300px;
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


