import { connect } from "react-redux";
import ServerIndex from "./server_index";
import { fetchServers } from "../../actions/servers_actions";
import { focusServer, focusChannel, noteChannel, showModal } from "../../actions/ui_actions";
import { fetchServerMembershipsByServerId } from "../../actions/server_memberships_actions";
import { fetchChannels } from "../../actions/channels_actions";
import { fetchDmConversations } from "../../actions/dm_conversations_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    servers: Object.values(state.entities.servers),
    channel_notes: state.ui.channel_notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServers: (urlMatch) => dispatch(fetchServers(urlMatch)),
    fetchDmConversations: () => dispatch(fetchDmConversations()),
    fetchChannels: (id) => dispatch(fetchChannels(id)),
    focusServer: (id) => dispatch(focusServer(id)),
    focusChannel: (id) => dispatch(focusChannel(id)),
    noteChannel: (sId, cId) => dispatch(noteChannel(sId, cId)),
    fetchServerMembershipsByServerId: (serverId) => dispatch(fetchServerMembershipsByServerId(serverId)),
    showModal: (modalName) => dispatch(showModal(modalName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex)


