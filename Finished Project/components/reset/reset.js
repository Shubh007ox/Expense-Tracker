import React, { useRef } from "react";
import classes from "./reset.module.css";

function Reset() {
  const NewPassRef = useRef();

  const PassResetHandler = (event) => {
    event.preventDefault();
    const enteredNewPass = NewPassRef.current.value;
    console.log(enteredNewPass)
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCuy-Lt3HWAxoHO24zpXtjYsK_V4u1vAdE",
      {
        method: "POST",
        body: JSON.stringify({
          requestType : "PASSWORD_RESET",
          email: enteredNewPass,
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
    <React.Fragment>
      <div className={classes.h1}>
        <h1>The Expense Tracker</h1>
      </div>
      <div className={classes.auth}>
        <form onSubmit={PassResetHandler}>
          <div className={classes.control}>
            <label>Enter the email with You have Registered !!...</label>
          </div>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              ref={NewPassRef}
              className={classes.input}
            ></input>
          </div>
          <div className={classes.actions}>
            <button className={classes.actions}>Send Link</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Reset;
