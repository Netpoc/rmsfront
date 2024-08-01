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
                    </v-card>
                </v-sheet>
            </v-col>
            <v-col md="4">
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="pa-2 rounded-xl">
                        <v-card-text>
                            <p>Daily Trends</p>
                            <v-table v-if="duration">
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Power Source
                                        </th>
                                        <th class="text-left">
                                            Duration
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>GRID:</td>
                                        <td>{{ convertToHHMMSS(duration.grid) }}</td>
                                    </tr>
                                    <tr>
                                        <td>GEN:</td>
                                        <td>{{ convertToHHMMSS(duration.gen) }}</td>
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
                            <a-range-picker class="mt-1" @change="onDateChange" />
                            <div class="d-flex justify-end">
                                <v-dialog v-model="report">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn v-bind="activatorProps" outline color="#92D050" class="mt-3"
                                            size="small">Generate</v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>Location Reports</v-card-title>
                                        <v-card-text>
                                            <div v-for="message in filteredMessages" :key="message.timestamp">
                                                <p>Timestamp: {{ formatTimestamp(message.timestamp) }}</p>
                                                <p>Din 1: {{ message['din.1'] }}</p>
                                                <p>Din 2: {{ message['din.2'] }}</p>
                                                <p>Din 3: {{ message['din.3'] }}</p>
                                                <p>Fuel Level: {{ message['escort.lls.value.2'] }}</p>
                                                <hr />
                                            </div>
                                            <v-table height="300px" fixed-header>
                                                <thead>
                                                    <tr>
                                                        <th class="text-left">
                                                            Data
                                                        </th>
                                                        <th class="text-left">
                                                            Diesel Consumption
                                                        </th>
                                                        <th class="text-left">
                                                            Gen Runtime
                                                        </th>
                                                        <th class="text-left">
                                                            Incidents
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in genOn" :key="item.id">
                                                        <td>{{ shortTimestamp(item.begin) }} - {{ shortTimestamp(item.end) }}</td>
                                                        <td>{{ item.calories }}</td>
                                                        <td>{{ convertToHHMMSS(item.duration) }}</td>
                                                        <td>{{ item.calories }}</td>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>

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
                    <v-card class="rounded-lg">
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
import api from '@/services/api'
export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            genOn: null,
            filteredMessages: [],
            report: false,
            selectedRange: [],
            message: [],
            volume: '',
            duration: null,
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
        this.fetchDuration();
        this.fetchData();
        this.setupRealtimeUpdates();
        this.fetchMessages();
        this.genRuntime();

    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },
    methods: {
        shortTimestamp(timestamp) {
            const date = new Date(timestamp * 1000); // Convert to milliseconds
            const options = {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            return date.toLocaleString('en-US', options);
        },
        async genRuntime() {
            try {
                const response = await api.getGenOnDurations();
                const data = response.data.result;
                this.genOn = data;
                console.log(this.genOn)
            }catch(error) {
                console.error(error)
            }
        },
        onDateChange(dates) {
            if (dates && dates.length === 2) {
                this.selectedRange = dates.map(date => date.valueOf() / 1000); // Convert to Unix timestamp in seconds
                this.filterMessages();
            } else {
                this.filteredMessages = [];
            }
        },
        filterMessages() {
            if (this.selectedRange.length === 2) {
                const [start, end] = this.selectedRange;
                this.filteredMessages = this.messages.filter(
                    message => message.timestamp >= start && message.timestamp <= end
                );
            }
        },
        async fetchMessages() {
            try {
                const response = await api.getMessages();
                this.messages = response.data.result
            } catch (error) {
                console.error("Error Fetching Device Message", error)
            }
        },

        async fetchDuration() {
            try {
                const response = await api.getFlespiData();
                const interval = response.data.result;
                this.duration = interval[interval.length - 1]
                console.log('duration:', this.duration)
            } catch (error) {
                this.error = 'Error fetching data';
            } finally {
                console.log('done')
            }
        },
        fetchData() {
            axios.get('https://rms-backend-6hdz.onrender.com/api/data')
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
                    console.log(this.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        setupRealtimeUpdates() {
            setInterval(this.fetchData, 300000); // Fetch new data every 5 minutes
        },
        convertToHHMMSS(seconds) {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${this.padToTwoDigits(hrs)}:${this.padToTwoDigits(mins)}:${this.padToTwoDigits(secs)}`;
        },
        padToTwoDigits(num) {
            return num.toString().padStart(2, '0');
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.toISOString();
        },
        formatDuration(duration) {
            return `${this.convertToHHMMSS(duration)} (Total Seconds: ${duration})`;
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