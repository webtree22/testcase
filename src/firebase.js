import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAdlFEi6Grf-Ra5TNbiojvrZVpNzGEoYLo",
  authDomain: "caplication.firebaseapp.com",
  databaseURL: "https://caplication.firebaseio.com",
  projectId: "caplication",
  storageBucket: "caplication.appspot.com",
  messagingSenderId: "1035779149337",
  appId: "1:1035779149337:web:c29c9d1f356f8b7b05a488",
  measurementId: "G-67YZYCXG96"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
