import React from 'react';
import { withRouter, Link } from 'react-router-dom'

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.activate = this.activate.bind(this);
  }

  componentDidMount() {
    
  }
  // TODO save scrolls for each server in state ui.scrollY

  componentDidUpdate() {

    // const oldNode = document.querySelector(".active-channel");
    // if (oldNode) {
    //   oldNode.classList.remove("active-channel")
    // }
    // const id = this.props.location.pathname.match(/channels\/(.*)\/(.*)/)[2];
    // const foundNode = document.getElementById(`a${id}`);
    // if (foundNode) {
    //   newNode.classList.add("active-channel");
    // }
  }

  activate(id) {
    return event => {
      this.props.focusChannel(id);
    }
  }
  
  showName(show) {
    return event => {
      const id = event.currentTarget.id;
      const el = document.querySelector(`#${id} p`);
      if (show) {
        el.classList.add("show-name");
      } else {
        el.classList.remove("show-name");
      }
    }
  }

  hideChannels(event) {
    // TODO code this part
    // const ul = event.target.parent;
    // const lis = ul.children;
    // for (let i=0, fin=ul.length; i<fin; i++) {
    //   lis[i].classList.add("collapse");
    // }
  }

  showButtons(show) {
    
  }

  getChannelUls() {
    return (
      <ul>
        <h1 onClick={this.hideChannels}>TEXT CHANNELS</h1>
        {this.props.channels.map(channel => {
          return (
            <li
              key={channel.id}
              id={`a${channel.id}`}
              onClick={this.activate(channel.id)}
              onMouseEnter={this.showButtons(true)}
              onMouseLeave={this.showButtons(false)}
            >
              <Link to={`/channels/${this.props.server.id}/${channel.id}`}>
                { channel.name }
              </Link>
              <div>
                <i 
                  className="fas fa-user-plus"
                  onClick={this.props.showInvitePeople}
                />
                <p className="small-black-tag">Create Instant Invite</p>
                <i 
                  className="fas fa-cog"
                />
                <p className="small-black-tag">Edit Channel</p>
              </div>

            </li>
          )
        })}
      </ul>
    )
  }
  
  render() {
    const tag = this.props.user.tag;
    const tagIdxStart = tag.indexOf("#");
    const tagNum = tag.slice(tagIdxStart);
    let serverName = this.props.server.name;
    serverName = serverName.length > 25 && serverName.slice(0,26) || serverName;
    return (
      <section id="channel-index">
        {this.props.server.name !== "Home" ? (
          <button id="channel-top" onClick={this.props.showServerDropdown}>
            <h1>{serverName}</h1>
            <img src="https://discordapp.com/assets/779a770c34fcb823a598a7277301adaf.svg" />
          </button>
        ):(
          <div id="channel-top">
            <h1>Home</h1>
          </div>
        )}
        
        <div id="channel-box" className="scrollable">
            {this.props.server.owner_id === this.props.user.id ? (
              <div className="sticky-box">
                <div id="party-members"/>
                <p>An adventure begins.<br/>Let's add some party members!</p>
                <button onClick={this.props.showInvitePeople}>Invite People</button>
              </div>
            ) : (
              <div className="sticky-box">
                <div id="quick-switcher-picture"/>
                <p>I took this picture off of Discord to distract you.</p>
                <button>No Switcher Yet</button>
              </div>
            )}
          <div id="channel-index">
            {this.getChannelUls()}            
          </div>
        </div>
        <section id="user-bar">
          <img src={this.props.user.image_url} />
          <div>
            <p>{this.props.user.username}</p>
            <p>{tagNum}</p>
          </div>
          <button
            id="cog"
            onClick={this.props.showUserSettings}
            onMouseEnter={this.showName(true)}
            onMouseLeave={this.showName(false)}
          >
            <i className='fas fa-cog'/>
            <p className="small-black-tag">User Settings</p>
          </button>
        </section>
      </section>
    )
  }
}

export default withRouter(ChannelIndex);