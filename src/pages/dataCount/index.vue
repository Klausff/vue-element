<template>
  <div class="echarts">
    <div
      ref="chartCategory"
      style="width: 100%; height: 500px; background-color: white; margin: 0">
    </div>
    <div
      ref="chartRander"
      style="width: 50%; height: 350px; background-color: white; margin: 0">
    </div>
    <div
    class="chartHist"
      ref="chartHist"
      style="width: 920px; height: 350px; background-color: white; margin: 0">
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getEchartCategory();
    this.getEchartRander();
    this.getEchartHist();
  },
  methods: {
    // 波形图
    getEchartCategory() {
      const chartCategory = this.$refs.chartCategory;
      let myChart = this.$echarts.getInstanceByDom(chartCategory);
      if (!myChart) {
        myChart = this.$echarts.init(chartCategory);
      }
      const option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#0C02D0", "#7469D8"],
        title: {
          text: this.$t('message.CategoryTitle'),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["苹果", "小米", "华为", "三星", "vivo"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "苹果",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "小米",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "华为",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "三星",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(40,19,226)",
                },
                {
                  offset: 1,
                  color: "rgb(29,14,162)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "vivo",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(141,133,216)",
                },
                {
                  offset: 1,
                  color: "rgb(87,79,162)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 雷达图
    getEchartRander() {
      const chartRander = this.$refs.chartRander;
      let myChart = this.$echarts.getInstanceByDom(chartRander);
      if (!myChart) {
        myChart = this.$echarts.init(chartRander);
      }
      const option = {
        title: {
          text: "各品牌市场占比图",
          top: 10,
          left: 10,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          bottom: 10,
          data: (function () {
            var list = [];
            for (var i = 1; i <= 28; i++) {
              list.push(i + 2000 + "");
            }
            return list;
          })(),
        },
        visualMap: {
          top: "middle",
          right: 10,
          color: ["red", "yellow"],
          calculable: true,
        },
        radar: {
          indicator: [
            { text: "苹果", max: 400 },
            { text: "华为", max: 400 },
            { text: "小米", max: 400 },
            { text: "三星", max: 400 },
            { text: "vivo", max: 400 },
          ],
        },
        series: (function () {
          var series = [];
          for (var i = 1; i <= 20; i++) {
            series.push({
              type: "radar",
              symbol: "none",
              lineStyle: {
                width: 1,
              },
              emphasis: {
                areaStyle: {
                  color: "rgba(0,250,0,0.3)",
                },
              },
              data: [
                {
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    (i * i) / 2,
                  ],
                  name: i + 2000 + "",
                },
              ],
            });
          }
          return series;
        })(),
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 柱状图
    getEchartHist() {
      const chartHist = this.$refs.chartHist;
      let myChart = this.$echarts.getInstanceByDom(chartHist);
      if (!myChart) {
        myChart = this.$echarts.init(chartHist);
      }
      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 90; i++) {
        xAxisData.push(i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
      const option = {
        title: {
          text: "近一季度商品销售额对比图(万元)",
        },
        legend: {
          data: ["expected", "actual"],
        },
        // toolbox: {
        //   // y: 'bottom',
        //   feature: {
        //     magicType: {
        //       type: ["stack"],
        //     },
        //     dataView: {},
        //     saveAsImage: {
        //       pixelRatio: 2,
        //     },
        //   },
        // },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: "expected",
            type: "bar",
            data: data1,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10;
            },
          },
          {
            name: "actual",
            type: "bar",
            data: data2,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>

<style>
.echarts .chartHist{
  position: absolute;
  top: 570px;
  left:1000px
}
</style>