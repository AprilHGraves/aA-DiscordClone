import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './user/user_form/login_form_container';
import RegisterFormContainer from './user/user_form/register_form_container';
import MainPage from './main_page';
import Invite from './invite_page';
import SplashContainer from './splash_container';

const App = () => (
  <div id="app">
    
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={RegisterFormContainer} />
      <ProtectedRoute path="/channels/:id" component={MainPage} />
      <ProtectedRoute path="/invite/:id" component={Invite} />
      <Route path="/" component={SplashContainer} />
    </Switch>
    
  </div>
);
export default App;