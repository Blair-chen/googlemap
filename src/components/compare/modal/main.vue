<template lang="pug">
  Modal(v-model="modal" :transfer="false" :width="500"
        title="选择数据来源"
        :loading="loading"
        @on-ok="asyncOK" @on-cancel="asyncOK")
    check-box(ref="checkBox")
</template>
<script>
import checkBox from './checkBox'
export default {
  components:{
    checkBox
  },
  props:{
    modelId:Boolean,
    item:{
      type:Object
    }
  },
   data () {
    return {
      data:false,
        modal: false,
        loading: true
    }
  },
  watch: {
    modelId(nv){
      this.modal = nv;
    }
  },
  methods: {
    asyncOK () {
     this.emitHandler();
     this.data = true
      this.modal = false;
    },
    asyncCancle(){
     this.emitHandler();
      this.modal = false;
    },
    emitHandler(){
      this.$emit('cilckHandler',this.data);
    }
  }
}
</script>
<style lang="less" scoped>

</style>
