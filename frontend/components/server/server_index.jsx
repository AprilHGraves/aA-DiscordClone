import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Home"
    };
    this.activate = this.activate.bind(this);
  }

  activate(id) {
    return event => {
      const oldNode = document.getElementById(this.state.active);
      oldNode.classList.remove("active");
      const newNode = document.getElementById(id);
      newNode.classList.add("active");
      this.setState({ active: id });
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
    return (
      <ul id="server-index">
        <li id="Home" onClick={this.activate("Home")} className="active" onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
          <Link to="/channels/@me">
            <img src={window.logo2Img} alt="Home" />
          </Link>
          <p>Home</p>
        </li>
        {/* Example code for later iterating over servers and showing them
        <li id="aName" className="animate-hover" onClick={this.activate("aName")} onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
          <Link to="/channels/aName">
            <img src={window.logo2Img} alt="aName" />
          </Link>
          <p>Pretend Server</p>
        </li> */}
      </ul>
    )
  }
}

export default ServerIndex;