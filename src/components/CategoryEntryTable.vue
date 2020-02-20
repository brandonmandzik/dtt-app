<template>
  <div id="category-entry-table">
    <div class="justify-content-center">
      <button @click="goBack" id="backButton" class="btn btn-secondary btn-lg ml-5">&lt; Back</button>
      <h1 class="text-center">{{categoryName}}</h1>
      <div v-for="entry in entries" :key="entry.API" class="row justify-content-center my-5">
        <div class="card w-50 hoverable">
          <div class="card-body">
            <h5 class="card-title">{{entry.API}}</h5>
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
      const response = await fetch(
        "https://api.publicapis.org/entries?category=" + this.categoryName
      );
      const data = await response.json();
      this.entries = data["entries"];
    }
  }
};
</script>

<style>
#category-entry-table {
  padding-top: 10%;
}
</style>
