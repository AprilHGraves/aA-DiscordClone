import { connect } from "react-redux";
import ServerSettings from "./server_settings";
import { destroyServer } from "../../../actions/servers_actions";
import { showModal } from "../../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    server: state.entities.servers[state.ui.focus.server],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyServer: (serverId) => dispatch(destroyServer(serverId)),
    closeComponent: () => dispatch(showModal(""))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerSettings)