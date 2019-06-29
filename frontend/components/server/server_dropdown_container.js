import { connect } from "react-redux";
import ServerDropdown from "../server/server_dropdown";
import { leaveServer } from "../../actions/servers_actions";


const mapStateToProps = (state, ownProps) => {
  return {
    server: ownProps.server,
    userId: state.session.id,
    closeComponent: ownProps.closeComponent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveServer: (server) => dispatch(leaveServer(server)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServerDropdown)


