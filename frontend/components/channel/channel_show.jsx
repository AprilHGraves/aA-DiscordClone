import React from 'react';

class ChannelShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMembers: true
    };
    this.toggleMembersList = this.toggleMembersList.bind(this);
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
  }

  showUsers() {
    if (this.props.server.id != "@me" && this.state.showMembers) {
      const users = this.props.users;
      const ownerId = this.props.server.owner_id;
      return (
        <ul id="user-list" className="scrollable">
          <h1>Users—{this.props.memberships.length}</h1>
          {this.props.memberships.map(member => {
            const user = users[member.user_id];
            return (
              <li
                key={member.id}
              >
                <img src={user && user.image_url}/>
                <span>{member.nickname || user && user.username}</span>
                {member.user_id === ownerId && (
                  <i
                    className="fas fa-crown"                    
                  />
                )}
              </li>
            )
          })}
        </ul>
      ) 
    }
  }

  toggleMembersList() {
    this.setState({showMembers: !this.state.showMembers});
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
            <ul id="message-center" className="scrollable">
              <li id="first-message">
                Welcome to the beginning of the {channel.name} channel.
                <div id="logo-overlay">
                  <img src="https://discordapp.com/assets/5eed3f20bc3c75fd5ff63c60df8f679d.png"/>
                  <img src="https://discordapp.com/assets/129bf63f677720a34bc7ffeb74468a0e.png"/>
                </div>
              </li>
              <li>test</li><li>test</li><li>test</li>

            </ul>
            <form id="message-form" onSubmit={this.handleSubmit}>
              <input placeholder={`message ${channel.name}`}/>
            </form>

          </div>
          {this.showUsers()}
        </div>
        
      </section>
    )
  }
}

export default ChannelShow;