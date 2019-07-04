import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { selectServerMembershipsByServer } from "../../util/selectors";

const mapStateToProps = (state) => {
  const serverId = state.ui.focus.server;
  const channelId = state.ui.channel_notes[serverId];
  return {
    memberships: selectServerMembershipsByServer(state, serverId),
    server: state.entities.servers[serverId] || {id: "@me"},
    channel: state.entities.channels[channelId] || {name: "Welcome to Conflict"},
    users: state.entities.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow)


