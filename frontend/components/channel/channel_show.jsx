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
      el.scrollTop = el.scrollHeight;
    }    
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createMessageInChannel(this.state.body, this.props.channel.id);
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
    return (
      <section id="channel-show">
        <div id="show-top">
          <div>
            <span className="hash">#</span>
            <span className="channel-name white-text">{channel.name}</span>
            
            {channel.topic && (
              <span className="channel-topic">
                &nbsp;{channel.topic}
              </span>
            )}
          </div>
          <div>
            {this.props.server.id != "@me" && (
            <i 
              className="fas fa-user-friends white-text" 
              onClick={this.toggleMembersList}
            />
            )}
          </div>          
        </div>

        <div id="show-bottom">
          <div id="message-box" >
            <MessageList 
              users={this.props.users}
              server={this.props.server}
              channel={this.props.channel}
              messages={this.props.messages}
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