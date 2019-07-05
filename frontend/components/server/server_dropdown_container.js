import { connect } from "react-redux";
import ServerDropdown from "../server/server_dropdown";
import { leaveServer } from "../../actions/server_memberships_actions";
import { selectServerMembershipByServerAndUser } from "../../util/selectors";
import { showModal } from "../../actions/ui_actions";


const mapStateToProps = (state, ownProps) => {
  const server = state.entities.servers[state.ui.focus.server];
  const userId = state.session.id;
  return {
    server,
    userId,
    membership: selectServerMembershipByServerAndUser(state, server.id, userId),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveServer: (membershipId) => dispatch(leaveServer(membershipId)),
    showModal: (modalName) => dispatch(showModal(modalName)),
    closeComponent: () => dispatch(showModal(""))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerDropdown)


