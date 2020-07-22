<template>
  <b-container align-v="center">
    <b-alert v-if="!currentUser" show dismissible variant="info" class="mt-3">
      You need to <router-link to="/signin">Sign In</router-link> or
      <router-link to="/register">Register</router-link> to be able to Manage
      Contact information.
    </b-alert>
    <b-row align="left">
      <b-col md="9"><h2 class="mt-3">Contacts</h2></b-col>
      <b-col md="3" align="right" class="pt-3">
        <b-button variant="success" @click="editRecord(null, 'Add')">
          Add New
        </b-button>
      </b-col>
    </b-row>

    <b-alert show class="mt-3" variant="info">
      Uses Firestore Cursor for pagination. Pulls only 5 Doucments at a time.
      For "Prev(ious)" it uses <code>endBefore</code> and
      <code>limitToLast</code>.
    </b-alert>
    <b-row align="left" class="mt-3">
      <b-col>
        <b-table
          striped
          hover
          :items="fbContacts"
          :fields="fields"
          :busy="isBusy"
          responsive
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(action)="row">
            <b-button size="sm" @click="editRecord(row, 'Update')" class="mr-1">
              Edit
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <div v-if="fbContacts">
      <b-button @click="goPrev" :disabled="currentPage === 1">Prev</b-button
      >&nbsp;
      <b-button @click="goNext">Next</b-button>
    </div>

    <hr />
    <router-link to="/home-two">Alternative Pagination Solution</router-link>
    <p>&nbsp;</p>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { db, auth } from "../firebase";
const collectionPath = "contacts";

export default {
  name: "Home",
  components: {},
  async created() {
    console.log(this.$route.query.page);
    auth.onAuthStateChanged(user => (this.currentUser = user));
    const first = db
      .collection(collectionPath)
      .orderBy("first_name")
      .limit(this.perPage);
    this.browserRecords(first);
  },
  data() {
    return {
      isBusy: false,
      perPage: 5,
      currentPage: 1,
      prev: null,
      next: null,
      fbContacts: [],
      currentUser: null,
      fields: [
        "action",
        "title",
        "first_name",
        "last_name",
        "department",
        "company",
        "address_line_1",
        "address_line_2",
        "address_line_3",
        "city",
        "postal_code",
        "state",
        "country"
      ]
    };
  },
  computed: {
    rows() {
      return this.fbContacts.length;
    }
  },
  methods: {
    goNext() {
      this.currentPage++;
      this.browserRecords(this.next);
    },
    goPrev() {
      this.currentPage--;
      this.browserRecords(this.prev);
    },
    browserRecords(ref) {
      this.isBusy = true;
      const that = this;
      ref.get().then(function(documentSnapshots) {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        const firstVisible = documentSnapshots.docs[0];
        that.fbContacts = [];
        documentSnapshots.docs.forEach(function(doc) {
          console.log(doc.id);
          const d = doc.data();
          d.id = doc.id;
          that.fbContacts.push(d);
        });

        that.next = db
          .collection(collectionPath)
          .orderBy("first_name")
          .startAfter(lastVisible)
          .limit(that.perPage);
        that.prev = db
          .collection(collectionPath)
          .orderBy("first_name")
          .endBefore(firstVisible)
          .limitToLast(that.perPage);
        that.isBusy = false;
      });
    },
    editRecord(row, task) {
      const id = row ? row.item.id : new Date().getTime();
      this.$router.push(`/edit/${id}/${task}`);
    }
  }
};
</script>
