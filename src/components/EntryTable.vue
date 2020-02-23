<template>
  <div id="entry-table">
    <!-- Back Button -->
    <div class="dropdown">
      <button
        class="btn btn-lg btn-secondary dropdown-toggle ml-5 position-fixed"
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
    <!-- Info Card -->
    <div class="card text-center mx-auto mb-5" id="infoCard">
      <div class="card-header">api.publicapis.org</div>
      <div class="card-body">
        <h5 class="card-title">Information</h5>
        <p class="card-text">
          The application provides data about public APIs in the internet. Feel free to explore and find
          your best fitting API for your purpose. This is just a UI Design of the Backend API.
        </p>
        <router-link to="/category" class="nav-item nav-link">
          <a href="#" class="btn btn-primary">Explore</a>
        </router-link>
      </div>
      <div class="card-footer text-muted"></div>
    </div>
    <!-- Entries -->
    <div v-for="entry in entries" :key="entry.id" class="row justify-content-center mb-5">
      <div class="card w-50 hoverable">
        <div class="card-body">
          <router-link :to="{name: 'detailedEntry', params: {entry: entry}}" class="stretched-link"></router-link>
          <h5 class="card-title text-muted">{{entry.API}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{entry.Category}}</h6>
          <p class="card-text">{{entry.Description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "entry-table",
  beforeMount() {
    this.getAPIs();
  },
  data() {
    return {
      entries: []
    };
  },
  methods: {
    async getAPIs() {
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://api.publicapis.org/random");
        const data = await response.json();
        const id = i;
        const newEntry = { ...data["entries"][0], id };
        this.entries = [...this.entries, newEntry];
      }
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
#entry-table {
  padding-top: 10%;
}

#infoCard {
  width: 65%;
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  #entry-table {
    padding-top: 30%;
  }
}
</style>