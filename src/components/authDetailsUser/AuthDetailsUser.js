import React, { useEffect, useState } from "react";
import { auth } from "../../configSupa/config.Supa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AuthDetailsUser() {
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user signIOUT!");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section>
      {authUser ? (
        <>
          {" "}
          <h3>SignedIn</h3>
          <h4>{authUser.email}</h4>
          <button
            onClick={() => {
              userSignOut();
            }}
          >
            SignedOUT
          </button>{" "}
        </>
      ) : (
        <>
          <h3>SignedOUT</h3>
          <button onClick={() => navigate("/signIn")}>Go back Register!</button>
        </>
      )}
    </section>
  );
}

export default AuthDetailsUser;
