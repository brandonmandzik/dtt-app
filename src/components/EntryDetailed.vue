<template>
  <div id="entry-detailed">
    <button
      @click="goBack"
      id="backButton"
      class="btn btn-secondary btn-lg ml-5 position-fixed"
    >&lt; Back</button>
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
    <h3 class="text-center mb-5">
      ↓ Related
      <small class="text-muted">APIs</small> ↓
    </h3>
    <div class="row">
      <div v-for="relatedEntry in relatedEntries" :key="relatedEntry.API" class="col-sm">
        <div class="card w-75 hoverable mx-auto">
          <div class="card-body">
            <h5 class="card-title text-muted">{{relatedEntry.API}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{relatedEntry.Category}}</h6>
            <p class="card-text">{{relatedEntry.Description}}</p>
            <a
              @click="reloadComponent(relatedEntry)"
              href="#"
              onclick="return false"
              class="stretched-link"
            ></a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "entry-detailed",
  props: {
    entry: {}
  },
  data() {
    return {
      relatedEntries: []
    };
  },
  beforeMount() {
    this.getRelatedEntries();
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async getRelatedEntries() {
      const refinedCategoryName =
        this.entry["Category"].indexOf('&') == -1
          ? this.entry.Category
          : this.entry.Category.substring(0, this.entry.Category.indexOf("&"));
      const response = await fetch(
        "https://api.publicapis.org/entries?category=" + refinedCategoryName
      );
      const data = await response.json();
      const relatedEntriesArray = data["entries"];
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * relatedEntriesArray.length);
        this.relatedEntries = [
          ...this.relatedEntries,
          relatedEntriesArray[random]
        ]
      }
    },
    async refreshRelatedEntries() {
      const refinedCategoryName =
        this.entry.Category.indexOf("&") == -1
          ? this.entry.Category
          : this.entry.Category.substring(0, this.entry.Category.indexOf("&"));
      const response = await fetch(
        "https://api.publicapis.org/entries?category=" + refinedCategoryName
      );
      const data = await response.json();
      const relatedEntriesArray = data["entries"];
      this.relatedEntries = [];
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * relatedEntriesArray.length);
        this.relatedEntries = [
          ...this.relatedEntries,
          relatedEntriesArray[random]
        ];
      }
    },
    async reloadComponent(relatedEntry) {
      this.entry = relatedEntry;
      this.refreshRelatedEntries();
    }
  }
};
</script>

<style>
#entry-detailed {
  padding-top: 10%;
}
</style>