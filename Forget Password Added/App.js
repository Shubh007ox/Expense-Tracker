import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './components/store/auth-context';
import { useContext } from 'react';
import Main from './components/Main/Main';
import Reset from './components/reset/reset';

function App() {
  const authCtx = useContext(AuthContext);
  return (
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
      </Switch>
    </Layout>
  );
}

export default App;
