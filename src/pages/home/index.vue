<template>
  <div class="homeContainer">
    <div class="data">
      <div class="item" @click="showUserEc">
        <a class="userIcon iconfont icon-yonghu2"></a>
        <span class="text">用户总数</span>
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
        <span class="text">商品总数</span>
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
        <span class="text">订单总数</span>
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
        <span class="text">销售总额</span>
        <span class="num"
          ><countTo
            :startVal="0"
            :endVal="Math.round(Math.random() * 5000)"
            :duration="3000"
          ></countTo
        ></span>
      </div>
    </div>
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
      showExpData: [90, 50, 20, 50, 70, 30, 99],
      showActData: [30, 80, 11, 30, 37, 66, 50],
    };
  },
  components: {
    countTo,
  },
  
  mounted() {
    this.getEchartCategory();
  },
  watch: {
    userEc(show) {
      if (show) {
        this.showExpData = [90, 50, 20, 50, 70, 30, 99];
        this.showActData = [30, 80, 11, 30, 37, 66, 50];
        this.getEchartCategory();
      }
    },
    goodsEc(show) {
      if (show) {
        this.showExpData = [110, 66, 70, 66, 44, 78, 99];
        this.showActData = [30, 80, 99, 88, 37, 66, 50];
        this.getEchartCategory();
      }
    },
    orderEc(show) {
      if (show) {
        this.showExpData = [120, 50, 70, 98, 55, 80, 99];
        this.showActData = [90, 160, 100, 77, 37, 66, 50];
        this.getEchartCategory();
      }
    },
    countEc(show) {
      if (show) {
        this.showExpData = [120, 100, 120, 99, 55, 80, 99];
        this.showActData = [88, 70, 99, 77, 100, 130, 110];
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
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["expected", "actual"],
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "expected",
            type: "line",
            data: this.showExpData,
            smooth: true,
            lineStyle: {
              color: "red",
            },
            itemStyle: {
              color: "red",
            },
          },
          {
            name: "actual",
            type: "line",
            data: this.showActData,
            smooth: true,
            areaStyle: {
              color: "#dbe6fa",
              opacity: 0.5,
            },
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
  },
};
</script>
<style scoped>
.homeContainer {
  height: 900px;
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
  left: 240px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #8c8c8c;
}
.data .item .num {
  position: relative;
  top: 65px;
  left: 160px;
  font-size: 20px;
  color: #666666;
}
.echarts {
  width: 95%;
  height: 35%;
  margin: 0 auto;
}
</style>