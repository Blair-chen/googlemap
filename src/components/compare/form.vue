<template lang="pug">
  div.table-report-box
    Form.report-box.pr1(ref="form"  :model="model" :labelWidth="90" labelPosition='right')
      Row
        Col(span='12')
          Form-item(label="Autonavi Count" prop="autonaviCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.autonaviCount" placeholder='autonaviCount' :maxlength="20")
        Col(span='12')
          Form-item(label="PalmgoTotal Count" prop="palmgoTotalCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.palmgoTotalCount" placeholder='palmgoTotalCount' :maxlength="20")
      Row
        Col(span='12')
          Form-item(label="PalmgoCurrent Count" prop="PalmgoCurrentCount")
            Input(type="text" style="text-align=center" :readonly="true" v-model="model.palmgoCurrentCount" placeholder="palmgoCurrentCount")
        Col(span='12')
          Form-item(label="sameCount" prop="sameCount"  )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.sameCount" placeholder='sameCount' :maxlength="20")
      Row
        Col(span='12')
          Form-item(label="different Level Count" prop="differentLevelCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.differentLevelCount" placeholder='differentLevelCount' :maxlength="20")
        Col(span='12')
          Form-item(label="different Speed Count" prop="differentSpeedCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.differentSpeedCount" placeholder='differentSpeedCount' :maxlength="20")
      Row
        Col(span='24')
          Form-item(label="inPalmgoButNotInAutoNavi Count" :label-width=180  prop="inPalmgoButNotInAutoNaviCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.inPalmgoButNotInAutoNaviCount" placeholder='inPalmgoButNotInAutoNaviCount' :maxlength="20")
      Row
        Col(span='24')
          Form-item(label="inAutoNaviButNotInPalmgo Count" :label-width=180 prop="inAutoNaviButNotInPalmgoCount" )
            Input(type="text" style="text-align:center" :readonly="true" v-model="model.inAutoNaviButNotInPalmgoCount" placeholder='inAutoNaviButNotInPalmgoCount' :maxlength="20")

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
