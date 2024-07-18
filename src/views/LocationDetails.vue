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
                        <v-sheet color="green" height="80" width="80" class="rounded-lg">
                            <div class="d-flex flex-column align-center">
                                Grid
                                <v-icon>
                                    mdi-transmission-tower
                                </v-icon>
                            </div>
                        </v-sheet>
                        <v-sheet color="red" height="80" width="80" class="rounded-lg">
                            <div class="d-flex flex-column align-center">
                                Gen 1
                                <v-icon>
                                    mdi-generator-stationary
                                </v-icon>
                            </div>
                        </v-sheet>
                        <v-sheet color="red" height="80" width="80" class="rounded-lg">
                            <div class="d-flex flex-column align-center">
                                Gen 2
                                <v-icon>
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
                        <apexchart type="line" :options="options" :series="series">
                        </apexchart>
                    </v-card-text>
                </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            options: {
                chart: {
                    id: "vuechart-example",
                },
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                },
            },
            series: [
                {
                    name: "series-1",
                    data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139],
                },
            ],
        }
    }
}

</script>