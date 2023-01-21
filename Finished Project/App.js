import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './components/store/auth-context';
import React, { useContext } from 'react';
import Main from './components/Main/Main';
import Reset from './components/reset/reset';
import Track from './pages/Track';
import ExpensesForm from './pages/ExpenseForm';
import { useSelector } from 'react-redux';


function App() {
  const authCtx = useContext(AuthContext);
  const theme = useSelector((state => state.theme.theme))
  const premium = useSelector((state) => state.expense.premiumButton)
  return (
    <React.Fragment>
      <main style={{background : premium && theme && authCtx.isLoggedIn ? 'grey' : 'white'}}>
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (<Route path='/auth'>
          <AuthPage />
        </Route>)}
        <Route path={"/reset"}>
          {!authCtx.isLoggedIn && <Reset />}
        </Route>
        <Route path='/profile'>
          {authCtx.isLoggedIn && <Main />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path='/track'>
          {authCtx.isLoggedIn && <Track />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path='/expense'>
          {authCtx.isLoggedIn && <ExpensesForm/>}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Layout>
    </main>
    </React.Fragment>
  );
}

export default App;
