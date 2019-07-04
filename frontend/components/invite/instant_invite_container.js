import { connect } from "react-redux";
import InstantInvite from "./instant_invite";
import { createInvite, fetchInviteByUserAndChannel } from "../../actions/invites_actions";
import { clearErrors } from "../../actions/errors_actions";


const mapStateToProps = (state, ownProps) => {

  return {
    server: state.entities.servers[state.ui.focus.server],
    channelId: state.ui.focus.channel,
    closeComponent: ownProps.closeComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInviteByUserAndChannel: (serverId, channelId) => dispatch(fetchInviteByUserAndChannel(serverId, channelId)),
    createInvite: (invite) => dispatch(createInvite(invite)),
    clearErrors: () => dispatch(clearErrors()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InstantInvite)