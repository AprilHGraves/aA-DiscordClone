import React from 'react';

class InstantInvite extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inviteLink: "",
      invite: "",
      editMode: false,
      duration: "",
      max_uses: "",
      copyButton: "Copy"
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.modeSwitch = this.modeSwitch.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.copy = this.copy.bind(this);
  }
  

  componentDidMount() {
    this.inside = document.getElementById("invite-box");
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.fetchInviteByUserAndChannel(this.props.channelId)
      .then(invite => {
        this.setState({
          inviteLink: `https://conflict-discord-clone.herokuapp.com/#/invite/${invite.code}`,
          invite: invite
        });
      });
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

  modeSwitch(event) {
    event.preventDefault();
    this.setState({ editMode: !this.state.editMode })
  }

  submitForm(event) {
    event.preventDefault();
    this.props.createInvite({
      duration: this.state.duration && Number(this.state.duration) || undefined,
      max_uses: this.state.max_uses && Number(this.state.max_uses) || undefined,
      server_id: this.props.channelId,  // TODO adjust after column deletion
      channel_id: this.props.channelId 
    }).then(invite => {
        this.setState({
          inviteLink: `https://conflict-discord-clone.herokuapp.com/#/invite/${invite.code}`,
          invite: invite,
          editMode: false, 
          duration: "",
          max_uses: "",
        });
      });
  }

  changeInput(key) {
    return (event) => {
      this.setState({[key]: event.target.value});
    }
  }

  copy(event) {
    event.preventDefault();
    this.setState({copyButton: "Copied"});
    const input = document.getElementById("link-text");
    input.focus();
    input.select();
    input.blur();
    document.execCommand("copy");
    const button = document.getElementById("copy-button");
    button.classList.add("turn-green");
    input.classList.add("green-border");
    setTimeout(function() {
      button.classList.remove("turn-green");
      input.classList.remove("green-border");
      this.setState({copyButton: "Copy"});
    }.bind(this),1000)

  }

  render() {
    let hoursLeft;
    if (this.state.invite.expire_date) {
      const expireDate = new Date(this.state.invite.expire_date);
      const msLeft = expireDate.getTime() - (new Date()).getTime();
      hoursLeft = (msLeft / (1000 * 60 * 60)).toFixed(2);
    }
    return (
      <section className="transparent-background">
        <section id="invite-box">
          <h1>
            {this.state.editMode ? (
              "SERVER INVITE LINK SETTINGS"
            ) : (
              `INVITE FRIENDS TO ${this.props.server.name.slice(0,26).toUpperCase()}`
            )}
          </h1>
          {this.state.editMode ? (
            <form onSubmit={this.submitForm} className="form-type-1">
              <label>
                EXPIRE AFTER
                <select onChange={this.changeInput("duration")} defaultValue="0">
                  <option value="0" disabled>Select...</option>
                  <option value="1">1 hour</option>
                  <option value="6">6 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">1 day</option>
                  <option value="">Never</option>
                </select>
              </label>
              <label>
                MAX NUMBER OF USES
                <select onChange={this.changeInput("max_uses")} defaultValue="0">
                  <option value="0"disabled>Select...</option>
                  <option value="">No limit</option>
                  <option value="1">1 use</option>
                  <option value="5">5 uses</option>
                  <option value="10">10 uses</option>
                  <option value="25">25 uses</option>
                  <option value="50">50 uses</option>
                  <option value="100">100 uses</option>
                </select>
              </label>
              <div id="invite-bottom">
                <button onClick={this.modeSwitch}>Cancel</button>
                <input type="submit" value="Generate a New Link"/>
              </div>
            </form>  
          ) : (
            <div>
              <div className="scrollable">
                <ul>
                    <li>a</li><li>a</li><li>a</li><li>a</li><li>a</li><li>a</li>
                    <li>a</li><li>a</li><li>a</li><li>a</li><li>a</li><li>a</li>
                    <li>a</li><li>a</li><li>a</li><li>a</li><li>a</li><li>a</li>
                </ul>
              </div>
              <p>OR, SEND A SERVER INVITE LINK TO A FRIEND</p>
              <input id="link-text" value={this.state.inviteLink} onChange={()=>{}}/>
              <button id="copy-button" onClick={this.copy}>{this.state.copyButton}</button>
              <span>
                  {`Your invite link expires in ${hoursLeft || "∞"} ${hoursLeft == 1 ? "hour" : "hours"}`}
              </span>
              {this.state.invite.max_uses && (
                <span>
                  , or after {this.state.invite.max_uses} {this.state.invite.max_uses == 1 ? "use" : "uses"}
                </span>
              )}
              .&nbsp;
              <span id="edit-invite" onClick={this.modeSwitch}>Edit invite link.</span>
            </div>
          )}
        </section>
        

      </section>
    )
  }
}

export default InstantInvite