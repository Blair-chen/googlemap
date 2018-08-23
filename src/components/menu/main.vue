<template lang="pug">
div.menu-box
  Dropdown(style="margin-left: 88%;margin-top:-5px"   @on-click="ClickHandler" )
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
        {title:'Compare Resource',router:'compare'},{title:'Traffic Reply',router:'search'}
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
  width: 100%
}
.user-pop {
  width: 100px;
  display: block;
  display: none;
  position: absolute;
  line-height: normal;
  right: 0;
  top: 50%;
  left: 0;
  text-align: left;
  z-index: 1;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px #888;
  box-shadow: 0 2px 6px #888;
  .item {
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
    a {
      color: inherit;
    }
    &:hover {
      background-color: blue;
      color: #fff;
    }
  }
}
</style>
