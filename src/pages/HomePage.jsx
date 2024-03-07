import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { removeUser } from "../store/slices/userSlices";

function HomePage() {
  const dispath = useDispatch();
  const { isAuth, email } = useAuth();

  return isAuth ? (
    <div>
      <h1>Welcom your account!</h1>
      <button onClick={() => dispath(removeUser())}>Log Out is {email}</button>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default HomePage;
