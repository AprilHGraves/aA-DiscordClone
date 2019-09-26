import { connect } from "react-redux";
import ChannelShow from "./channel_show";
import { selectServerMembershipsByServer, selectMessagesByChannel, selectMessagesByDM } from "../../util/selectors";
import { createMessageInChannel, createMessageInDM, fetchMessages} from "../../actions/messages_actions";

const mapStateToProps = (state) => {
  const serverId = state.ui.focus.server;
  const channelId = state.ui.channel_notes[serverId];
  const channelType = serverId === "@me" ? "dm_conversations":"channels";
  return {
    memberships: serverId === "@me" ? [] : selectServerMembershipsByServer(state, serverId),
    messages: serverId === "@me" ? selectMessagesByDM(state, channelId) : selectMessagesByChannel(state, channelId),
    server: serverId === "@me" ? {id: "@me", name: ""} : state.entities.servers[serverId],
    channel: state.entities[channelType][channelId] || {name: "Conflict"},
    users: state.entities.users
  }
}

///home/april/Desktop/DiscordClone/app

const mapDispatchToProps = dispatch => {
  return {
    createMessageInChannel: (msg, chId) => dispatch(createMessageInChannel(msg, chId)),
    createMessageInDM: (msg, dmId) => dispatch(createMessageInDM(msg, dmId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelShow)


