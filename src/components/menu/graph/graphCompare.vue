<template lang="pug">
  div.regin-chose
    span(style="position: absolute; margin-top: 17px;width: 100%;text-align: center;font-size:20px") 地区选择
    div.regin-all-box
      div.regin-box(@click="onClickHandler")
        span.span-box 中国
      div.regin-box
        span.span-box 澳大利亚
      div.regin-box
        span.span-box 北美
      div.regin-box
        span.span-box 南美
      div.regin-box
        span.span-box 欧洲
      div.regin-box
        span.span-box 韩国
    model(ref="model" :modelId="modelId" @cilckHandler="clickHandler")
</template>
<script>
import model from "@/components/compare/modal/main";
export default {
  components: {
    model
  },
  data() {
    return {
      modelId: false
    };
  },
  methods: {
    onClickHandler() {
      this.modelId = true;
      // this.$router.push('/compareView');
    },
    clickHandler(data) {
      this.modelId = false;
      if (data) {
        this.$router.push("/compareView");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.regin-chose {
  width: 1400px;
  height: 700px;
  position: absolute;
  .regin-all-box {
    width: 45%;
    height: 50%;
    position: absolute;
    top: 30%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: relative;
    .regin-box {
      cursor: pointer;
      &:hover {
        background-color: #08ad19;
      }
      margin-top: 50px;
      margin-left: 10px;
      float: left;
      background-color: aqua;
      width: 300px;
      height: 150px;
      border-radius: 10px;
      .span-box {
        position: absolute;
        margin-top: 50px;
        text-align: center;
        margin-left: 140px;
        font-size: 20px;
      }
    }
  }
}
</style>
