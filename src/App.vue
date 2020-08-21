<template>
  <div id="app">
    <app-header v-if="isLoggedIn" />
    <hr />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from "./components/Header.vue";
export default {
  components: {
    appHeader: Header
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }

  .slide-leave-active {
    animation: slide-in 200ms ease-out reverse;
  }

  @keyframes slide-in {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* solve this with reverse in .slide-leave-active */
  /* @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(30px);
      opacity: 0;
    }
  } */
</style>