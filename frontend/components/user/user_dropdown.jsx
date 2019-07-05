import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createDmConversation } from '../../actions/dm_conversations_actions';
import { showModal } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {

  return {
    position: ownProps.position,
    currUser: ownProps.currUser,
    targetUser: ownProps.targetUser,
    dmConversations: state.entities.dm_conversations,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDmConversation: (myId, theirId) => dispatch(createDmConversation(myId, theirId)),
    showModal: (modalName) => dispatch(showModal(modalName)),
    closeComponent: () => dispatch(showModal(""))
  }
}

class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.openDM = this.openDM.bind(this);
  }

  componentDidMount() {
    this.inside = document.getElementById("user-dropdown");
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    this.props.clearErrors();
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target)) {
      this.props.closeComponent();
    }
  }

  openDM(event) {
    const dms = this.props.dmConversations;
    let dmId;
    for (let dm in dms) {
      if (dm.other_user_id == this.props.targetUser) {
        dmId = dm.id;
        break;
      }
    }
    if (dmId) {
      this.history.push(`/channels/@me/${dmId}`);
    } else {
      this.props.createDmConversation(myId, theirId)
        .then(dmConversation => {
          this.history.push(`/channels/@me/${dmId}`);
        })
    }
  }

  render() {
    return (
      <div id="user-dropdown">
      
        {this.props.currUser == this.props.targetUser ? (
          <button>
            Change Nickname
          </button>
        ) : (
          <button onClick={this.openDM}>
            Message
          </button>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDropDown))