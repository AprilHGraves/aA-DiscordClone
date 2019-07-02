import { connect } from "react-redux";
import ServerDropdown from "../server/server_dropdown";
import { leaveServer } from "../../actions/server_memberships_actions";
import { selectServerMembershipByServerAndUser } from "../../util/selectors";


const mapStateToProps = (state, ownProps) => {
  const server = state.entities.servers[state.ui.focus.server];
  const userId = state.session.id;
  return {
    server,
    userId,
    membershipId: selectServerMembershipByServerAndUser(state, server.id, userId),
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


