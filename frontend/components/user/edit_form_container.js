import { connect } from "react-redux";
import UpdateUserForm from "./update_user_form";
import { editUser, deleteUser } from "../../actions/session_actions";


const mapStateToProps = (state) => {
  const id = state.session.id
  return {
    errors: state.errors,
    user: state.entities.users[id]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: (user) => dispatch(editUser(user)),
    deleteAccount: (user) => dispatch(deleteUser(user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserForm)
