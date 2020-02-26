<template>
  <div id="category-entry-table">
    <div class="justify-content-center">
      <!-- Util Buttons -->
      <div class="position-fixed ml-5" id="CategoryEntryButtons">
        <!-- Back Button -->
        <div class="row mb-3 ml-1">
          <button @click="goBack" id="backButton" class="btn btn-secondary btn-lg w-100">Back</button>
        </div>
        <!-- Sort Button -->
        <div class="row ml-1" id="sortButton">
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
      <!-- Title -->
      <h1 class="text-center" id="categoryTitle">{{categoryName}}</h1>
      <!-- Entries - looped -->
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
      // entries - [] of entries with specified category
      entries: []
    };
  },
  props: {
    // categoryName is passed via URL / props from the router-link
    categoryName: String
  },
  beforeMount() {
    // getCategoryEntries() fetches corresponding entries before mount
    this.getCategoryEntries();
  },
  methods: {
    goBack() {
      // goes -1 back in the router history
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    // getCategoryEntries() calls /entries endpoint with specified category name
    async getCategoryEntries() {
      // categoryName needs to be refind because it can contain two or more words
      // needs to be checked if "&" is contained
      // if yes -> use first word
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
    // assignes the entries[] data to the computed sorted []
    async sortEntriesASC() {
      this.entries = this.sortedArrayASC;
    },
    async sortEntriesDESC() {
      this.entries = this.sortedArrayDESC;
    }
  },
  computed: {
    // computed functions for returning sorted entries[]
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

@media (max-width: 769px) {
  #category-entry-table {
    padding-top: 6%;
  }

  #CategoryEntryButtons {
    position: relative !important;
    margin-left: 0rem !important;
  }

  #backButton {
    visibility: hidden;
  }

  #sortButton {
    margin-left: 0rem !important;
    margin-right: 0rem !important;
  }

  #categoryTitle {
    margin-top: 2rem;
  }
}

@media (max-width: 425px) {
  #category-entry-table {
    padding-top: 9%;
  }
}

@media (max-width: 375px) {
  #category-entry-table {
    padding-top: 11.5%;
  }
}
</style>
