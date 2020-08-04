<template>
  <div class="flex justify-around flex-wrap">
    <app-stock class="m-6 mb-0" v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from "../components/portfolio/Stock.vue";
export default {
  components: {
    appStock: Stock
  },
  computed: {
    ...mapGetters('portfolio', {
      stocks: 'stockPortfolio'
    })
  }
}
</script>

<style>

</style>