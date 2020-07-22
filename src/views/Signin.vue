<template>
  <div>
    <h1 class="mt-5">Sign In</h1>
    <b-container>
      <b-alert v-if="firebaseError" show dismissible variant="danger">
        {{ firebaseError }}
      </b-alert>
      <b-form @submit.prevent="signin" @reset="onReset" novalidate>
        <b-row class="mt-3">
          <b-col
            xs="10"
            offset-xs="1"
            offset-sm="2"
            sm="8"
            offset-lg="4"
            lg="4"
            align="left"
          >
            <div class="group">
              <b-form-input
                class="mt-3"
                id="emailaddress"
                data-emailaddress
                v-model="email"
                type="email"
                :state="emailErrorState"
                placeholder="Enter Email"
                align="left"
              ></b-form-input>
              <b-form-invalid-feedback
                id="emailaddress-feedback"
                label-align="left"
              >
                Enter Valid Email
              </b-form-invalid-feedback>
            </div>
            <div class="group">
              <b-form-input
                class="mt-3"
                id="password"
                v-model="password"
                type="password"
                :state="passwordErrorState"
                placeholder="Enter Password"
              ></b-form-input>
              <b-form-invalid-feedback
                id="password-feedback"
                label-align="left"
              >
                Password must be at least 6 characters.
              </b-form-invalid-feedback>
            </div>

            <b-button
              id="btnsignin"
              class="mt-3"
              block
              variant="primary"
              type="submit"
              :disabled="!formOK"
              >Sign In</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { auth } from "../firebase";
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      firebaseError: null
    };
  },
  methods: {
    async signin() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace("/");
      } catch (err) {
        console.log(err);
        this.firebaseError = err.message;
      }
    },
    onReset() {}
  },
  computed: {
    emailErrorState() {
      const pregMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (pregMatch.test(this.email)) {
        return true;
      }
      return false;
    },
    passwordErrorState() {
      return this.password.length >= 6;
    },
    formOK() {
      return this.emailErrorState && this.passwordErrorState;
    }
  }
};
</script>

<style></style>
