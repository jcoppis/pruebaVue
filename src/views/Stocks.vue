<template>
  <div class="flex justify-around flex-wrap">
    <app-stock class="m-6 mb-0" v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </div>
</template>

<script>
import Stock from "@/components/stocks/Stock.vue";
export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters['stocks/stocks'];
    }
  }
}
</script>

<style>

</style>