import { useRef, useEffect, useState } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PASSWORD_REGEX, USER_REGEX } from "../validator/Validator";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { setUser } from "../../store/slices/userSlices";

import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../configSupa/firebase";

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
// const PASSWORD_REGEX =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPWD, setValidMatchPWD] = useState(false);
  const [matchFocusPWD, setMatchFocusPWD] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(email);
    setValidName(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);

    const match = password === matchPassword;
    setValidMatchPWD(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            })
          );
          navigate("/");
        })
        .catch((err) => alert("User Exist!"));

      const V1 = USER_REGEX.test(email);
      const V2 = PASSWORD_REGEX.test(password);

      if (!V1 || !V2) {
        setErrMsg("Invalid Entry!");
        return;
      }
    } catch (err) {
      alert("Error 505");
      console.log(email, password);
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

        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
          <label htmlFor="username">Username:</label>
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validName ? "true" : "false"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && email && !validName ? "instructions" : "offscreen"
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

          <label htmlFor="matchPassword">Confirm Password:</label>
          <span className={validMatchPWD && matchPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={validMatchPWD || !matchPassword ? "hide" : "invalid"}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <input
            type="password"
            id="matchPassword"
            onChange={(e) => setMatchPassword(e.target.value)}
            required
            aria-invalid={validMatchPWD ? "true" : "false"}
            aria-describedby="uidnote"
            onFocus={() => setMatchFocusPWD(true)}
            onBlur={() => setMatchFocusPWD(false)}
          />
          <p
            id="confirmnote"
            className={
              matchFocusPWD && !validMatchPWD ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24characters
            <br />
            Must include uppercase and lowercase letters,a number and a special
            character.
            <br />
            Letters,Numbers,underscors,hyphens allowed.
            <br />
            Match is do not correct!
          </p>

          <button
            disabled={!email || !password || !matchPassword ? true : false}
          >
            Create Account
          </button>
          <p className="link-signin">
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </form>
      </section>
    </>
  );
};

export { Register };
