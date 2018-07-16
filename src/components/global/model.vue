<template lang="pug">
Modal(v-model="modal6" :transfer="false"
        title="过往历史速度"
        :loading="loading"
        @on-ok="asyncOK" @on-cancel="asyncOK")
  timeline(ref="timeline")
</template>
<script>
import timeline from "./Time"
    export default {
      components: {timeline},
        props:{
          modelId:Boolean
        },
        data () {
            return {
                modal6: false,
                loading: true
            }
        },
        watch: {
           modelId(nv){

             this.modal6 = nv;
           }
        },

        methods: {
            asyncOK () {
                    this.$refs.timeline.buttonFlag= true;
                    this.$refs.timeline.value = 0;
                    this.$emit("close", this.modelId);
                    this.modal6 = false;

            }
        }
    }
</script>
