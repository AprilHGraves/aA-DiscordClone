import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { selectServerMembershipsByServer, selectMessagesByChannel } from "../../util/selectors";
import { createMessageInChannel, destroyMessage, updateMessage } from "../../actions/messages_actions";

const mapStateToProps = (state) => {
  const serverId = state.ui.focus.server;
  const channelId = state.ui.channel_notes[serverId];
  return {
    memberships: selectServerMembershipsByServer(state, serverId),
    messages: selectMessagesByChannel(state, channelId),
    server: state.entities.servers[serverId] || {id: "@me", name: ""},
    channel: state.entities.channels[channelId] || {name: "It's Conflict Time"},
    users: state.entities.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessageInChannel: (msg, chId) => dispatch(createMessageInChannel(msg, chId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow)


