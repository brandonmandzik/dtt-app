<template>
  <div id="category-entry-table">
    <div class="justify-content-center">
      <div class="position-fixed ml-5">
        <div class="row mb-3">
          <button
            @click="goBack"
            id="backButton"
            class="btn btn-secondary btn-lg w-100"
          >Back</button>
        </div>
        <div class="row">
          <div class="dropdown">
            <button
              class="btn btn-lg btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Sort</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a @click="sortEntriesASC" class="dropdown-item">Sort by Name ↑</a>
              <a @click="sortEntriesDESC" class="dropdown-item">Sort by Name ↓</a>
            </div>
          </div>
        </div>
      </div>

      <h1 class="text-center">{{categoryName}}</h1>
      <div v-for="entry in entries" :key="entry.API" class="row justify-content-center my-5">
        <div class="card w-50 hoverable">
          <div class="card-body">
            <router-link
              :to="{name: 'detailedEntry', params: {entry: entry}}"
              class="stretched-link"
            ></router-link>
            <h5 class="card-title text-muted">{{entry.API}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{entry.Category}}</h6>
            <p class="card-text">{{entry.Description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "category-entry-table",
  data() {
    return {
      entries: []
    };
  },
  props: {
    categoryName: String
  },
  beforeMount() {
    this.getCategoryEntries();
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async getCategoryEntries() {
      const refinedCategoryName =
        this.categoryName.indexOf("&") == -1
          ? this.categoryName
          : this.categoryName.substring(0, this.categoryName.indexOf("&"));
      const response = await fetch(
        "https://api.publicapis.org/entries?category=" + refinedCategoryName
      );
      const data = await response.json();
      this.entries = data["entries"];
    },
    async sortEntriesASC() {
      this.entries = this.sortedArrayASC;
    },
    async sortEntriesDESC() {
      this.entries = this.sortedArrayDESC;
    }
  },
  computed: {
    sortedArrayASC: function() {
      function compare(a, b) {
        if (a.API < b.API) return -1;
        if (a.API > b.API) return 1;
        return 0;
      }
      const clone = [].concat(this.entries);
      return clone.sort(compare);
    },
    sortedArrayDESC: function() {
      function compare(a, b) {
        if (a.API < b.API) return 1;
        if (a.API > b.API) return -1;
        return 0;
      }
      const clone = [].concat(this.entries);
      return clone.sort(compare);
    }
  }
};
</script>

<style>
#category-entry-table {
  padding-top: 10%;
}
</style>
