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

    <h4>Sign In Form Email Password Unit Test</h4>
    <img src="@/assets/signintest.png" />
    <h4>Source Code (Github) & Instructions</h4>
    <a href="https://github.com/webtree22/testcase" target="_blank">
      https://github.com/webtree22/testcase
    </a>
    <p class="mt-4">&nbsp;</p>
  </b-container>
</template>
