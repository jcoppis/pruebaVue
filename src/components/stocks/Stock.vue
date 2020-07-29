<template>
  <div class="w-64 rounded-md border-green-200 border-2">
    <div class="px-4 py-2 bg-green-200 text-green-800 border-green-200 border-b-2">
        <p class="font-bold"><span class="uppercase">{{ stock.name }}</span> <span class="text-xs text-green-700">(Price: {{ stock.price }})</span></p>
    </div>
    <div class="p-4 flex justify-between">
      <input v-model="quantity" type="number" placeholder="Quantity" class="p-1 w-2/3 border-2 rounded-md">
      <button :disabled="quantity <= 0" @click="buyStock" class="bg-green-500 text-white px-3 rounded-md">Buy</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: parseInt(this.quantity) //VER
      };
      this.$store.dispatch('stocks/buyStock', order);
      this.quantity = 0;
    }
  }
}
</script>

<style scoped>
button:disabled {
  @apply bg-green-300
}

</style>