<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse "
      active-text-color="rgb(64, 158, 255)"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-menu-item index="1" @click="toHome">
        <i class="el-icon-s-home"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="2" @click="toUser">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="toSetting" >
        <i class="el-icon-s-order" ></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="toCount">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminInfo:[],
      isCollapse:true,
    };
  },
  methods:{
    toHome(){
      this.$router.push('/home')
    },
    toUser(){
      this.$router.push('/goods')
    },
    toSetting(){
      this.$router.push('/order')
    },
    toCount(){
      this.$router.push('/count')
    }
  },
  mounted(){
    const PubSub = require('pubsub-js')
    PubSub.subscribe('isCollapse',(msg,data)=>{
      this.isCollapse=data
    })
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width:190px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  margin: 0 ;
}
.el-menu-item {
  font-size: 15px;
}
</style>

