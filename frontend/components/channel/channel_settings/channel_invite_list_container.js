import { connect } from "react-redux";
import { fetchInvites, destroyInvite } from '../../../actions/invites_actions';
import { selectInvitesByChannel } from '../../../util/selectors';
import InviteList from "../../invite_list";

const mapStateToProps = (state, ownProps) => {
  const channelId = state.ui.focus.channel;
  return {
    invites: selectInvitesByChannel(state, channelId),
    channels: state.entities.channels,
    users: state.entities.users,
    serverId: state.ui.focus.server
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInvites: (serverId) => dispatch(fetchInvites(serverId)),
    destroyInvite: (inviteId) => dispatch(destroyInvite(inviteId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteList)