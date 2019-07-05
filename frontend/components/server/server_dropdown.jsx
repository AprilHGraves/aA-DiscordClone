import React from 'react';
import { withRouter } from 'react-router-dom';

class ServerDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.leave = this.leave.bind(this);
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

  leave() {
    this.props.closeComponent();
    this.props.leaveServer(this.props.membership.id)
      .then(() => this.props.history.push(`/channels/@me`));
  }

  showModal(modalName) {
    return (event) => {
      this.props.showModal(modalName);
    }
  }

  render() {
    const isOwner = this.props.server.owner_id === this.props.userId;
    return (
      <section id="server-dropdown">
        <ul>
          {isOwner && (
            <li id="invite-people" onClick={this.showModal("Invite People")}>
              <i className="fas fa-user-plus"/>Invite People
            </li>
          )}
          {isOwner && (
            <li onClick={this.showModal("Server Settings")}>
              <i className="fas fa-cog" />Server Settings
            </li>
          )}
        </ul>
        <ul>
          <li onClick={this.showModal("Change Nickname")}><i className="fas fa-pen" />Change Nickname</li>
        </ul>
        {!isOwner && (
          <ul>
            <li id="leave-server" onClick={this.leave}>
              <i className="fas fa-sign-out-alt" />Leave Server
            </li>
          </ul>
        )}
      </section>
    )
  }
}

export default withRouter(ServerDropdown);