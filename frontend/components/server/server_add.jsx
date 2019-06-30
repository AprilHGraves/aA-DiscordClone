import React from 'react';
import { withRouter } from 'react-router-dom';

class ServerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "Select",
      inviteLink: "",
      name: ""
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.inside = document.getElementById("add-server-box");
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    this.props.clearErrors();
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target)) {
      this.props.closeComponent();
    }
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value })
    }
  }

  showErrors(key) {
    let errors = this.props.errors[key];
    const label = document.getElementById(`${key}-label`);
    if (errors) {
      label.classList.add("red-text");
      if (errors[0] === "can't be blank") {
        return <span className="red-text">- This field is required</span>
      } else {
        return <span className="red-text">- {errors}</span>
      }
    } else if (label) {
      label.classList.remove("red-text");
    }
  }

  modeSwitch(mode) {
    return event => {
      event.preventDefault();
      this.setState({ mode })
    }
  }

  submitForm(event) {
    event.preventDefault();
    if (this.state.mode === "Create") {
      this.props.createServer({name: this.state.name})
        .then((serverId) => {
          this.props.history.push(`/channels/${serverId}`)
        });
    } else {
      const match = this.state.inviteLink.match(/invite\/(.*)/);
      const code = match && match[1] || this.state.inviteLink;
      this.props.joinServerByCode(code)
        .then((serverId) => {          
          this.props.history.push(`/channels/${serverId}`);
        });
    }
    this.props.closeComponent();
  }

  showPage() {
    const formBottom = (
      <div id="form-bottom">
        <button onClick={this.modeSwitch("Select")}><i className='fas fa-arrow-left' />&nbsp;Back</button>
        <input type="submit" value={this.state.mode} />
      </div>
    );
    if (this.state.mode === "Select") {
      return (
        <section id="add-options">
          <h1>OH, ANOTHER SERVER HUH?</h1>
          <div>
            <button id="show-create" onClick={this.modeSwitch("Create")} />
            <button id="show-join" onClick={this.modeSwitch("Join")} />
            <span id="or" />
          </div>
        </section>
      )
    }
    else if (this.state.mode === "Create") {
      return (
        <section id="create-server">
          <h1>CREATE YOUR SERVER</h1>
          <p>By creating a server, you will have access to free text chat to use amongst your (imaginary) friends.</p>
          <form onSubmit={this.submitForm}>
              <div id="center">

                <div id="name-container">
                  <label id="name-label">
                    SERVER NAME {this.showErrors("name")}
                    <input id="name-input" 
                      type="text" 
                      value={this.state.name}
                      placeholder="Enter a server name" 
                      onChange={this.changeInput("name")} />
                  </label>
                </div>
                <div id="blue-circle" />
              </div>
            {formBottom}
          </form>
        </section>
      )
    } else {
      return (
        <section id="join-server">
          <h1>JOIN A SERVER</h1>
          <p>Enter an Instant Invite below to join an existing server. The invite will look something like this:</p>
          <p>https://conflict-discord-clone.herokuapp.com/#/invite/p1U03z</p>
          <form onSubmit={this.submitForm}>
            <input id="inviteLink-input" type="text" value={this.state.inviteLink} onChange={this.changeInput("inviteLink")} /><br/>
            <label id="inviteLink-label">
              Enter an instant invite {this.showErrors("inviteLink")}
            </label>
            {formBottom}
          </form>
        </section>
      )
    }
  }

  render() {
    return (
      <section className="transparent-background">
        <section id="add-server-box">
          
          {this.showPage()}
        </section>

      </section>
    )
  }
}

export default withRouter(ServerAdd);