<template>
  <div>
    <h1 class="mt-5">Register</h1>
    <b-container>
      <b-alert v-if="firebaseError" show dismissible variant="danger">
        {{ firebaseError }}
      </b-alert>
      <b-form @submit.prevent="register" @reset="onReset" novalidate>
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
                id="name"
                v-model="name"
                type="text"
                placeholder="Enter Your Name"
                :state="nameErrorState"
              ></b-form-input>
              <b-form-invalid-feedback id="name-feedback" label-align="left">
                Enter at least 3 letters
              </b-form-invalid-feedback>
            </div>
            <div class="group">
              <b-form-input
                class="mt-3"
                id="emailaddress"
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
            <div class="group">
              <b-form-input
                class="mt-3"
                id="passwordConfirmation"
                v-model="passwordConfirmation"
                type="password"
                :state="passwordConfirmErrorState"
                placeholder="Password Confirmation"
              ></b-form-input>
              <b-form-invalid-feedback
                id="password-feedback"
                label-align="left"
              >
                Passwords do not match.
              </b-form-invalid-feedback>

              <b-button
                class="mt-3"
                block
                variant="primary"
                type="submit"
                :disabled="!formOK"
                >Register</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { db, auth } from "../firebase";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      firebaseError: null
    };
  },
  methods: {
    async register() {
      try {
        const res = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        console.log(res.user);
        if (res.user) {
          console.log(2);
          db.collection("profiles")
            .doc(res.user.uid)
            .set({
              name: this.name,
              email: this.email,
              about: ""
            });
        }
        this.$router.replace("/");
      } catch (err) {
        console.log(err);
        this.firebaseError = err.message;
      }
    },
    onReset() {}
  },
  computed: {
    nameErrorState() {
      return this.name.length > 2;
    },
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
    passwordConfirmErrorState() {
      if (this.password.length === 0) {
        return false;
      } else if (this.password === this.passwordConfirmation) {
        return true;
      } else {
        return false;
      }
    },
    formOK() {
      return (
        this.nameErrorState &&
        this.emailErrorState &&
        this.passwordErrorState &&
        this.passwordConfirmErrorState
      );
    }
  }
};
</script>

<style></style>
