// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK1_JgZI5YX4Jp4Kr-2akM16IHL0Grxok",
  authDomain: "user-email-password-auth-c867c.firebaseapp.com",
  projectId: "user-email-password-auth-c867c",
  storageBucket: "user-email-password-auth-c867c.appspot.com",
  messagingSenderId: "375452206400",
  appId: "1:375452206400:web:76bca54432e8cc9c56a6a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth