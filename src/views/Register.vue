<template>
  <div class="container">
    <form class="mx-auto" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">First name:</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          name="firstName"
          placeholder="Enter Name"
          v-validate="'required'"
          :class="{ 'is-invalid': !!errors.first('firstName') }"
          v-model="firstName"
        />
        <div v-show="!!errors.first('firstName')" class="invalid-feedback">
          {{ errors.first("firstName") }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Last name:</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          name="lastName"
          v-validate="'required'"
          v-model="lastName"
          :class="{ 'is-invalid': !!errors.first('lastName') }"
          placeholder="Enter Last name"
        />
        <div v-show="!!errors.first('lastName')" class="invalid-feedback">
          {{ errors.first("lastName") }}
        </div>
      </div>
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
          v-validate="'required|min:6'"
          v-model="password"
          :class="{ 'is-invalid': !!errors.first('password') }"
          placeholder="Password"
        />
        <div v-show="!!errors.first('password')" class="invalid-feedback">
          {{ errors.first("password") }}
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          name="confirmPassword"
          v-validate="'required|confirmed:password1'"
          v-model="confirmPassword"
          :class="{ 'is-invalid': !!errors.first('confirmPassword') }"
          placeholder="Confirm Password"
        />
        <div
          v-show="!!errors.first('confirmPassword')"
          class="invalid-feedback"
        >
          {{ errors.first("confirmPassword") }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
      <router-link to="/login" class="btn btn-link">Login</router-link>
    </form>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  confirmPassword = "";

  handleSubmit() {
    this.$validator.validate().then(result => {
      if (result) {
        const { firstName, lastName, email, password } = this;
        this.$store
          .dispatch("REGISTER", { firstName, lastName, email, password })
          .then(() => {
            this.$router.push("/login");
          });
      } else {
        this.$store.dispatch("SET_ERROR", "Correct the errors!");
      }
    });
  }
}
</script>

<style scoped>
form {
  max-width: 500px;
}
</style>
