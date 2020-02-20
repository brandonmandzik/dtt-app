<template>
  <div id="base-layout">
    <div class="fixed-top">
        <nav class="container navbar navbar-expand navbar-light bg-light mb-5 mt-2">
            <span class="navbar-brand h1 mr-5">DTT</span>
            <div class="navbar-nav navbar-collapse">
                <a @click="selectComponent('home')" :class="{'active': activePage === 'home' }" class="nav-item nav-link">Home</a>
                <a @click="selectComponent('category')" :class="{'active': activePage === 'category' }" class="nav-item nav-link">Category</a>
                <a @click="selectComponent('random')" :class="{'active': activePage === 'random' }" class="nav-item nav-link">Random</a>
                <a @click="selectComponent('aboutme')" :class="{'active': activePage === 'aboutme' }" class="nav-item nav-link">About Me</a>
            </div>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: "base-layout",
    data() {
        return{
            activePage: "home",
        }
    },
    methods: { 
        selectComponent(page){
            this.activePage = page
            this.$emit("select:page", page)
        },
    },
}
</script>

<style>
</style>