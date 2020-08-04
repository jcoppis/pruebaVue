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
    <div class="w-64">
      <ul class="flex justify-between text-gray-700">
        <li><a href="#" @click="endDay">End Day</a></li>
        <li class="relative" @mouseenter="menuSaveLoad = true" @mouseleave="menuSaveLoad = false">
          <a href="#">Save & Load</a>
          <ul v-if="menuSaveLoad" class="p-3 absolute right-0 bg-gray-200 text-sm">
            <li><a href="#" @click="saveData">Save Data</a></li>
            <li><a href="#" @click="loadData">Load Data</a></li>
          </ul>
        </li>
        <strong>Funds: {{ funds }}</strong>
      </ul>
    </div>
  </header>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false,
      menuSaveLoad: false
    }
  },
  computed: {
    ...mapGetters('portfolio', ['funds', 'stockPortfolio']),
    ...mapGetters('stocks', ['stocks'])
  },
  methods: {
    ...mapActions('stocks', ['randomizeStocks']),
    ...mapActions({fetchData: 'loadData'}),
    endDay() {
      this.randomizeStocks();
    },
    async saveData() {
      const data = {
        funds: this.funds,
        stockPortfolio: this.stockPortfolio,
        stocks: this.stocks
      };

      const options = {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      await (fetch('https://vuejs-stock-trader-eca7a.firebaseio.com/data.json', options).then(res => res.json()));
    },
    loadData() {
      console.log('entre');
      this.fetchData();
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