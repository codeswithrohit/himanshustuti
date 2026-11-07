
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDD2VDoyI2NIu3jsxtRmEHqpSqkaljOKvs",
  authDomain: "techrakshak.firebaseapp.com",
  projectId: "techrakshak",
  storageBucket: "techrakshak.firebasestorage.app",
  messagingSenderId: "304783896801",
  appId: "1:304783896801:web:f6afdd111c5a5f5b5a47a0",
  measurementId: "G-YQBZFMQ6Q0"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }

