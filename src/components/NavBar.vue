<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Contact Management App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/signin" v-if="!currentUser">Sign In</b-nav-item>
        <b-nav-item to="/register" v-if="!currentUser">Register</b-nav-item>
        <b-nav-item to="/import-contacts" v-if="currentUser"
          >Import Contacts (.csv)</b-nav-item
        >
        <b-nav-item-dropdown right v-if="currentUser">
          <template v-slot:button-content>
            <em>{{ currentUser.email }}</em>
          </template>
          <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { auth } from "@/firebase";
export default {
  data() {
    return {
      currentUser: null
    };
  },
  async created() {
    auth.onAuthStateChanged(user => (this.currentUser = user));
  },
  methods: {
    async signout() {
      await auth.signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
</style>
