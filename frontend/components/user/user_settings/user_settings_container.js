import { connect } from "react-redux";
import UserSettings from "./user_settings";
import { logout } from "../../../actions/session_actions";
import { showModal } from "../../../actions/ui_actions";

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    closeComponent: () => dispatch(showModal(""))
  }
}

export default connect(undefined, mapDispatchToProps)(UserSettings)