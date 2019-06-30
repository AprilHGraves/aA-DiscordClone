import React from 'react';
import UpdateUserFormContainer from '../user_form/update_user_form_container';

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "My Account"
    };
    this.closeSettings = this.closeSettings.bind(this);
  }

  closeSettings(event) {
    event.preventDefault();
    this.props.closeComponent();
  }

  switchPage(key) {
    return event => {
      this.setState({ page: key });
    }
  }

  getPage() {
    switch (this.state.page) {
      // TODO add more user settings options
      default:
        return (
          <section className="right-fs-box">
            <h1>MY ACCOUNT</h1>
            <UpdateUserFormContainer />
          </section>
        );
    }
  }

  render() {
    return (
      <section className="settings-fullscreen">
        <div className="settings-left">
          <section className="options-list">
            <ul>
              <h1>USER SETTINGS</h1>
              <li onClick={this.switchPage("My Account")} className="selected">My Account</li>
            </ul>
            <ul>
              <li onClick={this.props.logout} className="destroy">Log Out</li>
            </ul>
            <div id="social-links">
              <a href="https://twitter.com"><i className='fab fa-twitter'></i></a>
              <a href="https://facebook.com"><i className='fab fa-facebook'></i></a>
              <a href="https://instagram.com"><i className='fab fa-instagram'></i></a>
            </div>            
          </section>          
        </div>
        <div className="settings-right">
          {this.getPage()}
          <button id="x-button" onClick={this.props.closeComponent}>X</button>
        </div>
      </section>
    )
  }
}

export default UserSettings;