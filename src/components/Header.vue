<template>
  <header class="px-3 flex justify-between items-baseline bg-gray-300">
    <div class="font-bold text-xl">
      <router-link to="/" class="text-gray-800">StockTrader</router-link>
    </div>
    <nav id="nav" class="p-4">
      <ul class="nav__links">
        <li><router-link :to="{ name: 'Portfolio' }">Portfolio</router-link></li>
        <li><router-link :to="{ name: 'Stocks' }">Stocks</router-link></li>
      </ul>
    </nav>
    <ul class="func__links text-gray-700">
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
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" v-if="isLoggedIn" @click="logout">Logout</button>
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
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('portfolio', ['funds', 'stockPortfolio']),
    ...mapGetters('stocks', ['stocks'])
  },
  methods: {
    ...mapActions('stocks', ['randomizeStocks']),
    ...mapActions({
      fetchData: 'loadData',
      putData: 'saveData'
    }),
    endDay() {
      this.randomizeStocks();
    },
    saveData() {
      const data = {
        funds: this.funds,
        stockPortfolio: this.stockPortfolio,
        stocks: this.stocks
      };
      this.putData(data);
    },
    loadData() {
      this.fetchData();
    },
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>

<style scoped>

.nav__links {
  @apply list-none;
}

.nav__links li {
  @apply inline-block;
}

.nav__links a {
  @apply p-4;
  @apply font-bold;
  @apply text-gray-700;
}

.nav__links a.router-link-exact-active {
  @apply bg-gray-800;
  @apply text-green-500;
}

.func__links li {
  @apply inline-block;
}

</style>