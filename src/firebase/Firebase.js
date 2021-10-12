// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDAhGjtkrjyNE0CI_fYPW4SIeZzhExmcbw",
//     authDomain: "coc-tro-655cf.firebaseapp.com",
//     projectId: "coc-tro-655cf",
//     storageBucket: "coc-tro-655cf.appspot.com",
//     messagingSenderId: "294392927168",
//     appId: "1:294392927168:web:7dff0bc326606ab40a2e25"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyBQIftFwa43p0BFcfsmE_gyOSRENRJUXWI",
  authDomain: "coc-tro-backup.firebaseapp.com",
  projectId: "coc-tro-backup",
  storageBucket: "coc-tro-backup.appspot.com",
  messagingSenderId: "139281466610",
  appId: "1:139281466610:web:e0d96a2201f889e5093c6b",
  measurementId: "G-JYXJGW6JPS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
export default fireStore;
