<template>
  <b-container align-v="center">
    <b-alert v-if="!currentUser" show dismissible variant="info" class="mt-3">
      You need to <router-link to="/signin">Sign In</router-link> or
      <router-link to="/register">Register</router-link> to be able to Manage
      Contact information.
    </b-alert>
    <h2 class="mt-3">Contacts (Alternative Solution)</h2>
    <b-alert variant="warning" show>
      This solution implements Bootstrap-Vue Pagination component.<br />This
      solution has one <strong>serious drawback</strong> (not because of
      Bootstrap-Vue Pagination) as it fetches all the documents in the
      collection at once, which actually defies the purpose of the pagination
      itself.<br />Not to read all the documents, this demo fetches only 50
      documents max. <br />
      <router-link to="/">Back to Home</router-link>
    </b-alert>
    <div class="overflow-auto mt-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <b-table
        id="my-table"
        :items="fbContacts"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        small
      >
      </b-table>
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { db, auth } from "../firebase";
const collectionPath = "contacts";

export default {
  name: "HomeTwo",
  components: {},
  async created() {
    console.log(this.$route.query.page);
    auth.onAuthStateChanged(user => (this.currentUser = user));
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fbContacts: [],
      currentUser: null,
      fields: [
        "title",
        "first_name",
        "last_name",
        "address_line_1",
        "city",
        "country"
      ]
    };
  },
  firestore() {
    return {
      fbContacts: db.collection(collectionPath).limit(50)
    };
  },
  computed: {
    rows() {
      return this.fbContacts.length;
    }
  }
};
</script>
