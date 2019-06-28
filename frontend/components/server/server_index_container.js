import { connect } from "react-redux";
import ServerIndex from "./server_index";
import { getServers } from "../../actions/servers_actions";

const mapStateToProps = (state) => {
  return {
    servers: Object.values(state.entities.servers)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getServers: () => dispatch(getServers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerIndex)


