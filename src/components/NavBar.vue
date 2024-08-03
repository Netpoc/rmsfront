<template>
    <v-app-bar
        color="#0E0856"
        app
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img max-height="80" :src="require('../assets/volt_icon.png')"></v-img>
        <v-toolbar-title>                  
          Remote Monitoring System</v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>          
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary        
      >
      <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :to="item.to"        
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block to="/">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Dashboard',
          to: '/dashboard',
        },
        {
          title: 'Reports',
          to: '/reports',
        },
        {
          title: 'Profile',
          to: '/profile',
        },
        
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>