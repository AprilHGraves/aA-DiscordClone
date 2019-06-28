import { connect } from "react-redux";
import UpdateUserForm from "./update_user_form";
import { editUser, deleteUser } from "../../actions/session_actions";
import { clearErrors } from "../../actions/errors_actions";

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
    clearErrors: () => dispatch(clearErrors())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)
