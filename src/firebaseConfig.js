// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPQABLswcDEF-Yp7n-1JDoEI7WtgDTp04",
  authDomain: "august-ae2bb.firebaseapp.com",
  projectId: "august-ae2bb",
  storageBucket: "august-ae2bb.appspot.com",
  messagingSenderId: "784474845160",
  appId: "1:784474845160:web:4c3486a014b892bc90be5d",
  measurementId: "G-KJYRLM0T6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getAuth(app);

export default database;
