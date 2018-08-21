<template lang="pug">
  div.login
    div.all-box
      div.compare-source-box(@click="ClickHandler('search')")
        span.span-box Traffic replay
      div.compare-source-box(@click="ClickHandler('compare')")
        span.span-box  Resource compare

</template>


<script>
import ss from "../../assets/first.png";
export default {

  methods: {
    ClickHandler(value) {
      this.$router.push("/" + value);
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 1500px;
  height: 800px;
  background-image: url("../../assets/first.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  .all-box {
    position: absolute;
    display: block;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .compare-source-box {
      cursor: pointer;
      &:hover {
        background-color: #08ad19;
      }
      text-align: center;
      margin-top: 6px;
      width: 200px;
      height: 50px;
      background-color: aqua;
      border-radius: 25px;
      .span-box{
        position: absolute;
        margin-top: 14px;
        margin-left: -40px;
        font-size:15px
      }
    }
  }
}
</style>
