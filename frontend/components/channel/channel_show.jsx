import React from 'react';
import MembersSidebar from './members_sidebar';
import MessageList from './message_list';

class ChannelShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMembers: true,
      userFocus: "",
      body: ""
    };
    this.toggleMembersList = this.toggleMembersList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {    
    if (this.props.savedHeight) {
      // TODO save scrolls for each channel in state.ui.scrolls
    } else {
      const el = document.getElementById("message-center");
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.server.id === "@me") {
      this.props.createMessageInDM(this.state.body, this.props.channel.id);
    } else {
      this.props.createMessageInChannel(this.state.body, this.props.channel.id);
    }
    this.setState({body: ""});
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value });
    }
  }

  toggleMembersList() {
    this.setState({ showMembers: !this.state.showMembers });
  }

  render() {
    const channel = this.props.channel;
    if (!this.props.server || !this.props.channel) {
      return 
    }
    if (this.props.server.id === "@me" && this.props.channel.name === "Conflict") {
      return (
        <section id="channel-show">
          <div id="show-top">
            <div>
              <span className="hash">#</span>
              <span className="channel-name white-text">Welcome to Conflict</span>
            </div>
          </div>
          <div className="welcome">
            Welcome to Conflict! This was my first project using Ruby on Rails with React and Redux. Please check out the <a href='https://github.com/AprilHGraves/aA-DiscordClone'>GitHub page.</a> I put some gifs there that show off my favorite parts.
          </div>
        </section>
      )
    }
    return (
      <section id="channel-show">
        {this.props.server.id != "@me" ? (
        <div id="show-top">
          <div>
            <span className="hash">#</span>
            <span className="channel-name white-text">{channel.name}</span>&nbsp;
            {channel.topic && (
              <span className="channel-topic">
                {channel.topic}
              </span>
            )}
          </div>
          <div>            
            <i 
              className="fas fa-user-friends white-text" 
              onClick={this.toggleMembersList}
            />
          </div>
        </div>
        ):(
        <div id="show-top">
          <div>
            <span className="hash">@</span>
            <span className="channel-name white-text">{this.props.users[this.props.channel.other_user_id].username}</span>
          </div>
        </div>
        )}

        <div id="show-bottom">
          <div id="message-box" >
            <MessageList 
              users={this.props.users}
              server={this.props.server}
              channel={this.props.channel}
              messages={this.props.messages}
              memberships={this.props.memberships}
            />
            
            <form id="message-form" onSubmit={this.handleSubmit}>
              <input
                value={this.state.body}
                placeholder={`message ${channel.name}`}
                onChange={this.changeInput("body")}
              />
            </form>

          </div>

          {this.props.server.id != "@me" && this.state.showMembers && (
            <MembersSidebar 
              users={this.props.users}
              server={this.props.server}
              memberships={this.props.memberships}
            />
          )}
 
        </div>        
      </section>
    )
  }
}

export default ChannelShow;