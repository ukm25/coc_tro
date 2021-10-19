import fireStore from "./Firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const createAccount = (email, fullname, password) => {
  const collectionRef = collection(fireStore, "accounts");

  const storage = getStorage();
  getDownloadURL(ref(storage, "local/anhbia.jpg"))
    .then((url) => { 
      const payload = {
        email: email,
        fullname: fullname,
        password: password,
        url: url,
      };
      addDoc(collectionRef, payload);
    
      createCurrentAccount(email, fullname, password, url);
    })
    .catch((error) => {
      // Handle any errors
    });

  
};

export const createCurrentAccount = async (email, fullname, password, url) => {
  //add account to currentAccount
  const collectionRef = collection(fireStore, "currentAccount");
  const payload = {
    email: email,
    fullname: fullname,
    password: password,
    url: url,
  };
  await addDoc(collectionRef, payload);
};

export const deleteCurrentAccount = async () => {
  const q = query(collection(fireStore, "currentAccount"));
  let docRef = 0;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    docRef = doc(fireStore, "currentAccount", document.id);
  });
  await deleteDoc(docRef);
};
