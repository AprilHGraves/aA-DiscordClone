import { connect } from "react-redux";
import ServerAdd from "./server_add";
import { clearErrors } from "../../actions/errors_actions";
import { createServer } from "../../actions/servers_actions";
import { joinServerByCode } from "../../actions/server_memberships_actions";
import { showModal } from "../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createServer: (server) => dispatch(createServer(server)),
    clearErrors: () => dispatch(clearErrors()),
    joinServerByCode: code => dispatch(joinServerByCode(code)),
    closeComponent: () => dispatch(showModal(""))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServerAdd)