<template>
  <div class="homeContainer">
    <!-- 数据展示 -->
    <div class="data">
      <div class="item" @click="showUserEc">
        <a class="userIcon iconfont icon-yonghu2"></a>
        <span class="text">{{$t("message.newVisitor")}}</span>
        <span class="num"
          ><countTo
            :startVal="0"
            :endVal="Math.round(Math.random() * 5000)"
            :duration="3000"
          ></countTo
        ></span>
      </div>
      <div class="item" @click="showGoodsEc">
        <a class="goodsIcon iconfont icon-maijiagouwuche"></a>
        <span class="text">{{$t("message.totalGoods")}}</span>
        <span class="num"
          ><countTo
            :startVal="0"
            :endVal="Math.round(Math.random() * 5000)"
            :duration="3000"
          ></countTo
        ></span>
      </div>
      <div class="item" @click="showOrderEc">
        <a class="orderIcon iconfont icon-dingdan"></a>
        <span class="text">{{$t("message.totalOrders")}}</span>
        <span class="num"
          ><countTo
            :startVal="0"
            :endVal="Math.round(Math.random() * 5000)"
            :duration="3000"
          ></countTo
        ></span>
      </div>
      <div class="item" @click="showCountEc">
        <a class="countIcon iconfont icon-xiaoshoue"></a>
        <span class="text">{{$t("message.totalSales")}}</span>
        <span class="num"
          ><countTo
            :startVal="0"
            :endVal="Math.round(Math.random() * 5000)"
            :duration="3000"
          ></countTo
        ></span>
      </div>
    </div>
    <!-- echarts图表 -->
    <div ref="echarts" class="echarts">
      <div
        ref="chartCategory"
        style="
          width: 100%;
          height: 310px;
          background-color: white;
          margin: 0 auto;
        "
      ></div>
    </div>
    <!-- 热搜榜 -->
    <div>
      <!-- 百度热搜 -->
      <el-card class="baidu-box-card">
        <div slot="header" class="clearfix">
          <a class="iconfont icon-baidu"></a>
          <span>{{$t("message.baiduHot")}}</span>
        </div>
        <div
          v-for="(hotdata, index) in baiduHotData"
          :key="hotdata.id"
          class="text"
        >
          <a :href="hotdata.baiduhot_src" target="_blank">
            <p :style="{ color: hotdata.baiduhot_isred ? 'red' : 'black' }">
              {{ hotdata.baiduhot_id }}&nbsp
            </p>
            <span>{{ hotdata.baiduhot_name }}</span>
          </a>
        </div>
      </el-card>
      <!-- 微博热搜榜 -->
      <el-card class="weibo-box-card">
        <div slot="header" class="clearfix">
          <a class="iconfont icon-weibo"></a>
          <span>{{$t("message.weiboHot")}}</span>
        </div>
        <div
          v-for="(hotdata, index) in weiboHotData"
          :key="hotdata.id"
          class="text"
        >
          <a :href="hotdata.weibohot_src" target="_blank">
            <p :style="{ color: hotdata.weibohot_isred ? 'red' : 'black' }">
              {{ hotdata.weibohot_id }}&nbsp
            </p>
            <span>{{ hotdata.weibohot_name }}</span>
          </a>
        </div>
      </el-card>
      <!-- 知乎热搜榜 -->
      <el-card class="zhihu-box-card">
        <div slot="header" class="clearfix">
          <a class="iconfont icon-shejiaotubiao-10"></a>
          <span>{{$t("message.zhihuHot")}}</span>
        </div>
        <div
          v-for="(hotdata, index) in zhihuHotData"
          :key="hotdata.zhuhuhot_id"
          class="text"
        >
          <a :href="hotdata.zhihuhot_src" target="_blank">
            <p :style="{ color: hotdata.zhihuhot_isred ? 'red' : 'black' }">
              {{ hotdata.zhihuhot_id }}&nbsp
            </p>
            <span>{{ hotdata.zhihuhot_name }}</span>
          </a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  data() {
    return {
      userEc: true,
      goodsEc: false,
      orderEc: false,
      countEc: false,
      showExpData: [900, 500, 200, 500, 700, 300, 990],
      showActData: [300, 800, 110, 300, 370, 606, 500],
      baiduHotData: [],
      weiboHotData: [],
      zhihuHotData: []
    };
  },
  components: {
    countTo,
  },
  mounted() {
    this.getEchartCategory();
    this.getBaiduHot();
    this.getWeiboHot();
    this.getZhihuHot();
  },
  watch: {
    userEc(show) {
      if (show) {
        this.showExpData = [900, 500, 200, 500, 700, 300, 909];
        this.showActData = [300, 800, 101, 300, 370, 660, 500];
        this.getEchartCategory();
      }
    },
    goodsEc(show) {
      if (show) {
        this.showExpData = [1010, 606, 700, 660, 440, 780, 990];
        this.showActData = [300, 800, 990, 808, 370, 660, 500];
        this.getEchartCategory();
      }
    },
    orderEc(show) {
      if (show) {
        this.showExpData = [1020, 500, 700, 980, 550, 800, 990];
        this.showActData = [900, 1060, 1000, 707, 370, 660, 500];
        this.getEchartCategory();
      }
    },
    countEc(show) {
      if (show) {
        this.showExpData = [1200, 1000, 1020, 990, 550, 800, 909];
        this.showActData = [880, 700, 990, 770, 1000, 1030, 1010];
        this.getEchartCategory();
      }
    },
  },
  methods: {
    // 折线图
    getEchartCategory() {
      const chartCategory = this.$refs.chartCategory;
      let myChart = this.$echarts.getInstanceByDom(chartCategory);
      if (!myChart) {
        myChart = this.$echarts.init(chartCategory);
      }
      const option = {
        animationDuration: 3000,
        tooltip: { trigger: "axis" },
        legend: { data: ['expected', 'actual'] },
        grid: { left: "3%", right: "3%", bottom: "3%", containLabel: true },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: { type: "value" },
        series: [
          {
            name: 'expected',
            type: "line",
            data: this.showExpData,
            smooth: true,
            lineStyle: { color: "red" },
            itemStyle: { color: "red" },
          },
          {
            name:'actual',
            type: "line",
            data: this.showActData,
            smooth: true,
            areaStyle: { color: "#dbe6fa", opacity: 0.5 },
          },
        ],
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
      // 判断侧边栏是否为展开状态进行图标根据div自适应 如果没有判断则图表的动画效果无效？
      const PubSub = require("pubsub-js");
      PubSub.subscribe("isCollapse", (msg, data) => {
        if (data === false) {
          // 根据父div的大小自适应图表大小
          const _this = this;
          let erd = elementResizeDetectorMaker();
          erd.listenTo(this.$refs.echarts, () => {
            this.$nextTick(() => {
              myChart.resize();
            });
          });
        }
      });
    },
    // 展示用户图表的回调
    showUserEc() {
      this.userEc = true;
      this.goodsEc = false;
      this.orderEc = false;
      this.countEc = false;
    },
    // 展示商品图表的回调
    showGoodsEc() {
      this.goodsEc = true;
      this.userEc = false;
      this.orderEc = false;
      this.countEc = false;
    },
    // 展示订单图表的回调
    showOrderEc() {
      this.orderEc = true;
      this.userEc = false;
      this.goodsEc = false;
      this.countEc = false;
    },
    // 展示金额图表的回调
    showCountEc() {
      this.countEc = true;
      this.userEc = false;
      this.goodsEc = false;
      this.orderEc = false;
    },
    // 获取百度热搜数据
    async getBaiduHot() {
      await this.$store.dispatch("getBaiduHotData");
      this.baiduHotData = this.$store.state.home.baiduHotData;
    },
    // 获取微博热搜数据
    async getWeiboHot() {
      await this.$store.dispatch("getWeiboHotData");
      this.weiboHotData = this.$store.state.home.weiboHotData;
    },
    // 获取知乎热搜数据
    async getZhihuHot() {
      await this.$store.dispatch("getZhihuHotData");
      this.zhihuHotData = this.$store.state.home.zhihuHotData;
    },
  },
};
</script>
<style scoped>
.homeContainer {
  height: 868px;
  background: #f0f2f5;
}
.data {
  display: flex;
  justify-content: space-between;
  margin: 0 42px;
}
.data .item {
  cursor: pointer;
  display: block;
  margin: 10px;
  width: 23%;
  height: 120px;
  background-color: white;
}
.data .item .userIcon {
  position: absolute;
  font-size: 85px;
  border-radius: 15%;
  margin: 20px 25px;
  color: #40c9c6;
}
.data .item .userIcon:hover {
  background-color: #40c9c6;
  color: #fff;
}
.data .item .goodsIcon {
  position: absolute;
  font-size: 85px;
  border-radius: 15%;
  margin: 20px 25px;
  color: #34bfa3;
}
.data .item .goodsIcon:hover {
  background-color: #34bfa3;
  color: #fff;
}
.data .item .orderIcon {
  position: absolute;
  font-size: 85px;
  border-radius: 15%;
  margin: 20px 25px;
  color: #36a3f7;
}
.data .item .orderIcon:hover {
  background-color: #36a3f7;
  color: #fff;
}
.data .item .countIcon {
  position: absolute;
  font-size: 85px;
  border-radius: 15%;
  margin: 25px 25px;
  color: #36a3f7;
}
.data .item .countIcon:hover {
  background-color: #36a3f7;
  color: #fff;
}
.data .item .text {
  position: relative;
  top: 20px;
  left: 200px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #8c8c8c;
}
.data .item .num {
  position: relative;
  top: 65px;
  left: 110px;
  font-size: 20px;
  color: #666666;
}
.echarts {
  width: 95%;
  height: 35%;
  margin: 0 auto;
}
.baidu-box-card {
  float: left;
  margin-top: 10px;
  margin-left: 150px;
  width: 25%;
}
.baidu-box-card .clearfix a {
  color: blue;
}
.baidu-box-card span {
  margin-left: 10px;
}
.baidu-box-card .text {
  height: 50%;
  font-size: 16px;
  line-height: 30px;
}
.baidu-box-card .text a {
  color: black;
}
.baidu-box-card .text p {
  float: left;
}
.baidu-box-card .text .red {
  color: red;
}
.weibo-box-card {
  float: left;
  margin-top: 10px;
  margin-left: 70px;
  width: 25%;
}
.weibo-box-card .clearfix a {
  font-size: 20px;
  color: red;
}
.weibo-box-card span {
  margin-left: 10px;
}
.weibo-box-card .text {
  height: 50%;
  font-size: 16px;
  line-height: 30px;
}
.weibo-box-card .text a {
  color: black;
}
.weibo-box-card .text p {
  float: left;
}
.weibo-box-card .text .red {
  color: red;
}
.zhihu-box-card {
  float: left;
  margin-top: 10px;
  margin-left: 70px;
  width: 25%;
}
.zhihu-box-card .clearfix a {
  font-size: 22px;
  color: blue;
}
.zhihu-box-card span {
  margin-left: 10px;
}
.zhihu-box-card .text {
  height: 50%;
  font-size: 16px;
  line-height: 37px;
}
.zhihu-box-card .text a {
  color: black;
}
.zhihu-box-card .text p {
  float: left;
}
.zhihu-box-card .text .red {
  color: red;
}
</style>