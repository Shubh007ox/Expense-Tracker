import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import { useDispatch,useSelector} from 'react-redux';
import { themeAction } from '../store/theme';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const dispatch = useDispatch();
  const permium = useSelector((state) => state.theme.PremiumsetOn)
  const theme = useSelector((state) => state.theme.themeShow);
  const [color,setColor] = useState(classes.header);

  const logoutHandler = () => {
    authCtx.logout();
  }
  const themeChangeHandler = () => {
    dispatch(themeAction.toggleTheme())
    setColor(classes.dark)
  }
  return (
    <header className={color}>
      <NavLink to='/'>
        <div className={classes.logo}>Expense Tracker</div>
      </NavLink>
      <nav>
        <ul>
          {!isLoggedIn && (<li>
            <NavLink to='/auth'>Login</NavLink>
          </li>)}
          {isLoggedIn && ( <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>)}
          {isLoggedIn && ( <li>
            <NavLink to='/track'>Tracker</NavLink>
          </li>)}
          {isLoggedIn && (<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
          {isLoggedIn && ( <li>
            <NavLink to='/expense'>Expenses</NavLink>
          </li>)}
          <li className={color}>
            {permium && isLoggedIn && <button onClick={themeChangeHandler}>{theme ? 'light mode' : 'Dark Mode'}</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
