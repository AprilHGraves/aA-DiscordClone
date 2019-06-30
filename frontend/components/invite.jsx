import React from 'react';
import { Link } from 'react-router-dom';
import { joinServerByLink } from '../actions/servers_actions';
import { connect } from "react-redux";

class Invite extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.joinServerByLink(this.props.match.params.id)
      .then(() => this.props.history.push(`/channels/@me`));
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

const mapDispatchToProps = dispatch => {
  return {
    joinServerByLink: (link) => dispatch(joinServerByLink(link))
  }
}

export default connect(undefined, mapDispatchToProps)(Invite)