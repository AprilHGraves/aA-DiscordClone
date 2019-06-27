import { connect } from "react-redux";
import UserSettings from "./user_settings";
import { logout } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    closeSettings: ownProps.closeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)