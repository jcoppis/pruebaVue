<template>
  <div>
    <h1 class="text-4xl font-bold text-center">Trade or View your Portfolio</h1>
    <h6>You may Save & Load your Data</h6>
    <h6>Click on 'End Day' to begin a New Day!</h6>
    <hr />
    <p>Your Funds: {{ funds }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('portfolio', ['funds'])
  }
}
</script>

<style>

</style>