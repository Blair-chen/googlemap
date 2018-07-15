<template lang="pug">
Modal(v-model="modal6" :transfer="false"
        title="时间选择器"
        :loading="loading"
        @on-ok="asyncOK" @on-cancel="asyncOK")
  timeline(ref="timeline")
</template>
<script>
import timeline from "./main"
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

                    this.$emit("close", this.modelId);
                    this.modal6 = false;

            }
        }
    }
</script>

