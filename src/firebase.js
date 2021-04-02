import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAT4A7Q3r_cmWebqixTPd7xTC53IH7q20I",
    authDomain: "todo-2a9e4.firebaseapp.com",
    projectId: "todo-2a9e4",
    storageBucket: "todo-2a9e4.appspot.com",
    messagingSenderId: "64026889518",
    appId: "1:64026889518:web:a190a1d6140fbec71dfebf"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();

  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;