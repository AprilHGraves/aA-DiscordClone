import { connect } from "react-redux";
import ServerIndex from "./server_index";
import { fetchServers } from "../../actions/servers_actions";
import { focusServer } from "../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    servers: Object.values(state.entities.servers),
    showAddServer: ownProps.showAddServer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getServers: () => dispatch(fetchServers()),
    focusServer: (id) => dispatch(focusServer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex)


