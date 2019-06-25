import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import ChannelIndex from "./channel_index";


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

