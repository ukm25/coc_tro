// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAhGjtkrjyNE0CI_fYPW4SIeZzhExmcbw",
    authDomain: "coc-tro-655cf.firebaseapp.com",
    projectId: "coc-tro-655cf",
    storageBucket: "coc-tro-655cf.appspot.com",
    messagingSenderId: "294392927168",
    appId: "1:294392927168:web:7dff0bc326606ab40a2e25"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
export default fireStore;