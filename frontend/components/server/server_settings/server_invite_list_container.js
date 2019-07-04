import { connect } from "react-redux";
import { fetchInvites, destroyInvite } from '../../../actions/invites_actions';
import { selectInvitesByServer } from '../../../util/selectors';
import InviteList from "../../invite_list";

const mapStateToProps = (state, ownProps) => {
  const serverId = state.ui.focus.server;
  return {
    invites: selectInvitesByServer(state, serverId),
    channels: state.entities.channels,
    users: state.entities.users,
    serverId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInvites: (serverId) => dispatch(fetchInvites(serverId)),
    destroyInvite: (inviteId) => dispatch(destroyInvite(inviteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteList)