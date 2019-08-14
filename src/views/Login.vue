<template>
  <div class="container">
    <form class="mx-auto" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          v-validate="'required|email'"
          v-model="email"
          :class="{ 'is-invalid': !!errors.first('email') }"
          placeholder="Enter email"
        />
        <div v-show="!!errors.first('email')" class="invalid-feedback">
          {{ errors.first("email") }}
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          ref="password1"
          type="password"
          class="form-control"
          id="password"
          name="password"
          v-validate="'required|min:3'"
          v-model="password"
          :class="{ 'is-invalid': !!errors.first('password') }"
          placeholder="Password"
        />
        <div v-show="!!errors.first('password')" class="invalid-feedback">
          {{ errors.first("password") }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="status === 'loading'"
      >
        Submit
      </button>
      <router-link to="/register" class="btn btn-link">Register</router-link>
    </form>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  email = "";
  password = "";

  handleSubmit() {
    this.$validator.validate().then(result => {
      if (result) {
        const { email, password } = this;
        this.$store.dispatch("AUTH_REQUEST", { email, password }).then(() => {
          this.$router.push("/");
        });
      } else {
        this.$store.dispatch("SET_ERROR", "Correct the errors!");
      }
    });
  }

  get status() {
    return this.$store.getters.status;
  }
}
</script>

<style scoped>
form {
  max-width: 500px;
}
</style>
