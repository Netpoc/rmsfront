<template>
    <div>
      <ApexLineChart ref="apexChart" />
    </div>
  </template>
  
  <script>
  import ApexLineChart from "../components/ApexChart.vue";
  import axios from "axios";
  
  export default {
    components: {
      ApexLineChart
    },
    data() {
      return {
        intervalId: null,
        apiUrl: "https://rms-backend-6hdz.onrender.com/api/data" // Replace with your actual API URL
      };
    },
    mounted() {
      this.fetchData();
  
      // Fetch new data every 5 minutes (300000 milliseconds)
      this.intervalId = setInterval(this.fetchData, 300000);
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    },
    methods: {
      fetchData() {
        axios
          .get(this.apiUrl)
          .then((response) => {
            const data = response.data.results;
            console.log(data); // Log the data to check if it's being fetched correctly
            if (data && data.length > 0) {
              const latestData = data[data.length - 1];
              this.$refs.apexChart.updateSeries(latestData);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  