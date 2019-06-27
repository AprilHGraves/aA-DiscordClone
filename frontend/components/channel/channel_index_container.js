import { connect } from "react-redux";
import ChannelIndex from "./channel_index";


const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.id]
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)

