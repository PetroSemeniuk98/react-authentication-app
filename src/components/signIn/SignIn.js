import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configSupa/config.Supa";

import { useEffect, useRef, useState } from "react";

import { PASSWORD_REGEX, USER_REGEX } from "../validator/Validator";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSignIn = async (e) => {
    e.preverentDefault();

    try {
      signInWithEmailAndPassword(auth, user, password)
        .then((userInfo) => {
          console.log(userInfo);
        })
        .catch((err) => console.log(err));

      const V1 = USER_REGEX.test(user);
      const V2 = PASSWORD_REGEX.test(password);

      if (!V1 || !V2) {
        setErrMsg("Invalid Entry!");
        return;
      }
    } catch (error) {
      alert("This User Exist");
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
        <form onSubmit={handleSignIn}>
          <label htmlFor="username">Email:</label>
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "true" : "false"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
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

          <button
            type="submit"
            disabled={!user || !password ? true : false}
            onClick={() => navigate("/signedIn")}
          >
            SignIn
          </button>
          <span className="line">
            {/*put router link here*/}
            <a href="/">SignUp</a>
          </span>
        </form>
      </section>
    </>
  );
};

export default SignIn;
