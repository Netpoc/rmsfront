<template>
  <v-layout>
    <NavBar />
    <v-main>
      <router-view />
      <v-fab        
        class="pa-5 mb-4"
        location="bottom end"
        icon="mdi-whatsapp"
        size="54"        
        app
        appear
      ></v-fab>
    </v-main>
  </v-layout>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      loggedIn: false,
    }
  },
  
}
</script>

<style>

</style>
