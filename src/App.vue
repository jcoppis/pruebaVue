<template>
  <div id="app">
    <app-header />
    <hr />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch('stocks/setStocks');
  }
};
</script>

<style>
</style>
