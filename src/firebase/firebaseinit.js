import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: process.env.VUE_APP_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_ID,
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
