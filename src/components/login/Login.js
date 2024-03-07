import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { setUser } from "../../store/slices/userSlices";

import { auth } from "../../configSupa/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { PASSWORD_REGEX, USER_REGEX } from "../validator/Validator";

function Login() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef(null);
  const errRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = (email, password) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          dispatch(
            setUser({
              email: user.email,
              token: user.accessToken,
              id: user.uid,
            })
          );
          navigate("/");
          alert("Welcom to your account!");
        })
        .catch((err) => alert("Your Email or Password not correct!"));

      const V1 = USER_REGEX.test(email);
      const V2 = PASSWORD_REGEX.test(password);

      if (!V1 || !V2) {
        setErrMsg("Not correct entry!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleLogin(email, password);
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "true" : "false"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onKeyDown={handleKey}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24characters
            <br />
            Must begin with a letter
            <br />
            Letters,Numbers,underscors,hyphens allowed.
          </p>

          <label htmlFor="password">Password:</label>
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? "true" : "false"}
            aria-describedby="uidnote"
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            onKeyDown={handleKey}
          />
          <p
            id="pwdnote"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24characters
            <br />
            Must include uppercase and lowercase letters,a number and a special
            character.
            <br />
            Letters,Numbers,underscors,hyphens allowed.
          </p>
          <p className="link-signin">
            Not registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to={"/register"}>Register</Link>
            </span>
          </p>
        </form>
        <button
          disabled={!email || !password ? true : false}
          onClick={() => handleLogin(email, password)}
        >
          Sign In
        </button>

        {/* <form>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKey}
          />

          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
        </form>
        <button onClick={() => handleLogin(email, password)}>Login</button>
        <Link to={"/register"}>Sign Up</Link> */}
      </section>
    </>
  );
}

export default Login;
