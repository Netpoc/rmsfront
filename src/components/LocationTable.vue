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
          v-for="item in desserts"
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
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 'Grid',
            duration: '29h:45min'
          },
          {
            name: 'Ice cream sandwich',
            calories: 'Grid',
            duration: '29h:45min',
          },
          {
            name: 'Eclair',
            calories: 'Gen',
            duration: '29h:45min',
          },
          {
            name: 'Cupcake',
            calories: 'Gen',
            duration: '29h:45min',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            duration: '29h:45min',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            duration: '0h:5min',
          },
          {
            name: 'Lollipop',
            calories: 392,
            duration: '2h:5min',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            duration: '0h:45min',
          },
          {
            name: 'Donut',
            calories: 452,
            duration: '2h:5min'
          },
          {
            name: 'KitKat',
            calories: 518,
            duration: '9h:45min'
          },
        ],
      }
    },
  }
</script>