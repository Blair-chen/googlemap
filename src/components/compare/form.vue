<template lang="pug">
  div.table-report-box
    table
      thead
       th Type
       th Count
      tbody
        tr(span="24" v-for="(item,index) in itemCount" :key="index")
          td.span-item-count(style="width:250px") {{index}}
          td.span-item-count(style="width:140px") {{item}}



</template>
<script>
import _ from "lodash";
export default {
  props:{
    data:Object
  },
  data(){
    return {

      itemCount:{ },
      inOrNotItemCount:{}
    }
  },

  watch:{
    data(nv){
      let itemCount={};let inOrNotItemCount={};
      if(nv){
        _.each(nv,(item,index)=>{
         if( _.endsWith(index, "Count")){
          itemCount[index] = item;
         }
        });
      }
     this.itemCount = itemCount;
    }
  }
}
</script>

<style lang="less">
.table-report-box{
  margin-top: 35px;
  width: 450px;

table, th, td {
    border: 0.5px solid #ccc;
    border-collapse: collapse;
    height: 25px
}

  .span-item-count{
    text-align: center;
    font-size: 15px;
    margin-top: 20px
  }
}
</style>
