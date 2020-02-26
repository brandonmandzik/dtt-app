<template>
  <div id="entry-table" class="position-relative">
    <!-- Sort Button -->
    <div class="dropdown position-fixed ml-5">
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
    <!-- Info Card w/ desc. about the api link -->
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
    <!-- Entries - looped -->
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
      // entries - [] of 10 random entries
      entries: []
    };
  },
  methods: {
    // getAPIs fetches ten times in a loop a random entry and appends to our entries data
    async getAPIs() {
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://api.publicapis.org/random");
        const data = await response.json();
        const id = i;
        const newEntry = { ...data["entries"][0], id };
        this.entries = [...this.entries, newEntry];
      }
    },
    // sort entries ascending by name
    async sortEntriesASC() {
      this.entries = this.sortedArrayASC;
    },
    // sort entries descending by name
    async sortEntriesDESC() {
      this.entries = this.sortedArrayDESC;
    }
  },
  computed: {
    // the actual sorting functions which return the new array and assigne to the entries data
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

div.dropdown {
  z-index: 999;
}

#infoCard {
  width: 65%;
}

@media (max-width: 992px) {
  #entry-table {
    padding-top: 15%;
  }

  div.dropdown {
    margin-left: 1rem !important;
  }
}

@media (max-width: 800px) {
  div.dropdown {
    left: 50%;
    width: 60%;
    margin-left: -30% !important;
    position: relative !important;
  }

  div.dropdown button {
    width: 100%;
  }

  #infoCard {
    margin-top: 2rem;
  }
}

@media (max-width: 425px) {
  #entry-table {
    padding-top: 25%;
  }
}

@media (max-width: 375px) {
  #entry-table {
    padding-top: 30%;
  }
}
</style>