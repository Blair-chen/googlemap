<template lang="pug">
Modal(v-model="modal" :transfer="false"  :width="850" title="Time selector " :loading="loading"
      @on-ok="asyncOK" @on-cancel="asyncOK")
  time-calender(ref="timeline" :dates="dates" @selectHandler="selectHandler")
</template>
<script>
import timeCalender from "./main";
export default {
  components: { timeCalender },
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
    }
  },
  methods: {
    selectHandler(date) {
      this.$emit("selectHandler", date);
      this.asyncOK();
    },
    asyncOK() {
      this.$refs.timeline.reset();
      this.$emit("close", this.modelId);
      this.modal = false;
    }
  }
};
</script>

