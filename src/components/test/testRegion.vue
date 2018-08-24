<template lang="pug">
div
 nav-menu(ref="menu" :buttonFlag="true")
</template>
<script>
import navMenu from "../menu/regin"
export default {
 components: {

    navMenu,

  },
}
</script>
