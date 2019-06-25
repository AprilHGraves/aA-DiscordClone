import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash_container';
import LoginFormContainer from './user/login_form_container';
import RegisterFormContainer from './user/register_form_container';
import MainPage from './main_page';

const App = () => (
  <div>
    
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/register" component={RegisterFormContainer} />
    <ProtectedRoute path="/channels" component={MainPage} />
    
  </div>
);
export default App;