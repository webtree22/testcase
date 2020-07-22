<template>
  <b-container align="left">
    <h1 class="mt-3">Import Contacts from .csv file</h1>
    <b-alert show class="mt-4">
      You can import Contacts from a CSV file. The CSV file must have these
      EXACT headers: <br />
      title, first_name, last_name, department, company, address_line_1,
      address_line_2, address_line_3, city, postal_code, state, country
    </b-alert>
    <hr />
    <vue-csv-import
      v-model="csv"
      :autoMatchFields="true"
      :map-fields="[
        'title',
        'first_name',
        'last_name',
        'department',
        'company',
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'city',
        'postal_code',
        'state',
        'country'
      ]"
    >
      <template slot="hasHeaders" slot-scope="{ headers, toggle }">
        <label>
          <input
            type="checkbox"
            id="hasHeaders"
            :value="headers"
            @change="toggle"
          />
          Headers?
        </label>
      </template>

      <template slot="error">
        File type is invalid
      </template>

      <template slot="thead">
        <tr>
          <th>Required Fields</th>
          <th>CSV Column</th>
        </tr>
      </template>

      <template slot="next" slot-scope="{ load }">
        <b-button @click.prevent="load" variant="primary"
          >Upload CSV file
        </b-button>
      </template>
    </vue-csv-import>
    <div v-if="csv">
      <b-button
        @click.prevent="submitz"
        variant="success"
        :disabled="above500"
        class="mr-2"
      >
        Confirm Save !
      </b-button>
      <a href="/import-contacts">Start Over Again</a>
      <b-alert show v-if="above500" variant="danger" class="mt-2">
        No of Records = <strong>{{ csv.length }}</strong
        >. Firestore Limits maximum 500 writes allowed per request in a batch.
        This uses firebase Batch Write, so try to keep the number of records in
        csv file below 500 at a time.
      </b-alert>
    </div>
    <!-- <div>
      {{ csv }}
    </div> -->
  </b-container>
</template>

<script>
import { VueCsvImport } from "vue-csv-import";
import { db } from "@/firebase";
export default {
  components: { VueCsvImport },
  data() {
    return {
      csv: null
    };
  },
  methods: {
    submitz() {
      const batch = db.batch();
      this.csv.forEach((doc, i) => {
        console.log(i);
        batch.set(db.collection("contacts").doc(), doc);
      });
      const that = this;
      batch.commit().then(function() {
        that.$router.replace("/");
      });
    }
  },
  computed: {
    above500() {
      return this.csv.length > 500 ? true : false;
    }
  }
};
</script>

<style></style>
