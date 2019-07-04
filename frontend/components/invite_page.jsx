import React from 'react';
import { Link } from 'react-router-dom';
import { joinServerByCode } from '../actions/server_memberships_actions';
import { connect } from "react-redux";
import { noteChannel } from '../actions/ui_actions';

const mapDispatchToProps = dispatch => {
  return {
    joinServerByCode: (code) => dispatch(joinServerByCode(code)),
    noteChannel: (sId, cId) => dispatch(noteChannel(sId, cId))
  }
}

class Invite extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.joinServerByCode(this.props.match.params.id)
      .then((payload) => {
        this.props.noteChannel(payload.serverId, payload.channelId);
        this.props.history.push(`/channels/${payload.serverId}/${payload.channelId}`);
      })
  }

  render() {
    return (
      <section id="game-bg" className="bg-and-logo">
        <Link id="login-logo" to="/">
          <img src={window.logoImg} className="logo" />
          <img src={window.logoTxtImg} className="logo-txt" />
        </Link>
        <div id="invalid-invite" className="box-on-bg">
          <div/>
          <h1>Invite Invalid</h1>
          <p>This invite may be expired, or you might not have permission to join.</p>
          <Link to="/channels/@me">Continue to Conflict</Link>
        </div>
      </section>      
    )
  }
}

export default connect(undefined, mapDispatchToProps)(Invite)