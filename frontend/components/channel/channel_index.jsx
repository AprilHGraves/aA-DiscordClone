import React from 'react';
import { withRouter } from 'react-router-dom'

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TODO save scrolls for each server in state ui.scrollY
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
          <div>
            {/* TODO put instant invite button here if admin */}
          </div>
          <ul>
            <li>a</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
            <li>b</li><li>a</li><li>a</li><li>a</li>
          </ul>
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
            <p>User Settings</p>
          </button>
        </section>
      </section>
    )
  }
}

export default withRouter(ChannelIndex);