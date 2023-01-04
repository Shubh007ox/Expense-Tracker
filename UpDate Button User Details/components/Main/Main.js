import React, { useRef } from "react";
import Card from "../Card/Card";
import classes from "./Main.module.css";

function Main() {
  const fullNameInputRef = useRef();
  const ProfilePhotoInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredNamee = fullNameInputRef.current.value;
    const enteredUrl = ProfilePhotoInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCuy-Lt3HWAxoHO24zpXtjYsK_V4u1vAdE",
      {
        method: "POST",
        body: JSON.stringify({
          fullName: enteredNamee,
          url: enteredUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={classes.auth}>
      <h1>Contact Details</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" required ref={fullNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="url">Profile Photo Url</label>
          <input
            type="url"
            id="url"
            required
            ref={ProfilePhotoInputRef}
          ></input>
        </div>
        <div className={classes.actions}>
          <button type="button" className={classes.toggle} onClick={formSubmitHandler}>
            UpDate
          </button>
        </div>
      </form>
    </div>
  );
}
export default Main;
