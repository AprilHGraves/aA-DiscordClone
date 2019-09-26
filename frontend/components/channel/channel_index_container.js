import { connect } from "react-redux";
import ChannelIndex from "./channel_index";
import { fetchServerMembershipsByServerId } from "../../actions/server_memberships_actions";
import { focusChannel, noteChannel, showModal } from "../../actions/ui_actions";
import { selectChannelsByServerId } from "../../util/selectors";
import { fetchMessages } from "../../actions/messages_actions";


const mapStateToProps = (state, ownProps) => {
  const serverId = state.ui.focus.server;
  return {
    user: state.entities.users[state.session.id],
    users: state.entities.users,
    server: state.entities.servers[serverId] || {id: "@me", isHome: true},
    channels: selectChannelsByServerId(state, serverId),
    dmConvos: Object.values(state.entities.dm_conversations)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServerMembershipsByServerId: (serverId) => dispatch(fetchServerMembershipsByServerId(serverId)),
    focusChannel: (channelId) => dispatch(focusChannel(channelId)),
    noteChannel: (serverId, channelId) => dispatch(noteChannel(serverId, channelId)),
    showModal: (modalName) => dispatch(showModal(modalName)),
    fetchMessages: (type, id) => dispatch(fetchMessages(type, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

