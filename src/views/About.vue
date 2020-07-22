<template>
  <b-container class="mt-3" align="left">
    <h1>About this Test Case</h1>
    <h4>Firestore Rules</h4>
    <code>
      <pre>
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {

          match /contacts/{document=**} {
            allow read: if true;
            allow write: if request.auth != null;
          }
          
          match /profiles/{docID} {
            allow read, write: if request.auth.uid == docID;
          }
        }
      }
      </pre>
    </code>
  </b-container>
</template>
