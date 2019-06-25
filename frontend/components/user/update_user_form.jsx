import React from 'react';
import { withRouter } from 'react-router-dom'

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id,
      username: props.user.username,
      email: props.user.email,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editUser(this.state);
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value })
    }
  }

  deleteAccount(event) {
    event.preventDefault();
    this.props.deleteAccount(this.props.user)
      .then(() => this.props.history.push(`/login`));
  }

  render() {
    return (
      <div id="update-user-form">
        <section>
          <form onSubmit={this.handleSubmit}>
            <label>USERNAME
              <input type="text" value={this.state.username} onChange={this.changeInput("username")} />
            </label>

            <label>EMAIL
              <input type="text" value={this.state.email} onChange={this.changeInput("email")} />
            </label>

            <input type="submit" value="Save" />
          </form>
          <button onClick={this.deleteAccount}>Delete Account</button>
        </section>
      </div>


    )
  }
}

export default withRouter(UpdateUserForm);