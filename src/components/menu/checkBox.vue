<template lang="pug">
div(style="padding: 32px;")
  div(style="float:left;margin-top: 2px; margin-right: 15px;")
    checkbox( :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll") selectAll
  checkbox-group(v-model="checkAllGroup" @on-change="checkAllGroupChange")
    checkbox(v-for="(item,index) in data" :label="item.type" :key="index")

</template>
<script>
export default {
  props:{
    data:Array
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: []

    };
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["auto", "palm"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 2) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    reset(){
      this.indeterminate= true,
      this.checkAll= false,
      this.checkAllGroup= []
    }
  }
};
</script>
<style lang="less" scoped>
</style>
