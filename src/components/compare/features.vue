<template lang="pug">
div.features-box
  Select(v-model="model" @on-change="modelChange" filterable)
    Option(v-for="item in list" :value="item.value" :key="item.value") {{item.label}}

</template>
<script>
export default {
  props:{
    data:String
  },
  data(){
    return {
      model:this.data,
      list:[
        {
          value :'differentLevel',
          label: 'differentLevel'
        },{
          value : 'inSomethingButNotInOther',
          label:'inSomethingButNotInOther'
        }
      ]
    }
  },

  methods:{
    modelChange(){
      this.$emit("featuresHandler",this.model);
    }
  }
}
</script>
<style lang="less" scoped>
.features-box{
  position: absolute;
  width: 200px;
  margin-left: 5px;
  margin-top: 70px;
}

</style>

