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
            Duration
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in locations"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ item.duration }}</td>
          <td>
            <v-btn to="locationdetail" variant="text" >
            <v-icon>mdi-monitor-eye</v-icon>
            </v-btn>
        </td>
        </tr>
      </tbody>
    </v-table>
  </template>
  <script>
import api from '@/services/api';

  export default {
    data () {
      return {
        locations: [],
        desserts: [
          {
            name: 'Mobolaji Bank Anthony',
            calories: 'Grid',
            duration: '29h:45min'
          },
          {
            name: 'Shangisha Branch',
            calories: 'Grid',
            duration: '29h:45min',
          },
          {
            name: 'Allen Avenue',
            calories: 'Gen',
            duration: '29h:45min',
          },
          {
            name: 'Saka Tinubu',
            calories: 'Gen',
            duration: '29h:45min',
          },
          {
            name: 'Ketu-Ogudu II',
            calories: "Grid",
            duration: '29h:45min',
          },
          {
            name: 'Dopemu/Akowonjo',
            calories: 'Gen 2',
            duration: '0h:5min',
          },
          {
            name: 'Mafoluku Data Center',
            calories: 'Solar',
            duration: '2h:5min',
          }
          
        ],
      }
    },
    async mounted () {
      this.getLocations();
    },
    methods: {
      async getLocations () {
        try {
          const response = await api.getAllDevices();
          this.locations = response.data.result
          console.log(this.locations);

        } catch (error) {
          console.error("Location list error", error)
        }
      }
    }
  }
</script>