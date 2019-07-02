import { connect } from "react-redux";
import ServerDropdown from "../server/server_dropdown";
import { leaveServer } from "../../actions/server_memberships_actions";


const mapStateToProps = (state, ownProps) => {
  return {
    server: state.entities.servers[state.ui.focus.server],
    userId: state.session.id,
    closeComponent: ownProps.closeComponent,
    showInvitePeople: ownProps.showInvitePeople,
    showChangeNickname: ownProps.showChangeNickname,
    showServerSettings: ownProps.showServerSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveServer: (server) => dispatch(leaveServer(server)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServerDropdown)


