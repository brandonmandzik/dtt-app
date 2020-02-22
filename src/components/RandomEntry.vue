<template>
  <div id="random-entry">
    <div class="jumbotron w-50 mx-auto">
      <h1 class="display-4">{{entry.API}}</h1>
      <p class="lead">{{entry.Description}}</p>
      <hr class="my-4" />
      <p class="h4 ml-3">
        API:
        <span class="lead">
          <p class="ml-3">{{entry.Auth}}</p>
        </span>
      </p>
      <p class="h4 ml-3">
        HTTPS:
        <span class="lead">
          <p class="ml-3">{{entry.HTTPS}}</p>
        </span>
      </p>
      <p class="h4 ml-3">
        CORS:
        <span class="lead">
          <p class="ml-3">{{entry.Cors}}</p>
        </span>
      </p>
      <p class="h4 ml-3">
        Link:
        <a :href="entry.Link" class="lead">
          <p class="ml-3 text-muted">{{entry.Link}}</p>
        </a>
      </p>
      <p class="h4 ml-3">
        Category:
        <span class="lead">
          <p class="ml-3">{{entry.Category}}</p>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "random-entry",
  data() {
    return {
      entry: {}
    };
  },
  beforeMount() {
    this.getRandomEntry();
  },
  methods: {
    async getRandomEntry() {
      const response = await fetch("https://api.publicapis.org/random");
      const data = await response.json();
      this.entry = data["entries"][0];
    }
  }
};
</script>

<style>
#random-entry {
  padding-top: 10%;
}
</style>