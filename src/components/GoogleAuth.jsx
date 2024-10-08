import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);

      const user = auth.currentUser;

      const userDoc = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(userDoc));

      await setDoc(doc(db, "users", user.uid), userDoc, { merge: true });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="google_auth" onClick={handleLogin}>
      {loading ? "Loading..." : "Continue with Google"}
    </button>
  );
};

export default GoogleAuth;
