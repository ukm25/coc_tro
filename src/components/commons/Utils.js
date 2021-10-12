import fireStore from "../../firebase/Firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";

export const createAccount = (email, fullname, password) => {
  const collectionRef = collection(fireStore, "accounts");
  const payload = {
    email: email,
    fullname: fullname,
    password: password,
  };
  addDoc(collectionRef, payload);

  createCurrentAccount(email, fullname, password);
};

export const createCurrentAccount = async (email, fullname, password) => {
  //add account to currentAccount
  const collectionRef = collection(fireStore, "currentAccount");
  const payload = {
    email: email,
    fullname: fullname,
    password: password,
  };
  await addDoc(collectionRef, payload);
};

export const deleteCurrentAccount = async () => {
  const q = query(collection(fireStore, "currentAccount"));
let docRef = 0;
console.log(docRef)
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    docRef = doc(fireStore, "currentAccount", document.id);
    
  });
  await deleteDoc(docRef);
};
