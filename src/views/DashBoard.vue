/* eslint-disable */
<template>
    <v-container fluid>
        <v-row>
            <v-col md="7">
                <a-carousel class="fill-height d-none d-md-block" autoplay>
                    <v-sheet>
                        <MainMap />
                    </v-sheet>
                </a-carousel>
            </v-col>
            <v-col md="5">
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="rounded-lg">
                        <v-card-text class="d-flex align-center justify-space-between">
                            <!--DEVICE ERROR NOTIFICATION BUTTON-->
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small class="d-none d-md-block">Device Error</small>
                                <v-btn class="ml-2" variant="text" size="small">
                                    <v-icon size="20">mdi-chip</v-icon>
                                </v-btn>
                            </v-sheet>
                            <v-divider vertical />
                            <!--DRAIN NOTIFICATION BUTTON-->
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small class="d-none d-md-block">Drain</small>
                                <v-dialog v-model="drain" max-width="600" persistent>
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-badge color="warning" content="4+">
                                            <v-btn v-bind="activatorProps" class="ml-2" variant="text"
                                                size="small"><v-icon size="20">mdi-flash-alert-outline</v-icon>
                                            </v-btn>
                                        </v-badge>
                                    </template>
                                    <v-card class="pa-2">
                                        <v-card-title>
                                            <div class="d-flex justify-space-between">Drain Alert Notification
                                                <v-icon color="red">mdi-alert-outline</v-icon>
                                            </div>
                                        </v-card-title>
                                        <v-card-text>

                                        </v-card-text>
                                        <template v-slot:actions>
                                            <v-spacer></v-spacer>

                                            <v-btn size="small" @click="drain = false">
                                                Disagree
                                            </v-btn>

                                            <v-btn size="small" @click="drain = false">
                                                Agree
                                            </v-btn>
                                        </template>
                                    </v-card>
                                </v-dialog>
                            </v-sheet>
                            <v-divider vertical />
                            <!--LOW FUEL NOTIFICATION BUTTON-->
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small class="d-none d-md-block">Low Fuel</small>
                                <v-dialog v-model="low" max-width="600" persistent>
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn v-bind="activatorProps" class="ml-2" variant="text" size="small"><v-icon
                                                size="20">mdi-gauge-empty</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card class="pa-2">
                                        <v-card-title color="red">
                                            <div class="d-flex justify-space-between">Low Diesel
                                                <v-icon color="red">mdi-alert-outline</v-icon>
                                            </div>
                                        </v-card-title>
                                        <v-card-text>

                                        </v-card-text>
                                        <template v-slot:actions>
                                            <v-spacer></v-spacer>

                                            <v-btn size="small" @click="low = false">
                                                Disagree
                                            </v-btn>

                                            <v-btn size="small" @click="low = false">
                                                Agree
                                            </v-btn>
                                        </template>
                                    </v-card>
                                </v-dialog>
                            </v-sheet>
                            <v-divider vertical />
                            <!--REFILL NOTIFICATION NOTIFICATION BUTTON-->
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small class="d-none d-md-block">Refill</small>
                                <v-dialog v-model="dialog" max-width="600" persistent>
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-badge :content="unreadCount" :value="unreadCount" color="success"
                                            v-if="unreadCount > 0" overlap>
                                            <v-btn v-bind="activatorProps" class="ml-2" variant="text"
                                                size="small"><v-icon size="20">mdi-gauge-full</v-icon></v-btn>
                                        </v-badge>
                                    </template>
                                    <v-card class="pa-2">
                                        <v-card-title>
                                            <div class="d-flex justify-space-between">Refill Notification
                                                <v-icon color="success">mdi-fuel</v-icon>
                                            </div>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-list v-for="item in items" :key="item.id">
                                                <v-list-item>
                                                    <v-card>
                                                        <small>+{{item['fuel.delta']}}Liters refill on {{formatTimestamp(item.timestamp) }}</small>
                                                        
                                                    </v-card>
                                                </v-list-item>
                                            </v-list>
                                        </v-card-text>
                                        <template v-slot:actions>
                                            <v-spacer></v-spacer>

                                            <v-btn @click="dialog = false">
                                                Disagree
                                            </v-btn>

                                            <v-btn @click="dialog = false">
                                                Agree
                                            </v-btn>
                                        </template>
                                    </v-card>
                                </v-dialog>
                            </v-sheet>
                        </v-card-text>
                    </v-card>
                    <v-card class="mt-3">
                        <LocationTable />
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import LocationTable from '@/components/LocationTable.vue'
//import NavBar from '@/components/NavBar.vue';
import MainMap from '@/components/MainMap.vue'
import api from '@/services/api';

export default {
    components: {
        LocationTable,
        MainMap,
    },
    data() {
        return {
            dialog: false,
            drain: false,
            low: false,
            items: [],
            unreadCount: 0,
        };
    },
    created() {
        this.fetchRefillData();
    },
    methods: {
        async fetchRefillData() {
            try {
                const response = await api.getRefillData();
                this.items = response.data.result;
                this.unreadCount = this.items.length
            } catch (error) {
                console.error('Error Fetching Data on Refill', error)
            }
        },
        markAsRead() {
            this.unreadCount = 0;
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp * 1000); // Convert to milliseconds
            const options = {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            return date.toLocaleString('en-US', options);
        }
    }
}
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
    text-align: center;
    line-height: 160px;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #0E0856;
}
</style>