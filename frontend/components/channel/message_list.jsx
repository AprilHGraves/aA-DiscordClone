import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { updateMessage, destroyMessage } from '../../actions/messages_actions';
import { selectServerMembershipsByServer } from '../../util/selectors';
import { showModal, focusServerAndChannel } from "../../actions/ui_actions";
import { createDmConversation } from '../../actions/dm_conversations_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.session.id,
    server: ownProps.server,
    channel: ownProps.channel,
    messages: ownProps.messages,
    memberships: ownProps.memberships,
    dm_conversations: state.entities.dm_conversations
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateMessage: (id, msg) => dispatch(updateMessage(id, msg)),
    destroyMessage: (msgId) => dispatch(destroyMessage(msgId)),
    showModal: (modalName) => dispatch(showModal(modalName)),
    createDmConversation: (myId, theirId) => dispatch(createDmConversation(myId, theirId)),
    focusServerAndChannel: (sId, cId) => dispatch(focusServerAndChannel(sId, cId))
  }
}

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMsg: "",
      body: ""
    };
    this.showMessageButtons = this.showMessageButtons.bind(this);
    this.showMessageDropdown = this.showMessageDropdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.cancelEditor = this.cancelEditor.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.delMessage = this.delMessage.bind(this);
    this.openDM = this.openDM.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  openDM(otherUserId) {
    return () => {
      const convoArray = Object.values(this.props.dm_conversations);
      const convo = convoArray.find(ele => ele.other_user_id === otherUserId);
      if (!convo) {
        this.props.createDmConversation(this.props.userId, otherUserId)
          .then((newConvo) => this.switchToDM(newConvo.id))
      } else {
        this.switchToDM(convo.id);
      }
    }
  }

  switchToDM(convoId) {
    this.props.history.push(`/channels/@me/${convoId}`);
    this.props.focusServerAndChannel("@me", convoId);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target)) {
      this.hideMessageDropdown();
    }
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateMessage(this.state.editMsg, this.state.body);
    this.setState({editMsg: "", body: ""});
  }

  delMessage(event) {
    event.preventDefault();
    this.props.destroyMessage(event.target.id);
  }
  openEditor(body) {
    return (event) => {
      event.preventDefault();
      this.setState({editMsg: event.target.id, body});
    }
  }
  cancelEditor(event) {
    event.preventDefault();
    this.setState({editMsg: "", body: ""});
  }

  convertDate(date) {
    if (new Date().toLocaleDateString() != new Date(date).toLocaleDateString()) {
      return new Date(date).toLocaleDateString()
    } else {
      return new Date(date).toLocaleTimeString()
    }
  }

  showMessageDropdown(event) {
    const id = event.target.id;
    const node = document.getElementById(`opt-${id}`);
    node.classList.add("show-message-dropdown");
    this.inside = node;
    document.addEventListener("mousedown", this.handleClickOutside);
  };

  hideMessageDropdown(event) {
    this.inside.classList.remove("show-message-dropdown");
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  showMessageButtons (show) {
    return function (event) {
      const id = event.target.id;
      const el = document.getElementById(`ml${id}`);
      if (show && el) {
        el.classList.add("show-hidden");
      } else if (el) {
        el.classList.remove("show-hidden");
      }
    }.bind(this)
  };

  render() {
    const users = this.props.users;
    const memberships = this.props.memberships;
    const serverId = this.props.server.id;
    let myId = this.props.userId;
    let isOwner = myId == this.props.server.owner_id;
    return (
      <ul id="message-center" className="scrollable">

        <li id="first-message">
          {this.props.server.id != "@me" ? (
            <span>Welcome to the beginning of #{this.props.channel.name} channel</span>
          ) : (
              <span>The Beginning of a new Direct Message conversation!</span>
            )}
          <div id="logo-overlay">
            <img src="https://discordapp.com/assets/5eed3f20bc3c75fd5ff63c60df8f679d.png" />
            <img src="https://discordapp.com/assets/129bf63f677720a34bc7ffeb74468a0e.png" />
          </div>
        </li>
        {this.props.messages.map(message => {
          const user = users[message.user_id];
          const membership = memberships.find(m => m.server_id == serverId && m.user_id == user.id);
          isOwner = isOwner;
          myId = myId;
          return (        
            <li key={message.id}>
 
              <img
                className="user-pic"
                src={user.image_url}
              // put click left and right-click events in the future to show profile, dropdown options
              />
              <div>
                <div className="relative">
                  <div id={`opt-ud${message.id}`} className="dropdown dropdown-user hidden">
                    {myId === message.user_id ? (
                      <button
                        onClick={() => this.props.showModal("Change Nickname")}
                      >
                        Change Nickname
                      </button>
                    ):(
                      <button
                        onClick={this.openDM(message.user_id)}
                      >
                        Message
                      </button>

                    )}
                  </div>
                  <button
                    id={`ud${message.id}`}
                    className="user-username white-text"
                  //put left and right-click events inthe future to show profile, dropdown options
                    onClick={this.showMessageDropdown}
                  >
                    {(membership && membership.nickname) || user.username}
                  </button>

                </div>
                &nbsp;
                <span id="message-date">{this.convertDate(message.created_at)}</span>

                {this.state.editMsg == message.id ? (
                  <form key={message.id}
                    onSubmit={this.submitForm}
                  >
                    <textarea
                      value={this.state.body}
                      onChange={this.changeInput("body")}
                    />
                    <div>
                      <button onClick={this.cancelEditor}>cancel</button>
                      <button onClick={this.handleSubmit}>save</button>
                    </div>
                    
                  </form>
                ) : (
                  <div className="relative">
                    <div
                      id={`${message.id}`}
                      className="revealer message-body"
                      onMouseEnter={this.showMessageButtons(true)}
                      onMouseLeave={this.showMessageButtons(false)}
                    >
                      {message.body}
                      {message.created_at != message.updated_at ? (
                        <span id="edited-txt">&nbsp;(edited)</span>
                      ):""}
                      <i
                        id={`ml${message.id}`}
                        className="fas fa-ellipsis-v hidden"
                        onClick={this.showMessageDropdown}
                      >

                      </i>
                      <div id={`opt-ml${message.id}`} className="dropdown dropdown-message hidden">
                          {myId == message.user_id && (

                            <button
                              id={message.id}
                              onClick={this.openEditor(message.body)}
                            >
                              Edit
                            </button>
                          )}
                          {(isOwner || myId == message.user_id) && (
                            <button
                              id={message.id}
                              onClick={this.delMessage}
                            >
                              Delete
                            </button>
                          )}

                        
                      </div>
                    </div>
                    
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageList))