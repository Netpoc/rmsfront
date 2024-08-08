<template>
    <div>
      <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from "vue3-apexcharts";
  
  export default {
    components: {
      apexchart: VueApexCharts
    },
    data() {
      return {
        series: [
          {
            name: "escort.lls.value.1 (liters)",
            data: []
          },
          {
            name: "escort.lls.value.2",
            data: []
          }
        ],
        chartOptions: {
          chart: {
            id: "realtime",
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 1000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          title: {
            text: "Live Telematics Data",
            align: "left"
          },
          xaxis: {
            type: "datetime",
            range: 900000 // 15 minutes
          },
          yaxis: {
            title: {
              text: "Values"
            }
          },
          legend: {
            show: true
          }
        }
      };
    },
    methods: {
      updateSeries(newData) {
        const currentTime = new Date().getTime();
  
        this.series[0].data.push({
          x: currentTime,
          y: newData["escort.lls.value.1"] / 100
        });
  
        this.series[1].data.push({
          x: currentTime,
          y: newData["escort.lls.value.2"]
        });
  
        // Remove old data points to keep the chart size manageable
        if (this.series[0].data.length > 30) {
          this.series.forEach((s) => s.data.shift());
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  