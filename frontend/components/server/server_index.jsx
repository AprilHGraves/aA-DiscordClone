import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.activate = this.activate.bind(this);
  }

  componentDidMount() {
    const urlMatch = this.props.location.pathname.match(/channels\/(.*)/)[1];
    this.props.fetchServers(urlMatch)
      .then((payload) => {
        const sId = payload.urlMatch.match(/(\w+)\/?/)[1];
        const cMatch = payload.urlMatch.match(/\d+\/(.*)\/?/);
        let serverId = "@me";
        let channelId = "Home";
        if (payload.servers && payload.servers[sId]) {
          serverId = sId;
          if (cMatch && payload.channels[cMatch[1]]) {
            channelId = cMatch[1];
          } else {
            const channelArray = Object.values(payload.channels);
            const firstCId = channelArray.filter(channel => channel.server_id == serverId);
            channelId = firstCId[0] && firstCId[0].id || "";
          }
        }
        this.props.focusChannel(channelId);
        this.props.focusServer(serverId);
        this.props.noteChannel(serverId, channelId);
        const pathPartial = `${serverId}/${channelId}`;
        if (serverId != "@me") {
          this.props.fetchServerMembershipsByServerId(serverId);
        }
        if (payload.urlMatch != pathPartial) {
          this.props.history.push(`/channels/${pathPartial}`);
        }
      });
    this.props.fetchDmConversations();
    this.switchActiveNode;
  }

  componentDidUpdate() {
    this.switchActiveNode();
  }

  switchActiveNode() {
    const oldNode = document.querySelector(".active-server");
    if (oldNode) {
      oldNode.classList.remove("active-server")
    }
    const id = this.props.location.pathname.match(/channels\/@?(\w+)\/?/)[1];
    const foundNode = document.getElementById(`s${id}`);
    const newNode = foundNode || document.getElementById("aHome");
    newNode.classList.add("active-server");
  }

  activate(id) {
    return event => {
      this.props.focusServer(id);
      if (id !== "Home") {
        this.props.fetchChannels(id);
        this.props.fetchServerMembershipsByServerId(id);
      }
    }
  }

  showName(show) {
    return event => {
      const id = event.currentTarget.id;
      const el = document.querySelector(`#${id} p`);
      if (show) {
        el.classList.add("show-label");
      } else {
        el.classList.remove("show-label");
      }
    }
  }

  showModal(modalName) {
    return (event) => {
      this.props.showModal(modalName);
    }
  }

  render() {
    const channel_notes = this.props.channel_notes;
    return (
      <div id="server-index-container" className="scroll-container">
        <ul id="server-index" className="scrollable">
          <li
            key="Home"
            id="aHome"
            className="animate-hover"
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
            const assocChannel = channel_notes[server.id];
            return (
              //put a letter in front and use id to ensure correct format for finding it using css selector (one word, starts with letter)
              <li
                key={server.id}
                id={`s${server.id}`}
                className="animate-hover" 
                onClick={this.activate(server.id)}
                onMouseEnter={this.showName(true)}
                onMouseLeave={this.showName(false)}
              >
                <Link to={`/channels/${server.id}/${assocChannel || ""}`}>
                  {server.image_url ? (
                    <img src={server.image_url} />
                  ) : (
                    <div className="image-missing">{server.name[0]}</div>
                  )}
                </Link>
                <p>{server.name}</p>

              </li>
            )
          })}

          <li
            id="show-server-form"
            className="animate-hover"
            onClick={this.showModal("Add Server")}
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