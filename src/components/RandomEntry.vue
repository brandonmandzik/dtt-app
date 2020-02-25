<template>
  <div id="random-entry">
    <button
      @click="getRandomEntry"
      class="btn btn-secondary btn-lg ml-5 position-fixed"
      id="rerollButton"
    >re-roll</button>
    <button
      @click="getRandomEntry"
      class="btn btn-dark btn-lg position-fixed d-none"
      id="rerollButtonSM"
    >🎲</button>
    <div class="jumbotron w-50 mx-auto" id="entryCard">
      <h1 class="display-4">{{entry.API}}</h1>
      <p class="lead">{{entry.Description}}</p>
      <hr class="my-4" />
      <p class="h4 ml-3" id="tableRow">
        API:
        <span class="lead">
          <p class="ml-3">{{entry.Auth}}</p>
        </span>
      </p>
      <p class="h4 ml-3" id="tableRow">
        HTTPS:
        <span class="lead">
          <p class="ml-3">{{entry.HTTPS}}</p>
        </span>
      </p>
      <p class="h4 ml-3" id="tableRow">
        CORS:
        <span class="lead">
          <p class="ml-3">{{entry.Cors}}</p>
        </span>
      </p>
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
      <p class="h4 ml-3" id="tableRow">
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

@media (max-width: 800px) {
  #random-entry {
    padding-top: 12%;
  }

  #rerollButton {
    margin-top: 10%;
    margin-left: 0rem;
  }

  #entryCard {
    padding: 2rem 2rem;
  }

  .display-4 {
    font-size: 2.5rem !important;
  }
  #linkPlaintext {
    display: none !important;
  }
  #linkButton {
    display: block !important;
    width: 45%;
  }
}

@media (max-width: 426px) {
  #random-entry {
    padding-top: 25%;
  }
  #rerollButton {
    margin-left: 0rem;
    display: none;
  }

  #rerollButtonSM {
    display: block !important;
  }

  .display-4 {
    font-size: 2rem !important;
  }

  #linkPlaintext {
    display: none !important;
  }
  #linkButton {
    display: block !important;
  }
}

@media (max-width: 376px) {
  #linkButton {
    padding: 0rem 0rem;
  }
  .display-4 {
    font-size: 1.5rem !important;
    font-weight: 400 !important;
  }

  #tableRow {
    margin-left: -1rem !important;
  }

}
</style>