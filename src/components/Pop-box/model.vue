<template lang="pug">
Modal(v-model="modal" :transfer="false" :width="500"
        title="traffic reply"
        :loading="loading"
        @on-ok="asyncOK" @on-cancel="asyncOK")
  model-box(ref="modelBox" :item="item")
</template>
<script>
import modelBox from "./modelBox"
export default {
  components: {modelBox},
  props:{
    modelId:Boolean,
    item:{
      type:Object
    }
  },
  data () {
    return {
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
      this.$refs.modelBox.buttonFlag= true;
      this.$refs.modelBox.value = 0;
      this.$emit("close", this.modelId);
      this.modal = false;
    }
  }
}
</script>
