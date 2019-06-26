import { connect } from "react-redux";
import UserForm from "./user_form";
import { login, RECEIVE_ERRORS } from "../../actions/session_actions";


const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    formType: 'login'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formCallback: (user) => dispatch(login(user)),
    clearErrors: () => dispatch({ type: RECEIVE_ERRORS, errors: {} })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)