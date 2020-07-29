<template>
  <header class="flex justify-around items-baseline bg-gray-200">
    <div class="font-bold text-xl">
      <router-link to="/" class="text-gray-800">StockTrader</router-link>
    </div>
    <nav id="nav" class="p-4">
      <ul class="w-64 flex justify-around">
        <li><router-link :to="{ name: 'Portfolio' }">Portfolio</router-link></li>
        <li><router-link :to="{ name: 'Stocks' }">Stocks</router-link></li>
      </ul>
    </nav>
    <div class="w-40">
      <ul class="flex justify-between text-gray-700">
        <li><a href="#" @click="endDay">End Day</a></li>
        <li class="relative" @mouseenter="menuSaveLoad = true" @mouseleave="menuSaveLoad = false">
          <a href="#">Save & Load</a>
          <ul v-if="menuSaveLoad" class="p-3 absolute right-0 bg-gray-200 text-sm">
            <li><a href="#">Save Data</a></li>
            <li><a href="#">Load Data</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </header>  
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false,
      menuSaveLoad: false
    }
  },
  methods: {
    ...mapActions('stocks', ['randomizeStocks']),
    endDay() {
      this.randomizeStocks();
    }
  }
};
</script>

<style scoped>
#nav a {
  @apply p-4;
  @apply font-bold;
  @apply text-gray-700;
}

#nav a.router-link-exact-active {
  @apply bg-gray-800;
  @apply text-green-500;
}
</style>