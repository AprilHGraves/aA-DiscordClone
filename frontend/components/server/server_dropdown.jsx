import React from 'react';
import ServerSettingsContainer from './server_settings/server_settings_container';

class ServerDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.inside = document.getElementById("server-dropdown");
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target)) {
      this.props.closeComponent();
    }
  }

  render() {
    const isOwner = this.props.server.owner_id === this.props.userId;
    return (
      <section id="server-dropdown">
        <ul>
          {isOwner && (
            <li id="invite-people" onClick={this.props.showInvitePeople}>
              <i className="fas fa-user-plus"/>Invite People
            </li>
          )}
          {isOwner && (
            <li onClick={this.props.showServerSettings}>
              <i className="fas fa-cog" />Server Settings
            </li>
          )}
        </ul>
        <ul>
          <li onClick={this.props.showChangeNickname}><i className="fas fa-pen" />Change Nickname</li>
        </ul>
        {!isOwner && (
          <ul>
            <li id="leave-server">
              <i className="fas fa-sign-out-alt" />Leave Server
            </li>
          </ul>
        )}
      </section>
    )
  }
}

export default ServerDropdown;