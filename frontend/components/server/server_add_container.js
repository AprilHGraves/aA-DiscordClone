import { connect } from "react-redux";
import ServerAdd from "./server_add";
import { clearErrors } from "../../actions/errors_actions";
import { joinServer, joinServerByLink, createServer } from "../../actions/servers_actions";

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postServer: (server) => dispatch(createServer(server)),
    joinServer: (server) => dispatch(joinServer(server)),
    clearErrors: () => dispatch(clearErrors()),
    joinServerByLink: link => dispatch(joinServerByLink(link))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerAdd)