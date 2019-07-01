import { connect } from "react-redux";
import ChannelIndex from "./channel_index";


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[state.session.id],
    server: state.entities.servers[state.ui.focus.server] || {name: "Home"},
    showUserSettings: ownProps.showUserSettings,
    showServerDropdown: ownProps.showServerDropdown,
    showInvitePeople: ownProps.showInvitePeople
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

