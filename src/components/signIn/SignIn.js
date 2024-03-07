// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";
// import { auth } from "../../configSupa/firebase";
// import { setUser } from "../../store/slices/userSlices";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// const SignIn = ( {handleClick} ) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogin = ( email, password ) => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(({ user }) => {
  //       console.log(user);
  //       dispatch(
  //         setUser({
  //           email: user.email,
  //           token: user.accessToken,
  //           id: user.uid,
  //         })
  //       );
  //       navigate("/");
  //     })
  //     .catch((err) => console.log(err));
  // };

  // return (
    <>
      {/* <section>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleLogin(email, password)}>Sign In</button>
        <Link to={"/register"}>Sign Up</Link>
      </section> */}
    </>
//   );
// };

// export default SignIn;
