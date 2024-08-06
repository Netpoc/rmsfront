<template>
    <v-container>
        Report Page
        <div>
                                                <v-table height="300px" fixed-header>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left">
                                                                Date
                                                            </th>
                                                            <th class="text-left">
                                                                Grid Uptime
                                                            </th>
                                                            <th class="text-left">
                                                                Gen Runtime
                                                            </th>
                                                            <th class="text-left">
                                                                Diesel Refills
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in genOn" :key="item.id">
                                                            <td>{{ shortTimestamp(item.begin) }} - {{
                                                                shortTimestamp(item.end) }}</td>
                                                            <td>{{ convertToHHMMSS(item.din1_duration) }}</td>
                                                            <td>{{ convertToHHMMSS(item.din2_duration) }}</td>
                                                            <td v-for="fuel in item.fuel_refill" :key="fuel.id">{{
                                                                fuel['fuel.delta'] }} liters</td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </div>
    </v-container>
</template>