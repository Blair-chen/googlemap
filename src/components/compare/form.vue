<template lang="pug">
  div.table-report-box
    Form.report-box.pr1(ref="form"  :model="model" :labelWidth="90" labelPosition='right')
      Row
        Col(span='12')
          Form-item(label="Autonavi Count" prop="autonaviCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.autonaviCount" placeholder='autonaviCount' :maxlength="20")
        Col(span='12')
          Form-item(label="Palmgo Count" prop="palmgoCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.palmgoCount" placeholder='palmgoCount' :maxlength="20")
      Row
        Col(span='12')
          Form-item(label="different Level Count" prop="differentLevelCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.differentLevelCount" placeholder='differentLevelCount' :maxlength="20")
        Col(span='12')
          Form-item(label="different Speed Count" prop="differentSpeedCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.differentSpeedCount" placeholder='differentSpeedCount' :maxlength="20")
      Row
        Col(span='24')
          Form-item(label="inPalmgoButNotInAutoNavi" :label-width=150  prop="inPalmgoButNotInAutoNavi" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.inPalmgoButNotInAutoNavi" placeholder='inPalmgoButNotInAutoNavi' :maxlength="20")
      Row
        Col(span='24')
          Form-item(label="inAutoNaviButNotInPalmgo" :label-width=150 prop="inAutoNaviButNotInPalmgo" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.inAutoNaviButNotInPalmgo" placeholder='inAutoNaviButNotInPalmgo' :maxlength="20")
      Row
        Col(span='24')
          Form-item(label="same" prop="same" :label-width=150 )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.same" placeholder='palmgoCount' :maxlength="20")
</template>
<script>
export default {
  props:{
    data:Object
  },
  data(){
    return {
      model:{ }
    }
  },
  watch:{
    data(nv){
      this.model = nv;
    }
  }
}
</script>

<style lang="less">
.table-report-box{
  margin-top: 35px;
  width: 395px
}
</style>
