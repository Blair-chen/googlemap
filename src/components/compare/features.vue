<template lang="pug">
div.features-box
  Select(v-model="model" @on-change="modelChange" filterable)
    Option(v-for="item in list" :value="item.value" :key="item.value") {{item.label}}

</template>
<script>
export default {

  data(){
    return {
      model:'differentLevel',
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
  margin-left: 400px;
  margin-top: 10px;
 width:200px;
 text-align: center
}

</style>

