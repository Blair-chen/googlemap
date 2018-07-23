<template lang="pug">
Modal(v-model="modal" :transfer="false" :width="500"
        title="过往历史速度"
        :loading="loading"
        @on-ok="asyncOK" @on-cancel="asyncOK")
  timeline(ref="timeline" :item="item")
</template>
<script>
import timeline from "./Time"
    export default {
      components: {timeline},
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
                    this.$refs.timeline.buttonFlag= true;
                    this.$refs.timeline.value = 0;
                    this.$emit("close", this.modelId);
                    this.modal = false;

            }
        }
    }
</script>
