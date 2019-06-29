import React from 'react';

class ServerDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: ""
    };
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

  showComponent(key) {
    return event => {
      event.preventDefault();
      this.setState({ page: key });
    }
  }

  closeComponent(key) {
    return () => {
      this.setState({ page: "" });
    }
  }

  renderComponent() {
    switch (this.state.page) {
      case "invitePeople":
        return <h1>ppl</h1>
      case "serverSettings":
        return <h1>set</h1>
      case "changeNickname":
        return <h1>nick</h1>
    }
  }

  render() {
    const isAdmin = this.props.server.owner_id === this.props.userId;
    return (
      <section id="server-dropdown">
        <ul>
          {isAdmin && <li id="invite-people" onClick={this.showComponent("invitePeople")}><i className="fas fa-user-plus"/>Invite People</li>}
          <li onClick={this.showComponent("serverSettings")}><i className="fas fa-cog" />Server Settings</li>
        </ul>
        <ul>
          <li onClick={this.showComponent("changeNickname")}><i className="fas fa-pen" />Change Nickname</li>
        </ul>
        {!isAdmin && (
          <ul>
            <li id="leave-server"><i className="fas fa-sign-out-alt" />Leave Server</li>
          </ul>
        )}
        {this.renderComponent()}
      </section>
    )
  }
}

export default ServerDropdown;