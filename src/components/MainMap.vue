<template>
    <v-sheet color="#92D050" class="pa-5 rounded-xl fill-height">
        <v-card id="map" style="width: 100%; height: 80vh;"></v-card>
    </v-sheet>
  </template>
  
  <script>
export default {
  name: "HereMap",
  mounted() {
    // Initialize the platform object:
    const platform = new H.service.Platform({
      apikey: "YWsaVxOHSK3uFiDTkcWXrT45MV4WdkJHEHvFMlDKcPA"
    });

    // Obtain the default map types from the platform object:
    const defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    const map = new H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        zoom: 11,
        center: { lat: 6.5544, lng: 3.4792 } // Berlin, for example
      }
    );

    // Enable the event system on the map instance:
    const mapEvents = new H.mapevents.MapEvents(map);

    // Instantiate the default behavior, providing the mapEvents object:
    new H.mapevents.Behavior(mapEvents);

    // Create the default UI components:
    H.ui.UI.createDefault(map, defaultLayers);

    // Add a marker to the map:
    const marker = new H.map.Marker({ lat: 6.426096736434921, lng: 3.4418601741267856 }); 
    map.addObject(marker);

    // Create an info bubble
    const bubble = new H.ui.InfoBubble(
      { lat: 6.426096736434921, lng: 3.4418601741267856 },
      {
        content: '<div><strong>Location Info</strong><br>Bank Data Center</div>'
      }
    );

    // Add event listeners to the marker
    marker.addEventListener('tap', () => {
      bubble.open();
    });

    marker.addEventListener('pointerenter', () => {
      bubble.open();
    });

    marker.addEventListener('pointerleave', () => {
      bubble.close();
    });

    // Add the bubble to the UI
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    ui.addBubble(bubble);
    bubble.close(); // Close the bubble initially
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
  background: grey;
}
</style>