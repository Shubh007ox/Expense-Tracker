import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPass = confirmpasswordInputRef.current.value
    localStorage.setItem('enteredEmail',JSON.stringify(enteredEmail))

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuy-Lt3HWAxoHO24zpXtjYsK_V4u1vAdE';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuy-Lt3HWAxoHO24zpXtjYsK_V4u1vAdE';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        confirmPass : enteredConfirmPass,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res)
        if (res.ok) {
          console.log('Login SuccessFull')
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
       const expireTokentime = new Date( new Date().getTime() + +data.expiresIn * 1000);
        authCtx.login(data.idToken,expireTokentime.toISOString());    
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (<div className={classes.control}>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            id='passwords'
            required
            ref={confirmpasswordInputRef}
          />
        </div>)}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;