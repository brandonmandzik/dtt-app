<template>
  <div id="entry-table">
       <div v-for="entry in entries" :key="entry.id" class="row justify-content-center my-5">
            <div class="card w-50 hoverable">
                <div class="card-body">
                    <h5 class="card-title">{{entry.API}}</h5>
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
      return{
        entries: [],
      }
  },
  methods:{
    async getAPIs() {
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://api.publicapis.org/random");
        const data = await response.json();
        const id = i;
        const newEntry = { ...data["entries"][0], id };
        this.entries = [...this.entries, newEntry];
      }
    },
  } 
}
</script>

<style>
#entry-table{
    padding-top: 6.5%;
}

@media only screen 
and (min-device-width : 375px) 
and (max-device-width : 667px)
and (-webkit-min-device-pixel-ratio: 2) {
  #entry-table {
    padding-top: 30%;
  }
}

</style>