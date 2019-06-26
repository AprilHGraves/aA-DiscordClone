import { connect } from "react-redux";
import UserForm from "./user_form";
import { signup, RECEIVE_ERRORS } from "../../actions/session_actions";



const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    formType: 'register'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formCallback: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch({ type: RECEIVE_ERRORS, errors: {} })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)