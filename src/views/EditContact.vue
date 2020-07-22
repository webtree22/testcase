<template>
  <b-container align="left" class="mt-3">
    <h1>{{ editTitle }}</h1>
    <b-form @submit.prevent="onSubmit" v-if="doc" class="mb-5">
      <b-form-group id="title-group" label="Title:" label-for="input-title">
        <b-form-select
          id="input-title"
          v-model="doc.title"
          :options="titles"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-first_name"
        label="First Name:"
        label-for="input-first_name"
      >
        <b-form-input
          id="input-first_name"
          v-model="doc.first_name"
          required
          placeholder="First name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-last_name"
        label="Last Name:"
        label-for="input-last_name"
      >
        <b-form-input
          id="input-last_name"
          v-model="doc.last_name"
          required
          placeholder="Last Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-department"
        label="Department:"
        label-for="input-department"
      >
        <b-form-select
          id="input-department"
          v-model="doc.department"
          :options="departments"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-company"
        label="Company:"
        label-for="input-company"
      >
        <b-form-input
          id="input-company"
          v-model="doc.company"
          required
          placeholder="Company"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-address_line_1"
        label="Address Line 1:"
        label-for="input-address_line_1"
      >
        <b-form-input
          id="input-address_line_1"
          v-model="doc.address_line_1"
          required
          placeholder="Address Line 1"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-address_line_2"
        label="Address Line 2:"
        label-for="input-address_line_2"
      >
        <b-form-input
          id="input-address_line_2"
          v-model="doc.address_line_2"
          required
          placeholder="Address Line 2"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-address_line_3"
        label="Address Line 3:"
        label-for="input-address_line_3"
      >
        <b-form-input
          id="input-address_line_3"
          v-model="doc.address_line_3"
          required
          placeholder="Address Line 3"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-city" label="City:" label-for="input-city">
        <b-form-input
          id="input-city"
          v-model="doc.city"
          required
          placeholder="City"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-postal_code"
        label="Postal Code:"
        label-for="input-postal_code"
      >
        <b-form-input
          id="input-postal_code"
          v-model="doc.postal_code"
          required
          placeholder="Postal Code"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-state"
        label="State:"
        label-for="input-state"
      >
        <b-form-input
          id="input-state"
          v-model="doc.state"
          required
          placeholder="State"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label="Country:"
        label-for="input-country"
      >
        <b-form-input
          id="input-country"
          v-model="doc.country"
          required
          placeholder="Country"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mr-3">Submit</b-button>
      <b-button to="/">Cancel</b-button>
    </b-form>
    <div v-if="doc && task === 'Update'" class="mt-5 mb-5">
      <b-button type="button" @click="deleteContact()" variant="danger">
        Delete this Document Permanently</b-button
      >
    </div>
  </b-container>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "EditContact",
  data() {
    return {
      contactId: this.$route.params.contact_id,
      task: this.$route.params.task,
      doc: null,
      departments: ["Marketing", "Production"],
      titles: ["Audience", "Recipient"]
    };
  },
  // firestore() {
  //   return {
  //     doc: db.collection(`contacts`).doc(this.contactId)
  //   };
  // },
  computed: {
    editTitle() {
      return this.task + " Contact";
    }
  },
  created() {
    if (this.task === "Add") {
      this.doc = {
        title: "",
        first_name: "",
        last_name: "",
        department: "",
        company: "",
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        city: "",
        postal_code: "",
        state: "",
        country: ""
      };
    } else {
      db.collection("contacts")
        .doc(this.contactId)
        .get()
        .then(snapshot => {
          this.doc = snapshot.data();
        });
    }
  },
  methods: {
    onSubmit() {
      db.collection("contacts")
        .doc(this.contactId)
        .set(this.doc)
        .then(() => {
          this.$router.replace("/");
        });
    },
    deleteContact() {
      db.collection("contacts")
        .doc(this.contactId)
        .delete()
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
};
</script>

<style></style>
