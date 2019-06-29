import React from 'react';
import { Link } from 'react-router-dom';
import ServerAddContainer from './server_add_container';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "aHome",
      showServerAdd: false
    };
    this.activate = this.activate.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.closeComponent = this.closeComponent.bind(this);
  }

  componentDidMount() {
    this.props.getServers();
  }

  activate(id) {
    return event => {
      const oldNode = document.getElementById(this.state.active);
      oldNode.classList.remove("active");
      const newNode = document.getElementById(id);
      newNode.classList.add("active");
      this.props.focusServer(id.slice(1));
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

  showComponent(key) {
    return event => {
      event.preventDefault();
      this.setState({ [key]: true });
    }
  }

  closeComponent(key) {
    return () => {
      this.setState({ [key]: false });
    }
  }

  render() {
    return (
      <div id="server-index-container" className="scroll-container">
        {this.state.showServerAdd && <ServerAddContainer closeComponent={this.closeComponent("showServerAdd")} />}
        <ul id="server-index" className="scrollable">
          <li key="Home" id="aHome" onClick={this.activate("aHome")} className="active" onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
            <Link to="/channels/@me">
              <img src={window.logo2Img} />
            </Link>
            <p>Home</p>
          </li>
          {this.props.servers.map(server => {
            return (
              //put a letter in front and use id to ensure correct format for finding it using css selector (one word, starts with letter)
              <li key={server.id} id={`a${server.id}`}
                className="animate-hover" 
                onClick={this.activate(`a${server.id}`)}
                onMouseEnter={this.showName(true)}
                onMouseLeave={this.showName(false)}
              >
                <Link to={`/channels/${server.id}`}>
                  <img src="https://i.imgur.com/dnsY3cX.jpg" />
                </Link>
                <p>{server.name}</p>

              </li>
            )
          })}
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

          <li id="show-server-form" className="animate-hover" onClick={this.showComponent("showServerAdd").bind(this)} onMouseEnter={this.showName(true)} onMouseLeave={this.showName(false)}>
            <span>+</span>
            <p>Add a Server</p>
          </li>
        </ul>
      </div>
      
    )
  }
}

export default ServerIndex;