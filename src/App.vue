<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!show" to="/login">Login</router-link>
      <button v-else @click="logout" class="btn btn-link">Exit</button>
    </div>
    <div class="alert alert-danger" role="alert" v-if="error">
      <p>{{ error }}</p>
      <button type="button" class="btn btn-danger" @click="closeError">
        Close
      </button>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class App extends Vue {
  created() {
    axios.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch("AUTH_LOGOUT");
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  }

  get show() {
    return this.$store.getters.isAuthenticated;
  }

  logout() {
    this.$store.dispatch("AUTH_LOGOUT").then(() => {
      this.$router.push("/login");
    });
  }

  get error() {
    return this.$store.getters.error;
  }

  closeError() {
    this.$store.dispatch("CLEAR_ERROR");
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
