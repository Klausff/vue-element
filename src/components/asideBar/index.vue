<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse "
      active-text-color="rgb(64, 158, 255)"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-menu-item style="padding-left:6px" index="1" @click="toHome">
        <i class="el-icon-s-home"></i>
        <span slot="title">{{$t('message.personalCenter')}}</span>
      </el-menu-item>
      <el-menu-item style="padding-left:6px" index="2" @click="toGoods">
        <i class="el-icon-s-goods"></i>
        <span slot="title">{{$t('message.goodsManagement')}}</span>
      </el-menu-item>
      <el-menu-item style="padding-left:6px" index="3" @click="toOrder" >
        <i class="el-icon-s-order" ></i>
        <span slot="title">{{$t('message.ordersManagement')}}</span>
      </el-menu-item>
      <el-menu-item style="padding-left:6px" index="4" @click="toCount">
        <i class="el-icon-s-data"></i>
        <span slot="title">{{$t('message.dataStatistics')}}</span>
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
    toGoods(){
      this.$router.push('/goods')
    },
    toOrder(){
      this.$router.push('/order')
    },
    toCount() {
      this.$router.push('/dataCount')
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

