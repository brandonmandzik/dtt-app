<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 mt-2">
      <span class="navbar-brand h1">DTT</span>
      <div class="navbar-nav navbar-collapse">
        <a class="nav-item nav-link active ml-5" href="">Home </a>
        <a class="nav-item nav-link" href="">Random</a>
        <a class="nav-item nav-link" href="">About Me</a>
      </div>  
    </nav>
    <entry-table :entries="entries"/>
  </div>
</template>

<script>
import EntryTable from "./components/EntryTable.vue"

export default {
  name: 'App',
  components: {
    EntryTable
  },
  mounted() {
   this.getAPIs() 
  },
  data() {
    return{
      entries: []
    }
  },
  methods:{
    async getAPIs(){
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://api.publicapis.org/random")
        const data = await response.json()
        const id = i
        const newEntry = {...data["entries"][0],id}
        this.entries = [...this.entries, newEntry]
      }
    },
  }
}
</script>

<style>
</style>
