
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDvAOSoIpbXJ97B-SPUHKfX9X9t7_glWrU",
    authDomain: "codedeck1cbatch.firebaseapp.com",
    projectId: "codedeck1cbatch",
    storageBucket: "codedeck1cbatch.appspot.com",
    messagingSenderId: "461928187174",
    appId: "1:461928187174:web:e7c943c76c0e5fe8abede7",
    measurementId: "G-Q42H6TF4TF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();

export { db, auth };