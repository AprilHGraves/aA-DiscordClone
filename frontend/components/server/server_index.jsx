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

  showServerForm() {
    
  }

  render() {
    return (
      <div id="server-index-container" className="scroll-container">
        <ul id="server-index" className="scrollable">
          <li id="Home" onClick={this.activate("Home")} className="active" onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
            <Link to="/channels/@me">
              <img src={window.logo2Img} />
            </Link>
            <p>Home</p>
          </li>
          {/* Example code for later iterating over servers and showing them */}
          <li id="aName" className="animate-hover" onClick={this.activate("aName")} onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
            <Link to="/channels/aName">
              <img src="https://i.imgur.com/dnsY3cX.jpg" />
            </Link>
            <p>Pretend Server</p>
          </li>
          {/* for testing scrolling */}
          {/* <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li> */}

          <li id="show-server-form" className="animate-hover" onClick={this.showServerForm} onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
            <span>+</span>
            <p>Add a Server</p>
          </li>
        </ul>
      </div>
      
    )
  }
}

export default ServerIndex;