import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDPQGbOWXrOphtuaa2mCMwD35pmYqTle8g",
    authDomain: "invoice-desktop.firebaseapp.com",
    projectId: "invoice-desktop",
    storageBucket: "invoice-desktop.appspot.com",
    messagingSenderId: "737376636869",
    appId: "1:737376636869:web:6bc20dc4e97eac0f2e05ac"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();