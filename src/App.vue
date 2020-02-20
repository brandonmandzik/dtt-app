<template>
  <div id="app">
    <!-- Background video for the application -->
    <video autoplay muted loop class="position-fixed" id="bgVid">
      <source src="./assets/vid/backgroundVid.mp4" type="video/mp4" />
    </video>
    <!-- container for content -->
    <div class="container">
      <base-layout @select:page="displayPage"/>
      <!-- select active components -->
      <div v-if=" active === 'home' ">
        <entry-table :entries="entries" />
      </div>

    </div>
  </div>
</template>

<script>
import EntryTable from "./components/EntryTable.vue";
import BaseLayout from "./components/BaseLayout.vue";

export default {
  name: "App",
  components: {
    EntryTable,
    BaseLayout,
  },
  mounted() {
    this.getAPIs();
  },
  data() {
    return {
      entries: [],
      active: "home",
    };
  },
  methods: {
    // fetches 10 random public apis to display
    async getAPIs() {
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://api.publicapis.org/random");
        const data = await response.json();
        const id = i;
        const newEntry = { ...data["entries"][0], id };
        this.entries = [...this.entries, newEntry];
      }
    },
    // parameter is a string passed from the BaseLayout component
    displayPage(page){
      this.active = page
    }
  }
};
</script>

<style>
#bgVid{
  min-width: 100%;
  min-height: 100%;
  top: 0%;
}
</style>
