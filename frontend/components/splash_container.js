import { connect } from "react-redux";
import Splash from "./splash_page";
import { login } from "../actions/session_actions";


const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)