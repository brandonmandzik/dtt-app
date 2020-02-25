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
          <nav class="container navbar navbar-expand-md navbar-light bg-light mb-5 mt-2">
            <span class="navbar-brand h1 mx-5">DTT</span>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav navbar-collapse" id="navbarToggler">
              <!-- router links -->
              <router-link to="/" class="nav-item nav-link mr-2">Home</router-link>
              <router-link to="/category" class="nav-item nav-link mx-2">Category</router-link>
              <router-link to="/random" class="nav-item nav-link mx-2">Random</router-link>
              <router-link to="/about" class="nav-item nav-link mx-2">About Me</router-link>
            </div>
          </nav>
        </div>
      </div>
      <!-- component content -->
      <router-view />
      <footer class="footer mt-auto bg-light pt-3">
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th class="py-2 w-25"></th>
              <th class="py-2 text-center w-25 lead footerRow">Application</th>
              <th class="py-2 text-center w-25 lead">Personal</th>
              <th class="py-2 w-25"></th>
            </tr>
            <tr>
              <td class="py-2 w-25"></td>
              <td class="py-2 text-center">
                <router-link class="text-muted" to="/">{{paths[0].displayName}}</router-link>
              </td>
              <td class="py-2 text-center">
                <router-link class="text-muted" to="/about">{{paths[4].displayName}}</router-link>
              </td>
              <td class="py-2 w-25"></td>
            </tr>
            <tr>
              <td class="py-2 w-25"></td>
              <td class="py-2 text-center">
                <router-link class="text-muted" to="/category">{{paths[1].displayName}}</router-link>
              </td>
              <td class="py-2 w-25"></td>
              <td class="py-2 w-25"></td>
            </tr>
            <tr>
              <td class="pt-2 pb-4 w-25"></td>
              <td class="pt-2 pb-4 text-center">
                <router-link class="text-muted" to="/random">{{paths[3].displayName}}</router-link>
              </td>
              <td class="pt-2 pb-4 w-25"></td>
              <td class="pt-2 pb-4 w-25"></td>
            </tr>
          </tbody>
        </table>
      </footer>
    </div>
  </div>
</template>

<script>
import routes from "./routes.js";

export default {
  name: "App",
  components: {},
  data() {
    return {
      paths: routes
    };
  },
  beforeMount() {},
  methods: {}
};
</script>

<style>
#bgVid {
  min-width: 100%;
  min-height: 100%;
  top: 0%;
  z-index: -1;
}
.footerRow {
  left: 12.5%;
}

.footerW-33 {
  width: 33.3%;
}
</style>
