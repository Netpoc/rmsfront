/* eslint-disable */
<template>
    <v-container fluid>
        <v-row>
            <v-col md="7">
                <a-carousel class="fill-height" autoplay>
                    <v-sheet>
                        <MainMap />
                    </v-sheet>
                    <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                        <h3>2</h3>
                    </v-sheet>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </a-carousel>
            </v-col>
            <v-col md="5">
                <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
                    <v-card color="#0E0856" class="rounded-lg">
                        <v-card-text class="d-flex align-center justify-space-between">
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small>Device Error</small>
                                <v-btn class="ml-2" variant="text" size="small">
                                    <v-icon size="20">mdi-chip</v-icon>
                                </v-btn>
                            </v-sheet>
                            <v-divider vertical />
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small>Drain</small>
                                <v-dialog v-model="dialog" max-width="400" persistent>
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-badge color="warning" content="4+">                                     
                                            <v-btn v-bind="activatorProps" class="ml-2" variant="text"
                                                size="small"><v-icon size="20">mdi-flash-alert-outline</v-icon>
                                            </v-btn>
                                        </v-badge>                                           
                                    </template>
                                    <v-card prepend-icon="mdi-map-marker"
                                        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
                                        title="Use Google's location service?">
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
                            <v-divider vertical />
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small>Low Fuel</small>
                                <v-dialog v-model="dialog" max-width="400" persistent>
                                    <template v-slot:activator="{ props: activatorProps }">                                        
                                            <v-btn v-bind="activatorProps" class="ml-2" variant="text"
                                                size="small"><v-icon size="20">mdi-gauge-empty</v-icon>
                                            </v-btn>                                        
                                    </template>
                                    <v-card prepend-icon="mdi-map-marker"
                                        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
                                        title="Use Google's location service?">
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
                            <v-divider vertical />
                            <v-sheet color="#0E0856" class="d-flex align-center">
                                <small>Refill</small>
                                <v-dialog v-model="dialog" max-width="400" persistent>
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-badge color="success" content="8+">
                                            <v-btn v-bind="activatorProps" class="ml-2" variant="text"
                                                size="small"><v-icon size="20">mdi-gauge-full</v-icon></v-btn>
                                        </v-badge>
                                    </template>
                                    <v-card prepend-icon="mdi-map-marker"
                                        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
                                        title="Use Google's location service?">
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

export default {
    components: {
        LocationTable,
        MainMap,
    },
    data() {
        return {
            dialog: false,

        }
    },
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