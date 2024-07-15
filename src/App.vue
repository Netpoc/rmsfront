<template>
  <v-layout>
    <NavBar />
    <v-main>
      <router-view />
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
  }
}
</script>

<style>

</style>
