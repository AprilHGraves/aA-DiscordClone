import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ServerAddContainer from './server_add_container';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.activate = this.activate.bind(this);
  }

  componentDidMount() {
    this.props.getServers();
    const id = this.props.location.pathname.match(/channels\/(.*)/)[1];
    this.props.focusServer(id);
  }

  componentDidUpdate() {
    const oldNode = document.querySelector(".active-server");
    if (oldNode) {
      oldNode.classList.remove("active-server")
    }
    const id = this.props.location.pathname.match(/channels\/(.*)/)[1];
    const foundNode = document.getElementById(`a${id}`);
    const newNode = foundNode || document.getElementById("aHome");
    newNode.classList.add("active-server");            
  }

  activate(id) {
    return event => {
      this.props.focusServer(id);
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
      <div id="server-index-container" className="scroll-container">
        <ul id="server-index" className="scrollable">
          <li
            key="Home"
            id="aHome"
            onClick={this.activate("Home")} 
            onMouseEnter={this.showName(true)}
            onMouseLeave={this.showName(false)}
          >
            <Link to="/channels/@me">
              <img src={window.logo2Img} />
            </Link>
            <p>Home</p>
          </li>
          {this.props.servers.map(server => {
            return (
              //put a letter in front and use id to ensure correct format for finding it using css selector (one word, starts with letter)
              <li
                key={server.id}
                id={`a${server.id}`}
                className="animate-hover" 
                onClick={this.activate(server.id)}
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

          <li
            id="show-server-form"
            className="animate-hover"
            onClick={this.props.showAddServer}
            onMouseEnter={this.showName(true)}
            onMouseLeave={this.showName(false)}
          >
            <span>+</span>
            <p>Add a Server</p>
          </li>
        </ul>
      </div>
      
    )
  }
}

export default withRouter(ServerIndex);