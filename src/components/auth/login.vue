<template>
  <div class="w-full max-w-xs">
    <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-8 relative">
        <label :class="{ 'text-red-500': $v.email.$error, 'text-blue-500': !$v.email.$invalid }" class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input v-model="email" @blur="$v.email.$touch()" :class="{ 'border-red-500': $v.email.$error }" class="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="username" type="text" placeholder="Username or E-mail">
        <p v-show="$v.email.$error" class="absolute text-red-500 text-xs italic">The username must have at least {{ $v.email.$params.minLength.min }} charaters.</p>
      </div>
      <div class="mb-8 relative">
        <label :class="{ 'text-red-500': $v.password.$error, 'text-blue-500': !$v.password.$invalid }" class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" @blur="$v.password.$touch()" :class="{ 'border-red-500': $v.password.$error }" class="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="password" type="password" placeholder="**********">
        <p v-if="!$v.password.minLength" class="absolute text-red-500 text-xs italic">The password must have at least {{ $v.password.$params.minLength.min }} charaters.</p>
        <p v-else-if="$v.password.$error" class="absolute text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button :disabled="$v.$invalid" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-75" type="submit">
          Log In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  validations: {
    email: {
      required,
      minLength: minLength(6),
      unique: (val) => {
        return val === 'test@test.com'; //sacar de aca y usar para checkear mail en la pantalla de signup
      }
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    login() {
      const redirectTo = this.$route.query.redirect || '/';
      this.$store.dispatch('auth/login', { email: this.email, password: this.password })
        .then(() => this.$router.replace(redirectTo))
        .catch(() => {});
    },
  }
}
</script>

<style>

</style>