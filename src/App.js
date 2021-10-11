import "./App.css";
import fireStore from "./firebase/Firebase";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import HeaderCommon from "./components/commons/HeaderCommon";

function App() {
  const [accounts, setAccounts] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(fireStore, "accounts"), (snapshot) => {
        setAccounts(snapshot.docs.map((doc) => doc.data()));
      }),
    []
  );
  return (
    <div>
      {accounts.map(account => (
        <h1>{account.fullname}</h1>
      ))}
      <HeaderCommon/>
    </div>
  );
}

export default App;
