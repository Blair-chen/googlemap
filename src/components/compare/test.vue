<template lang="pug">
  div.csdjhe-form
    Form.csdjsh-Form.pr1(ref="form"  :model="model" :labelWidth="90" labelPosition='right')
      Form-item(label="审核人" prop="shryxm")
        Input(type="text" v-model="model.shryxm" placeholder='请输入审核人' :maxlength="20")

</template>
<script>
export default {
  data(){
    return {
      model:{
        shryxm:'dswd'
      }
    }
  }
}
</script>

<style lang="less">

</style>
