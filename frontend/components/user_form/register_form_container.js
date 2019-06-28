import { connect } from "react-redux";
import UserForm from "./user_form";
import { signup } from "../../actions/session_actions";
import { clearErrors } from "../../actions/errors_actions";


const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    formType: 'register'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formCallback: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)