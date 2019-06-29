import { connect } from "react-redux";
import ChannelIndex from "./channel_index";


const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id],
    server: state.entities.servers[state.ui.focus.server] || {name: "Home"}
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

