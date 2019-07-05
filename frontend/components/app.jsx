import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './user/user_form/login_form_container';
import RegisterFormContainer from './user/user_form/register_form_container';
import MainPage from './main_page';
import Invite from './invite_page';
import SplashContainer from './splash_container';

import { connect } from "react-redux";
import ChangeNicknameContainer from './user/change_nickname';
import UserSettingsContainer from './user/user_settings/user_settings_container';
import ServerAddContainer from './server/server_add_container';
import ServerDropdownContainer from './server/server_dropdown_container';
import ServerSettingsContainer from './server/server_settings/server_settings_container';
import InstantInviteContainer from './invite/instant_invite_container';
import ChannelSettingsContainer from './channel/channel_settings/channel_settings';
import AddChannelContainer from './channel/channel_add';

const mapStateToProps = (state) => {
  return {
    modalName: state.ui.modal
  }
}

const App = (props) => {

  const getModal = () => {
    switch (props.modalName) {
      case "User Settings":
        return <UserSettingsContainer/>
      case "Add Server":
        return <ServerAddContainer/>
      case "Server Dropdown":
        return <ServerDropdownContainer/>
      case "Change Nickname":
        return <ChangeNicknameContainer/>
      case "Add Channel":
        return <AddChannelContainer/>
      case "Server Settings":
        return <ServerSettingsContainer/>
      case "Channel Settings":
        return <ChannelSettingsContainer/>
      case "Invite People":
        return <InstantInviteContainer/>
    }
  };

  return (
    <div id="app">
      
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/register" component={RegisterFormContainer} />
        <ProtectedRoute path="/channels/:id" component={MainPage} />
        <ProtectedRoute path="/invite/:id" component={Invite} />
        <Route path="/" component={SplashContainer} />
      </Switch>

      {getModal()}
      
    </div>
  )
};

export default connect(mapStateToProps)(App)