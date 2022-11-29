<template>
  <div>
    <el-container>
      <el-aside :width="this.asideWidth+'px'">
        <asideBar />
      </el-aside>
      <el-container class="elContainer" :width="(1920-this.asideWidth)+'px'">
        <el-header >
          <navHeader />
        </el-header>
        <el-divider></el-divider>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideBar from "@/components/asideBar/";
import navHeader from "@/components/navHeader/";
export default {
  data(){
      return{
        asideWidth:'65'
      }
  },
  mounted(){
    const PubSub = require('pubsub-js')
    PubSub.subscribe('isCollapse',(msg,data)=>{
      if(data===true){
        this.asideWidth='65'
      }else{
        this.asideWidth='200'
      }
    })
  },
  components: {
    asideBar,
    navHeader,
  },
};
</script>
<style scoped>
.el-aside{
  padding: 0;
  margin: 0;
  transition:width 0.5s;
	-webkit-transition:width 0.5s; /* Safari */
}
.elContainer{
  height: 100%;
  width: 100%;
}
.el-header{
  padding: 0;
}
.el-main{
  height: 100%;
  padding: 0;
  width: 100%;
  margin: 0 auto;
}
.el-divider{
  margin: 0;
}
</style>

