import { connect } from "react-redux";
import ServerAdd from "./server_add";
import { clearErrors } from "../../actions/errors_actions";
import { joinServer, joinServerByCode, createServer } from "../../actions/servers_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    closeComponent: ownProps.closeComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createServer: (server) => dispatch(createServer(server)),
    joinServer: (server) => dispatch(joinServer(server)),
    clearErrors: () => dispatch(clearErrors()),
    joinServerByCode: code => dispatch(joinServerByCode(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerAdd)