import { connect } from "react-redux";
import ChannelIndex from "./channel_index";
import { fetchServerMembershipsByServerId } from "../../actions/server_memberships_actions";
import { focusChannel, noteChannel, showModal } from "../../actions/ui_actions";
import { selectChannelsByServerId } from "../../util/selectors";


const mapStateToProps = (state, ownProps) => {
  const serverId = state.ui.focus.server;
  const channelId = state.ui.focus.channel;
  return {
    user: state.entities.users[state.session.id],
    server: state.entities.servers[serverId] || {isHome: true},
    channels: selectChannelsByServerId(state, serverId),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServerMembershipsByServerId: (serverId) => dispatch(fetchServerMembershipsByServerId(serverId)),
    focusChannel: (channelId) => dispatch(focusChannel(channelId)),
    noteChannel: (serverId, channelId) => dispatch(noteChannel(serverId, channelId)),
    showModal: (modalName) => dispatch(showModal(modalName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

