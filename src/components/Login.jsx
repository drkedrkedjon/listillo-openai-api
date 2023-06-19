/* eslint-disable react/prop-types */
import { useState } from "react";
import { auth } from "../scripts/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setIsLogged }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function loginFirebase(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(setIsLogged(true))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <section className="login-container">
      <h1 className="login-title">Please Login</h1>
      <form className="login-form" onSubmit={loginFirebase}>
        <label className="login-label" htmlFor="email">
          Email
        </label>
        <input
          className="login-input"
          value={formData.email}
          type="email"
          name="email"
          id="email"
          placeholder="Your email..."
          onChange={handleInputChange}
        />
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-input"
          value={formData.password}
          type="password"
          name="password"
          id="password"
          placeholder="... and your password!"
          onChange={handleInputChange}
        />
        <button className="submit-btn">Submit</button>
      </form>
    </section>
  );
}
