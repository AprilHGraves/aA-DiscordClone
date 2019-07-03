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

    const oldNode = document.querySelector(".active-channel");
    if (oldNode) {
      oldNode.classList.remove("active-channel");
    }
    const idMatch = this.props.location.pathname.match(/channels\/(.*)\/(.*)/);
    if (idMatch) {
      const foundNode = document.getElementById(`a${idMatch[2]}`);
      if (foundNode) {
        foundNode.classList.add("active-channel");
        const a = foundNode.children[1];
        a.classList.remove("hidden");
      }
    }
  }

  activate(id) {
    const serverId = this.props.server.id;
    return event => {
      this.props.focusChannel(id);
      this.props.noteChannel(serverId, id);
    }
  }

  showHidden(show, elType) {
    return event => {
      const id = event.currentTarget.id;
      const el = document.querySelector(`#${id} ${elType}`);
      if (show) {
        el.classList.add("show-hidden");
      } else {
        el.classList.remove("show-hidden");
      }
    }
  }

  getChannelUls() {
    return (
      <ul id="channel-list">
        <div id="category-label">
          <h1>TEXT CHANNELS</h1>
          <button
            id="text-channels"
            className="revealer"
            onClick={this.props.showAddChannel}
            onMouseEnter={this.showHidden(true, "p")}
            onMouseLeave={this.showHidden(false, "p")}
          >
            <i className="fas fa-plus"/>
            <p className="small-black-tag hidden">Create Channel</p>
          </button>
        </div>
        {this.props.channels.map(channel => {
          return (
            <li
              key={channel.id}
              id={`a${channel.id}`}
              className="revealer"
              onClick={this.activate(channel.id)}
              onMouseEnter={this.showHidden(true, "div")}
              onMouseLeave={this.showHidden(false, "div")}
            >
              <Link to={`/channels/${this.props.server.id}/${channel.id}`}>
                <span className="hash">#</span>&nbsp;
                { channel.name.length > 20 && `${channel.name.slice(0,20)}...` || channel.name }
              </Link>
              <div className="channel-options hidden">
                <i
                  id={`plus-${channel.id}`}
                  className="fas fa-user-plus revealer"
                  onClick={this.props.showInvitePeople}
                  onMouseEnter={this.showHidden(true, "p")}
                  onMouseLeave={this.showHidden(false, "p")}
                >
                  <p className="small-black-tag hidden">Create Instant Invite</p>
                </i>
                <i
                  id={`cog-${channel.id}`}
                  className="fas fa-cog revealer"
                  onClick={this.props.showChannelSettings}
                  onMouseEnter={this.showHidden(true, "p")}
                  onMouseLeave={this.showHidden(false, "p")}
                >
                  <p className="small-black-tag hidden">Edit Channel</p>
                </i>
              </div>

            </li>
            
          )
        })}
        {/* for scroll testing */}
        {/* <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li>
        <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> <li>test</li> */}
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
          {/* TODO fix tag showing and scrolling. See the server index example */}
          <div id="channel-box">
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
            id="user-cog"
            className="revealer"
            onClick={this.props.showUserSettings}
            onMouseEnter={this.showHidden(true, "p")}
            onMouseLeave={this.showHidden(false, "p")}
          >
            <i className='fas fa-cog'/>
            <p className="small-black-tag hidden">User Settings</p>
          </button>
        </section>
      </section>
    )
  }
}

export default withRouter(ChannelIndex);