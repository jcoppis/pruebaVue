<template>
  <div class="fixed h-full w-full flex items-center justify-center bg-gray-100">
    <app-login />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from '../components/auth/login.vue';
export default {
  components: {
    appLogin: Login
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isLoggedIn) {
      next(false);
    } else {
      next();
    }
  }
}
</script>

<style>

</style>