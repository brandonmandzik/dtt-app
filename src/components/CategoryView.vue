<template>
  <div id="category-view">
    <div class="jumbotron">
      <h1 class="display-4">Choose a category!</h1>
      <p
        class="lead"
      >api.publicapi.org holds many differenet entries of public APIs, which you can use. Most of these are categorised.</p>
      <hr class="my-4" />
      <p>Please click on a category in order to see matching APIs.</p>
      <router-link 
        v-for="category in categories"
        :key="category"
        class="btn btn-secondary btn-lg m-1"
        role="button"
        :to="'/category/'+category"
      >{{category}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "category-view",
  data() {
    return {
      categories: []
    };
  },
  beforeMount() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const response = await fetch("https://api.publicapis.org/categories");
      const data = await response.json();
      this.categories = data;
    }
  }
};
</script>

<style>
#category-view {
  padding-top: 8%;
}

@media (max-width: 425px) {
  #category-view {
    padding-top: 25%;
  }
}
</style>