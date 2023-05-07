<template>
  <div class="navHeader">
    <span class="elIcon" @click="changeCollapse">
      <i v-if="isCollapse === false" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
        <router-link :to="item[0]"><a>{{ $t(item[1]) }}</a></router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="todoList">
      <el-popover placement="bottom" width="400" trigger="hover" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t("message.todo")}}</span>
            <el-button @click="todoListISRead=true" style="float: right; padding: 3px 0" type="text">{{$t("message.allRead")}}</el-button>
          </div>
          <div v-for="o in 8" :key="o" class="text item">
            <a :class="todoListISRead?'iconfont icon-yixuan green':'iconfont icon-danxuanweixuanzhong'"></a>
            <span :class="todoListISRead?'isRead':''">{{$t("message.todo")}} {{ o }}</span>
          </div>
        </el-card>
        <el-button slot="reference">
          <a class="iconfont icon-daiban"></a>
          <span>{{$t("message.todo")}}</span>
        </el-button>
      </el-popover>
    </div>
    <div class="message">
      <el-popover placement="bottom" width="400" trigger="hover" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t("message.notice")}}</span>
            <el-button @click="messageIsRead=true" style="float: right; padding: 3px 0" type="text">{{$t("message.allRead")}}</el-button>
          </div>
          <div v-for="o in 8" :key="o" class="text item">
            <a :class="messageIsRead?'iconfont icon-yixuan green':'iconfont icon-yuandian red'"></a>
            <span :class="messageIsRead?'isRead':''">{{$t("message.message")}} {{ o }}</span>
          </div>
        </el-card>
        <el-button slot="reference">
          <a class="iconfont icon-xiaoxitongzhi"></a>
          <span>{{$t("message.notice")}}</span>
        </el-button>
      </el-popover>
    </div>
    <div class="date">
      <el-popover placement="bottom" width="400" trigger="hover" >
        <el-calendar  v-model="date"></el-calendar>
        <el-button slot="reference">
          <a class="iconfont icon-rili"></a>
          <span>{{$t("message.calendar")}}</span>
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
        <el-dropdown-item command="changeLang">{{$t("message.changeLang")}}</el-dropdown-item>
        <el-dropdown-item command="logOut">{{$t("message.logOut")}}</el-dropdown-item>
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
      messageIsRead:false,
      todoListISRead:false,
      isChinese:true
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
        "language": "auto",
        "borderRadius": "5",
        "fixed": "false",
        "vertical": "top",
        "horizontal": "left",
        "city": "CN101190201",
        "key": "7c4d1883bf3143779cdf1b3cefb000eb"
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
    // 侧边栏伸展
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      const PubSub = require("pubsub-js");
      PubSub.publish("isCollapse", this.isCollapse);
    },
    handleCommand(command) {
      if (command == "logOut") {
        this.$router.push("/login");
      }
      if(command == "changeLang"){
        if(this.isChinese) {
        this.$i18n.locale ='en' 
        localStorage.setItem('lang','en')
        this.isChinese=false
      }else {
        this.$i18n.locale ='cn' 
        localStorage.setItem('lang','cn')
        this.isChinese=true
      }
      }
    },
    // 顶部面包屑
    getRouteChange() {
      const { breadList } = this;
      let toPath = this.$route.path;
      let toTitle = this.$route.name; 
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
  right: 100px;
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