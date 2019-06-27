import { connect } from "react-redux";
import UpdateUserForm from "./update_user_form";
import { editUser, deleteUser, RECEIVE_ERRORS } from "../../actions/session_actions";


const mapStateToProps = (state) => {
  const id = state.session.id
  return {
    errors: state.errors,
    user: state.entities.users[id]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: (id, user, oldPW, newPW) => dispatch(editUser(id, user, oldPW, newPW)),
    deleteAccount: (user) => dispatch(deleteUser(user)),
    clearErrors: () => dispatch({ type: RECEIVE_ERRORS, errors: {} })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)
