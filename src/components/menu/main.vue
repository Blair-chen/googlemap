<template lang="pug">
div.menu-box
  Dropdown(style="margin-left: 88%;"   @on-click="ClickHandler" )
    Button(type="primary") switch
      Icon(type="ios-arrow-down")
    DropdownMenu(slot="list")
      DropdownItem(v-for="(item,index) in authMenus" :name="item.router" :key="index") {{ item.title }}

</template>
<script>
import _ from 'lodash';
export default {
  data(){
    return {
      hiddlen:false,
      authMenus:[
        {title:'Compare Resource',router:'compareView'},{title:'Traffic Reply',router:'searchView'}
      ]
    }
  },
  methods:{
    ClickHandler(router){
     this.$router.push('/'+router);
    }
  }
};
</script>

<style lang="less">
.menu-box{
 width: 100px;
    float: right;
    margin-right: 100px;
    margin-top: -2px;
}

</style>
