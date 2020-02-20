<template>
  <div id="app">
    <!-- Background video for the application -->
    <video autoplay muted loop class="position-fixed" id="bgVid">
      <source src="./assets/vid/backgroundVid.mp4" type="video/mp4" />
    </video>
    <!-- container for content -->
    <div class="container">
      <div id="navigation-bar">
        <div class="fixed-top">
            <nav class="container navbar navbar-expand navbar-light bg-light mb-5 mt-2">
                <span class="navbar-brand h1 mr-5">DTT</span>
                <div class="navbar-nav navbar-collapse">
                  <!-- router links -->
                  <router-link to='/' class="nav-item nav-link">Home</router-link>
                  <router-link to='/category' class="nav-item nav-link">Category</router-link>
                  <router-link to='/' class="nav-item nav-link">Random</router-link>
                  <router-link to='/' class="nav-item nav-link">About Me</router-link>
                </div>
            </nav>
        </div>
      </div>
      <!-- component content -->
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  data() {
    return {
    }
  },
  methods: {}
};
</script>

<style>
#bgVid{
  min-width: 100%;
  min-height: 100%;
  top: 0%;
  z-index: -1;
}
</style>
