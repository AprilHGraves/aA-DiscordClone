import React from 'react';
import MyAccount from './my_account';

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "myAccount"
    };
    this.closeSettings = this.closeSettings.bind(this);
  }

  closeSettings(event) {
    event.preventDefault();
    this.props.closeSettings()
  }

  getPage() {
    switch (this.state.currentPage) {
      case "privacyAndSafety":
        return <div>no privacy yet</div>
      default:
        return <MyAccount />
    }
  }

  render() {
    return (
      <section className="settings-fullscreen">
        <div className="settings-left">
          <section id="user-settings-left">
            {/* put title here in the future  */}
            <ul>
              <li><button id="logout" onClick={this.props.logout}>Log Out</button></li>
              <li>
                <a href="https://twitter.com"><i className='fab fa-twitter'></i></a>
                <a href="https://facebook.com"><i className='fab fa-facebook'></i></a>
                <a href="https://instagram.com"><i className='fab fa-instagram'></i></a>
              </li>  
            </ul>
            
          </section>
          
        </div>
        <div className="settings-right">
          {this.getPage()}
          <button id="x-button" onClick={this.closeSettings}>X</button>
        </div>
      </section>
    )

  }
}

export default UserSettings;