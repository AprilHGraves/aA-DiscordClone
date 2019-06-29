import React from 'react';
import { withRouter } from 'react-router-dom'
import UserSettingsContainer from '../settings/user_settings_container';
import ServerDropdownContainer from '../server/server_dropdown_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      showServerDropdown: false
    };
    this.showComponent = this.showComponent.bind(this);
    this.logout = this.logout.bind(this);
    this.closeComponent = this.closeComponent.bind(this);
  }

  componentDidMount() {
    if (this.props.savedHeight) {
      // TODO save scrolls for each server in state ui.scrollY
    }
  }

  showComponent(key) {
    return event => {
      event.preventDefault();
      this.setState({[key]: true});
    }
  }

  closeComponent(key) {
    return () => {
      this.setState({[key]: false});
    }
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  settings() {
    if (this.state.showSettings) {
      return <UserSettingsContainer closeSettings={this.closeComponent("showSettings")}/>
    }
  }

  serverDropdown() {
    if (this.state.showServerDropdown) {
      return <ServerDropdownContainer server={this.props.server} closeComponent={this.closeComponent("showServerDropdown")}/>
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
  
  render() {
    const tag = this.props.user.tag;
    const tagIdxStart = tag.indexOf("#");
    const tagNum = tag.slice(tagIdxStart);
    return (
      <section id="channel-index">
        {this.props.server.name !== "Home" ? (
          <button id="channel-top" onClick={this.showComponent("showServerDropdown")}>
            <h1>{this.props.server.name}</h1>
            <img src="https://discordapp.com/assets/779a770c34fcb823a598a7277301adaf.svg" />
          </button>
        ):(
          <div id="channel-top">
            <h1>Home</h1>
          </div>
        )}
        {this.serverDropdown()}
        
        <div id="channel-box" className="scrollable">
          <div>
            {}
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
          <button id="cog" onClick={this.showComponent("showSettings")} onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
            <i className='fas fa-cog'/>
            <p>User Settings</p>
          </button>
        </section>
        {this.settings()}
      </section>
    )
  }
}

export default withRouter(ChannelIndex);