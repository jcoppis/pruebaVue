<template>
  <div class="w-64 rounded-md border-blue-200 border-2">
    <div class="px-4 py-2 bg-blue-200 text-blue-800 border-blue-200 border-b-2">
        <p class="font-bold"><span class="uppercase">{{ stock.name }}</span> <span class="text-xs text-blue-700">(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</span></p>
    </div>
    <div class="p-4 flex justify-between">
      <input v-model="quantity" type="number" placeholder="Quantity" class="p-1 w-2/3 border-2 rounded-md">
      <button :disabled="quantity <= 0" @click="sellStock" class="bg-blue-500 text-white px-3 rounded-md">Sell</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0
    }
  },
  methods: {
    ...mapActions('portfolio', {
      placeSellOrder: 'sellStock'
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    }
  }
}
</script>

<style scoped>
button:disabled {
  @apply bg-blue-300
}

</style>