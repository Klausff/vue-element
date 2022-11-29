<template>
  <div class="navHeader">
    <span class="elIcon" @click="changeCollapse">
      <i v-if="isCollapse === false" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
        <router-link :to="item[0]"><a>{{ item[1] }}</a></router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="todoList">
      <el-popover placement="bottom" width="400" trigger="hover" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>代办事项</span>
            <el-button @click="isRead=true" style="float: right; padding: 3px 0" type="text">全部已读</el-button>
          </div>
          <div v-for="o in 8" :key="o" class="text item">
            <a :class="isRead?'iconfont icon-yixuan green':'iconfont icon-danxuanweixuanzhong'"></a>
            <span :class="isRead?'isRead':''">{{'代办' + o }}</span>
          </div>
        </el-card>
        <el-button slot="reference">
          <a class="iconfont icon-xiaoxitongzhi"></a>
          <span>代办</span>
        </el-button>
      </el-popover>
    </div>
    <div class="message">
      <el-popover placement="bottom" width="400" trigger="hover" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息通知</span>
            <el-button @click="isRead=true" style="float: right; padding: 3px 0" type="text">全部已读</el-button>
          </div>
          <div v-for="o in 8" :key="o" class="text item">
            <a :class="isRead?'iconfont icon-yixuan green':'iconfont icon-yuandian red'"></a>
            <span :class="isRead?'isRead':''">{{'消息 ' + o }}</span>
          </div>
        </el-card>
        <el-button slot="reference">
          <a class="iconfont icon-xiaoxitongzhi"></a>
          <span>通知</span>
        </el-button>
      </el-popover>
    </div>
    <div class="date">
      <el-popover placement="bottom" width="400" trigger="hover" >
        <el-calendar  v-model="date"></el-calendar>
        <el-button slot="reference">
          <a class="iconfont icon-rili"></a>
          <span>日历</span>
        </el-button>
      </el-popover>
    </div>
    <div class="weather">
      <div id="he-plugin-simple"></div>
    </div>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-icon">
        <i class="el-icon-s-tools"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: true,
      breadList: [],
      newBreadList: [],
      date:new Date(),
      isRead:false
    };
  },
  created() {
    this.getRouteChange();
    // 天气配置(和风天气)
    window.WIDGET = {
    "CONFIG": {
      "modules": "01234",
      "background": "1",
      "tmpColor": "FFFFFF",
      "tmpSize": "16",
      "cityColor": "FFFFFF",
      "citySize": "16",
      "aqiColor": "FFFFFF",
      "aqiSize": "16",
      "weatherIconSize": "24",
      "alertIconSize": "18",
      "padding": "10px 10px 10px 10px",
      "shadow": "0",
      "language": "zh",
      "borderRadius": "5",
      "fixed": "false",
      "vertical": "top",
      "horizontal": "left",
      "key": "d5e71e8bf1f84d2ea45a2ebe99229361"
      }
    }
    var script = document.createElement('script')
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0';
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  watch: {
    $route() {
      this.getRouteChange();
    },
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      const PubSub = require("pubsub-js");
      PubSub.publish("isCollapse", this.isCollapse);
    },
    handleCommand(command) {
      if (command == "logOut") {
        this.$router.push("/login");
      }
    },
    getRouteChange() {
      const { breadList } = this;
      let toPath = this.$route.path;
      let toTitle = this.$route.meta.title;
      breadList.push([toPath, toTitle]);
      for(let i=0;i<breadList.length-1;i++){
        for(let j=i+1;j<breadList.length;j++){
          if(breadList[i][0]==breadList[j][0]){
            breadList.pop()
          }
        }
      }
    },
  },
};
</script>

<style >
a {
  text-decoration: none;
}
.navHeader {
  position: relative;
}
.elIcon {
  position: absolute;
  top: 10px;
  font-size: 30px;
  padding: 0;
}
.el-breadcrumb {
  position: absolute;
  left: 50px;
  top: 20px;
  font-size: 20px;
}
.el-dropdown {
  position: fixed;
  left: 1880px;
  top: 15px;
  font-size: 25px;
}
.elDivider {
  position: absolute;
  top: 22px;
}
.elButton {
  position: absolute;
  left: 10px;
  top: 50px;
}
.weather{
  position: absolute;
  right: 80px;
  top: 8px;
  width: 8%;
  z-index: 1;
  opacity: 0.9;
}
.date {
  position: absolute;
  right: 280px;
  top: 10px;
}
.el-calendar-table .el-calendar-day {
  height: 40px;
}
.date .el-button{
  border: 0;
  background-color: #ecf5ff;
}
.date .el-button a{
  font-size: 18px;
  margin: 0 5px;
}
.date .el-button span{
  font-size: 15px;
}
.message{
  position: absolute;
  right: 420px;
  top: 9px;
}
.message .el-button{
  border: 0;
  background-color: #ecf5ff;
}
.message .el-button a{
  font-size: 18px;
  margin: 0 5px;
}
.message .el-button span{
  font-size: 15px;
}
.todoList{
  position: absolute;
  right: 560px;
  top: 9px;
}
.todoList .el-button{
  border: 0;
  background-color: #ecf5ff;
}
.todoList .el-button a{
  font-size: 18px;
  margin: 0 5px;
}
.todoList .el-button span{
  font-size: 15px;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 400px;
}
.text a{
  margin: 0 10px;
}
.isRead{
  text-decoration: line-through;
  color: #d9d9d9;
}
.red{
  color: red;
  font-size: 20px;
}
.green{
  color: green;
}
</style>