<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
      <v-fab color="green" class="pa-5 mb-4" location="bottom end" icon="mdi-whatsapp" size="54" app appear></v-fab>
      <v-footer class="d-flex flex-column">
    <v-card color="#92D050" class="d-flex w-100 align-center px-4">
      <strong class="d-none d-md-block">Actionable insight for effective descision making!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </v-card>

    <v-sheet color="#0E0856" class="px-4 py-2 text-center w-100">      
      {{ new Date().getFullYear() }} © <p class="text-subtitle-2">Volatage & Wattage Ltd</p>
    </v-sheet>
  </v-footer>
    </v-main>
  </v-app>
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
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  },

}
</script>

<style></style>
