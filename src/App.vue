<template>
  <div id="app">
    <Playing v-if="this.hasAuthorization"/>
    <router-view />
  </div>
</template>
<script>
import Playing from "./components/Playing.vue"
export default {
  components: {
    Playing
  },
  computed: {
    hasAuthorization() {
      return this.$store.getters.getAuthorization !== "" ? true : false;
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background-color:rgb(243, 243, 243);
}
</style>
