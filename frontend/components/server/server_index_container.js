import { connect } from "react-redux";
import ServerIndex from "./server_index";
import { fetchServers } from "../../actions/servers_actions";
import { focusServer, focusChannel } from "../../actions/ui_actions";
import { fetchServerMembershipsByServerId } from "../../actions/server_memberships_actions";
import { fetchChannels } from "../../actions/channels_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    servers: Object.values(state.entities.servers),
    showAddServer: ownProps.showAddServer,
    channel_notes: state.ui.channel_notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getServers: () => dispatch(fetchServers()),
    fetchChannels: (id) => dispatch(fetchChannels(id)),
    focusServer: (id) => dispatch(focusServer(id)),
    focusChannel: (id) => dispatch(focusChannel(id)),
    fetchServerMembershipsByServerId: (serverId) => dispatch(fetchServerMembershipsByServerId(serverId)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex)


