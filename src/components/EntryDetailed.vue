<template>
  <div id="entry-detailed">
    <!-- Go back button -->
    <button
      @click="goBack"
      id="backButton"
      class="btn btn-secondary btn-lg ml-5 position-fixed"
    >Back</button>
    <!-- Major entry card that gets displays -->
    <div class="jumbotron w-50 mx-auto" id="entryCard" ref="topElement">
      <h1 class="display-4">{{entry.API}}</h1>
      <p class="lead">{{entry.Description}}</p>
      <hr class="my-4" />
      <!-- API Row -->
      <p class="h4 ml-3" id="tableRow">
        API:
        <span class="lead">
          <p class="ml-3">{{entry.Auth}}</p>
        </span>
      </p>
      <!-- HTTPS Row -->
      <p class="h4 ml-3" id="tableRow">
        HTTPS:
        <span class="lead">
          <p class="ml-3">{{entry.HTTPS}}</p>
        </span>
      </p>
      <!-- CORS Row -->
      <p class="h4 ml-3" id="tableRow">
        CORS:
        <span class="lead">
          <p class="ml-3">{{entry.Cors}}</p>
        </span>
      </p>
      <!-- Link Row -->
      <p class="h4 ml-3" id="tableRow">
        Link:
        <a :href="entry.Link" target="_blank" class="lead">
          <p class="ml-3 text-muted" id="linkPlaintext">{{entry.Link}}</p>
          <button
            type="button"
            class="btn btn-secondary btn-sm ml-3 mt-1 d-none"
            id="linkButton"
          >Click Me</button>
        </a>
      </p>
      <!-- Category Row -->
      <p class="h4 ml-3" id="tableRow">
        Category:
        <span class="lead">
          <p class="ml-3">{{entry.Category}}</p>
        </span>
      </p>
    </div>
    <!-- Beginning of related APIs -->
    <h3 class="text-center mb-5">
      ↓ Related
      <small class="text-muted">APIs</small> ↓
    </h3>
    <div class="row">
      <!-- Related entries - looped -->
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
    // entry passed the router-link
    entry: {}
  },
  data() {
    return {
      // related entries by category
      relatedEntries: []
    };
  },
  beforeMount() {
    // before mounting the component should fetch the related entries
    this.getRelatedEntries();
  },
  methods: {
    // goes -1 back in the router history
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    // retrieves related APIs by "random" picking up three other APIs where the category is matching
    async getRelatedEntries() {
      // Category name may consist two words with a "&" beetween
      // needs to be check and refined
      // when "&" contained -> use only first word
      const refinedCategoryName =
        this.entry["Category"].indexOf("&") == -1
          ? this.entry.Category
          : this.entry.Category.substring(0, this.entry.Category.indexOf("&"));
      const response = await fetch(
        "https://api.publicapis.org/entries?category=" + refinedCategoryName
      );
      const data = await response.json();
      const relatedEntriesArray = data["entries"];
      // picked "randomly" three entries
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * relatedEntriesArray.length);
        this.relatedEntries = [
          ...this.relatedEntries,
          relatedEntriesArray[random]
        ];
      }
    },
    // same as getRelatedAPIs()
    // DIFFERENCE: is clearing the relatedEntries[] 
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
    // reloadComponent is invokes after clicking on a related entry
    // new entries will be fetched and the window scrolled up
    async reloadComponent(relatedEntry) {
      this.entry = relatedEntry;
      this.refreshRelatedEntries();
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
#entry-detailed {
  padding-top: 10%;
}

@media (max-width: 800px){
  #entry-detailed {
    padding-top: 12%;
  }
}

@media (max-width: 426px){
  #entry-detailed {
    padding-top: 25%;
  }
}
</style>