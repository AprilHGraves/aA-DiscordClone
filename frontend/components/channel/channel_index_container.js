import { connect } from "react-redux";
import ChannelIndex from "./channel_index";
import { fetchServerMembershipsByServerId } from "../../actions/server_memberships_actions";
import { focusChannel, noteChannel } from "../../actions/ui_actions";
import { selectChannelsByServerId } from "../../util/selectors";


const mapStateToProps = (state, ownProps) => {
  const serverId = state.ui.focus.server;
  return {
    user: state.entities.users[state.session.id],
    server: state.entities.servers[serverId] || {isHome: true},
    channels: selectChannelsByServerId(state, serverId),
    showUserSettings: ownProps.showUserSettings,
    showServerDropdown: ownProps.showServerDropdown,
    showInvitePeople: ownProps.showInvitePeople,
    showAddChannel: ownProps.showAddChannel,
    showChannelSettings: ownProps.showChannelSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServerMembershipsByServerId: (serverId) => dispatch(fetchServerMembershipsByServerId(serverId)),
    focusChannel: (channelId) => dispatch(focusChannel(channelId)),
    noteChannel: (serverId, channelId) => dispatch(noteChannel(serverId, channelId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

