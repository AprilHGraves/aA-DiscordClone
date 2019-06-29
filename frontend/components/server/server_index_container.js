import { connect } from "react-redux";
import ServerIndex from "./server_index";
import { getServers } from "../../actions/servers_actions";
import { focusServer } from "../../actions/ui_actions";
import { getUsers } from "../../actions/users_actions";

const mapStateToProps = (state) => {
  return {
    servers: Object.values(state.entities.servers)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getServers: () => dispatch(getServers()),
    focusServer: (id) => dispatch(focusServer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex)


