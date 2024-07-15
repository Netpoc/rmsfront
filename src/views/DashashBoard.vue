<template>    
    <v-container fluid>        
        <v-row>
            <v-col md="7">
                <a-carousel class="fill-height" autoplay>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </a-carousel>
            </v-col>
            <v-col md="5">
                <v-sheet color="grey" class="pa-5 rounded-xl fill-height">
                    <v-card class="rounded-lg">
                        <v-card-text class="d-flex align-center justify-space-between">
                            <v-sheet class="d-flex align-center">
                                <small>Device Error</small>
                                <v-btn variant="text" size="small"><v-icon>mdi-engine</v-icon></v-btn>
                            </v-sheet>
                            <v-divider vertical/>
                            <v-sheet class="d-flex align-center">
                                <small>Drain</small>
                                <v-btn variant="text" size="small"><v-icon>mdi-engine</v-icon></v-btn>
                            </v-sheet>
                            <v-divider vertical/>
                            <v-sheet class="d-flex align-center">
                                <small>Low Fuel</small>
                                <v-btn variant="text" size="small"><v-icon>mdi-gauge-empty</v-icon></v-btn>
                            </v-sheet>
                            <v-divider vertical/>
                            <v-sheet class="d-flex align-center">
                                <small>Refill</small>
                                <v-btn variant="text" size="small"><v-icon>mdi-gauge-full</v-icon></v-btn>
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

export default {
    components: {
        LocationTable
    },
    data() {
        return {

        }
    },
}
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
    text-align: center;
    height: 85vh;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>