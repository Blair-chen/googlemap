<template lang="pug">
div.report-box
  div.report-detail
    div.tip-list(style="height:0px")
      h3(style="  text-align: center; margin-top: 15px;") Data source analysis
    formReport.detail-table(ref="formReport" :data="model")
    Table.table-box(:columns="columns1" :data="data1")
    Icon.icon-box(type="ios-arrow-forward" style=" margin-left: 10px;")
    div.tip-list.mt5
      h3(style="  text-align: center") Road color
      p(style="font-size:15px") 1,Red is autonavi and palmgo has different traffic_level
      p(style="font-size:15px") 1,Green is in autonavi but not in palmgo
      p(style="font-size:15px") 1,Blue is in palmgo but not in autonavi
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
      columns1:[{
        title: 'Type',
        key: 'name',
        width: 180,
        fixed: 'left'
      },{
        title:'Zero',
        key:'functionClassZero',
         width: 100,
      },{
        title:'One',
        key:'functionClassOne',
         width: 100,
      },{
        title:'Two',
        key:'functionClassTwo',
         width: 100,
      },{
        key:'functionClassThree',
        title:'Three',
         width: 100,
      },{
        title:'Four',
        key:'functionClassFour',
         width: 100,
      },{
        title:'total',
        key:'total',
        width:100
      }
      ],
      data1:[]
    };
  },
  watch:{
    data(nv){
      if(nv){
        this.model = nv;
        _.each(nv.functionClasslist,item=>{

          item.total = item.functionClassZero+item.functionClassOne+item.functionClassTwo+item.functionClassThree+item.functionClassFour;
        });
        this.data1 = nv.functionClasslist;

      }
    }
  }
};
</script>
<style lang="less" scoped>
.report-box {
  margin-top: 50px;
  position: absolute;
  .report-detail {
    position: absolute;
    height: 650px;
    background-color: white;
    width: 20px;
    cursor: pointer;
    transition: width 0.2s;
    -moz-transition: width 0.2s; /* Firefox 4 */
    -webkit-transition: width 0.2s; /* Safari and Chrome */
    -o-transition: width 0.2s; /* Opera */
    &:hover {
      width: 450px;
      .icon-box {
        display: none;
      }
      .detail-table {
        display: block;
      }
      .table-box {
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
    .table-box{
       width: 400px;
      display: none;
    }
    .detail-table {
      margin-top: 20px;
      display: none;
      margin-bottom: 20px;
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


