import React from 'react';
import { withRouter } from 'react-router-dom'
import UserSettingsContainer from '../settings/user_settings_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false
    };
    this.showSettings = this.showSettings.bind(this);
    this.logout = this.logout.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
  }

  componentDidMount() {
    if (this.props.savedHeight) {
      // TODO save scrolls for each server in state ui.scrollY
    }
  }

  showSettings(event) {
    event.preventDefault();
    this.setState({showSettings: true});
  }

  closeSettings() {
    this.setState({showSettings: false});
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  settings() {
    if (this.state.showSettings) {
      return <UserSettingsContainer closeSettings={this.closeSettings}/>
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
        <div id="channel-top">

        </div>
        <div id="channel-box" className="scrollable">
          <div>

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
          <img src="https://i.imgur.com/AfO0Cmi.jpg" />
          <div>
            <p>{this.props.user.username}</p>
            <p>{tagNum}</p>
          </div>
          <button id="cog" onClick={this.showSettings} onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
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