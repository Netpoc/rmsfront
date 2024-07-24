<template>
    <v-container>
        <v-row>
            <v-col md="4">
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="pa-2 rounded-xl">
                        <v-card-title>
                            Energy Source
                        </v-card-title>
                        <v-card-text class="d-flex justify-space-between">
                            <v-sheet height="80" width="80"
                                :class="[isGridActive ? 'green-background' : 'red-background', 'rounded-xl']"
                                class="rounded-lg d-flex align-center justify-center">
                                <div class="d-flex flex-column align-center">
                                    GRID
                                    <v-icon class="mt-1" size="25">
                                        mdi-transmission-tower
                                    </v-icon>
                                </div>
                            </v-sheet>
                            <v-sheet height="80" width="80"
                                :class="[isGenOneActive ? 'green-background' : 'red-background', 'rounded-xl']"
                                class="rounded-lg d-flex align-center justify-center">
                                <div class="d-flex flex-column align-center">
                                    GEN 1
                                    <v-icon class="mt-1" size="25">
                                        mdi-generator-stationary
                                    </v-icon>
                                </div>
                            </v-sheet>
                            <v-sheet height="80" width="80"
                                :class="[isGenTwoActive ? 'green-background' : 'red-background', 'rounded-xl']"
                                class="rounded-lg d-flex align-center justify-center">
                                <div class="d-flex flex-column align-center">
                                    GEN 2
                                    <v-icon class="mt-1" size="25">
                                        mdi-generator-stationary
                                    </v-icon>
                                </div>
                            </v-sheet>

                        </v-card-text>
                        <div class="ml-3">
                            Run Time:
                        </div>
                    </v-card>
                </v-sheet>
            </v-col>
            <v-col md="4">
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="pa-2 rounded-xl">
                        <v-card-text>
                            <p>Weekly Energy Report</p>
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Power Source
                                        </th>
                                        <th class="text-left">
                                            Consumption
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Grid</td>
                                        <td>120Kwh</td>
                                    </tr>
                                    <tr>
                                        <td>Diesel</td>
                                        <td>23,000Litres</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>
            <v-col md="4">
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="pa-2 rounded-xl">
                        <v-card-title>
                            Report
                        </v-card-title>
                        <v-card-text>
                            Select Date Range
                            <a-range-picker class="mt-1" v-model:value="value1" />
                            <div class="d-flex justify-end">
                                <v-btn outline color="#92D050" class="mt-3" size="small">Generate</v-btn>
                            </div>
                            <div class="mt-4 d-flex justify-space-between align-center">
                                View Last Month's Report
                                <v-btn size="small" variant="text" class="rounded-xl">here</v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="rounded-lg">
                        <v-card-title>Diesel Consumption Trend</v-card-title>
                        <v-card-text>
                            <apexchart type="line" height="350" :options="chartOptions" :series="series">
                            </apexchart>
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            data: null,
            series: [{
                name: 'LLS Value',
                data: []
            }],
            chartOptions: {
                chart: {
                    id: 'vuechart-example',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    }
                },
                xaxis: {
                    type: 'datetime',
                    tickAmount: 12, // Adjust the number of ticks to fit 2-hour intervals
                    labels: {
                        format: 'HH:mm',
                    },
                    title: {
                        text: 'Time',
                    },
                },
                yaxis: {
                    min: 0,
                    max: 1000,
                    tickAmount: 10,
                    labels: {
                        formatter: (value) => `${value} liters`,
                    },
                    title: {
                        text: 'Volume in liters',
                    },
                },
                stroke: {
                    curve: 'smooth'
                }                
            },
            din: [],
            din1: [],
            din2: [],
            din3: [],
            position: {
                latitude: [],
                longitude: []
            },
        };
    },
    async mounted() {
        this.fetchData();
        this.setupRealtimeUpdates();
    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },
    methods: {
        fetchData() {
            axios.get('http://localhost:7080/api/data')
                .then(response => {
                    const data = response.data.result.map(item => {
                        return {
                            x: new Date(item['server.timestamp'] * 1000), // Convert timestamp to milliseconds
                            y: item['escort.lls.value.2']
                        };
                    });
                    this.series[0].data = data;
                    const sortedData = response.data.result.sort(
                        (a, b) => b["server.timestamp"] - a["server.timestamp"]
                    );
                    this.data = sortedData[0];
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        setupRealtimeUpdates() {
            setInterval(this.fetchData, 300000); // Fetch new data every 5 minutes
        }
    },
    computed: {
        isGridActive() {
            return this.data ? this.data["din.1"] : false;
        },
        isGenOneActive() {
            return this.data ? this.data["din.2"] : false;
        },
        isGenTwoActive() {
            return this.data ? this.data["din.3"] : false;
        },
    },
}

</script>
<style scoped>
.green-background {
    background-color: #92D050;
    color: white;
}

.red-background {
    background-color: red;
    color: white;
}

.rounded-lg {
    border-radius: 0.5rem;
    /* Equivalent to the 'lg' size in Tailwind CSS */
}
</style>