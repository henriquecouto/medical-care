import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBy078d7huPKB4poFIoRPO0QQg0vrsWrRU",
  authDomain: "medical-care-9a6e0.firebaseapp.com",
  databaseURL: "https://medical-care-9a6e0.firebaseio.com",
  projectId: "medical-care-9a6e0",
  storageBucket: "medical-care-9a6e0.appspot.com",
  messagingSenderId: "908558084846",
  appId: "1:908558084846:web:a8f4bb670974a8c0"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
