<template>
  <b-container class="mt-3">
    <h1>Profile</h1>
    <div v-if="profile">
      <h3>{{ profile.email }}</h3>
      <h3>{{ profile.name }}</h3>
    </div>
    <b-alert class="mt-3" show>
      When a user Regiters for the first time, associated document is created
      under "profiles" collection.
    </b-alert>
  </b-container>
</template>

<script>
import { db, auth } from "@/firebase";

export default {
  name: "Profile",
  data() {
    return {
      profile: null
    };
  },
  async created() {
    console.log(1);
    const user = await auth.currentUser;
    console.log(user);
    console.log(2);
    db.collection("profiles")
      .doc(user.uid)
      .get()
      .then(profile => {
        console.log(profile.data());
        this.profile = profile.data();
        console.log(this.profile);
      });
  }
};
</script>

<style></style>
