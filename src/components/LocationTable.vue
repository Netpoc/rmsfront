<template>
    <v-table height="70vh">
      <thead>
        <tr>
          <th class="text-left">
            Location
          </th>
          <th class="text-left">
            Power Source
          </th>
          <th class="text-left">
            Alert
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody v-for="data in locations" :key="data">
        <tr>
          <td>{{ data['telemetry']['device.name'].value }}</td>
          <td>
            <span  v-if="data['telemetry']['din.1'].value == true">Grid <v-icon size="25" color="yellow" class="ml-2">mdi-lightbulb-on-10</v-icon></span>
            <span v-if="data['telemetry']['din.2'].value == true">Generator <v-icon size="25" color="warning" class="ml-2">mdi-generator-stationary</v-icon></span>
          </td>
          <td><v-btn size="small" variant="text"><v-icon>mdi-storage-tank-outline</v-icon></v-btn></td>
          <td>
            <v-btn to="locationdetail" variant="text" >
            <v-icon>mdi-monitor-eye</v-icon>
            </v-btn>
        </td>
        </tr>
      </tbody>
    </v-table>
    <div>
      
    </div>
  </template>
  <script>
import api from '@/services/api';

  export default {
    data () {
      return {
        locations: [],
        cleanData: []
      }
    },
    async mounted () {
      this.getLocations();
      
    },
    
    methods: {
      async getLocations () {
        try {
          const response =await api.getLiveData();
          
          this.locations = response.data.result
          console.log(this.locations)
                   
         // console.log('Information:', this.locations.flat(1));
        } catch (error) {
          console.error("Location list error", error)
        }
      }
    }
  }
</script>