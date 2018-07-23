<template lang="pug">
Modal(v-model="modal" :transfer="false"  :width="850" title="时间选择器" :loading="loading"
      @on-ok="asyncOK" @on-cancel="asyncOK")
  timeline(ref="timeline" :dates="dates" @selectHandler="selectHandler")
</template>
<script>
import timeline from "./main";
export default {
  components: { timeline },
  props: {
    modelId: Boolean,
    dates:Array
  },
  data() {
    return {
      modal: false,
      loading: true
    };
  },
  watch: {
    modelId(nv) {
      this.modal = nv;
    },
  },
  methods: {
    selectHandler(date) {
      this.$emit("selectHandler", date);
      this.asyncOK();
    },
    asyncOK() {
      this.$emit("close", this.modelId);
      this.modal = false;
    }
  }
};
</script>

