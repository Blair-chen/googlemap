<template lang="pug">
Modal(v-model="modal6" :transfer="false"  :width="850" title="时间选择器" :loading="loading"
      @on-ok="asyncOK" @on-cancel="asyncOK")
  timeline(ref="timeline" @selectHandler="selectHandler")
</template>
<script>
import timeline from "./main";
export default {
  components: { timeline },
  props: {
    modelId: Boolean
  },
  data() {
    return {
      modal6: false,
      loading: true
    };
  },
  watch: {
    modelId(nv) {
      this.modal6 = nv;
    }
  },
  methods: {
    selectHandler(date) {
      this.$emit("selectHandler", date);
      this.asyncOK();
    },
    asyncOK() {
      this.$emit("close", this.modelId);
      this.modal6 = false;
    }
  }
};
</script>

