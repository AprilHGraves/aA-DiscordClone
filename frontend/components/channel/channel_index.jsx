import React from 'react';
import { withRouter } from 'react-router-dom'
import EditFormContainer from '../user/edit_form_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false
    };
    this.showSettings = this.showSettings.bind(this);
    this.logout = this.logout.bind(this);
  }

  showSettings(event) {
    event.preventDefault();
    this.setState({showSettings: !this.state.showSettings})
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  settings() {
    if (this.state.showSettings) {
      return (
        <section className="user-settings">
          <nav>
            <button onClick={this.logout}>Log Out</button>
          </nav>
          <EditFormContainer/>
        </section>
        
      )
    }
  }
  

  render() {
    return (
      <section>

        <section>
          <button onClick={this.showSettings}>User Settings</button>
        </section>
        {this.settings()}
      </section>
    )
  }
}

export default withRouter(ChannelIndex);