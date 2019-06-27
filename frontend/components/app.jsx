import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash_container';
import LoginFormContainer from './user_form/login_form_container';
import RegisterFormContainer from './user_form/register_form_container';
import MainPage from './main_page';

const App = () => (
  <div id="app">
    
    
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={RegisterFormContainer} />
      <ProtectedRoute path="/channels" component={MainPage} />
      <Route path="/" component={SplashContainer} />      
    </Switch>
    
  </div>
);
export default App;