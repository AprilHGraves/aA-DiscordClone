import { connect } from "react-redux";
import UserForm from "./user_form";
import { login } from "../../actions/session_actions";


const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    formType: 'login'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formCallback: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)