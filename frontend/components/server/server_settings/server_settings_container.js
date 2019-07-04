import { connect } from "react-redux";
import ServerSettings from "./server_settings";
import { destroyServer } from "../../../actions/servers_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    server: state.entities.servers[state.ui.focus.server],
    closeComponent: ownProps.closeComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyServer: (serverId) => dispatch(destroyServer(serverId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerSettings)