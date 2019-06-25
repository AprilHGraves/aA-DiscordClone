import React from 'react';
import { Link, withRouter } from 'react-router-dom'

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.formCallback(this.state)
      .then(() => this.props.history.push(`/channels/@me`));
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value })
    }
  }

  showErrors() {
    let errors = this.props.errors;
    if (errors) {
      return <ul>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
    }
  }

  render() {
    const formType = this.props.formType;
    const link = formType === "login" ? (
      <p>Need an account? <Link to="/register">Register</Link></p>
    ) : (
      <Link to="/login">Already have an account?</Link>
    );
    return (
      <div id="login-page">
        <div id="login-logo">
          <img src="/assets/logo.png" className="logo" />
          <img src="/assets/logo_text.png" className="logo-txt" />
        </div>
        
        <section>
          <h1>{formType === "login" ? "Welcome Back!" : "Create an account"}</h1>
          {formType === "login" && <p>We're so excited to see you again!</p>}
          {this.showErrors()}
          
          <form onSubmit={this.handleSubmit}>
            <label>EMAIL
              <input type="text" value={this.state.email} onChange={this.changeInput("email")} />
            </label>

            { formType === "register" && (
              <label>USERNAME
                <input type="text" value={this.state.username} onChange={this.changeInput("username")} />
              </label>
            ) }

            <label>PASSWORD
              <input type="password" value={this.state.password} onChange={this.changeInput("password")} />
            </label>

            <input type="submit" value={this.props.formType === "login" ? "Login" : "Continue"} />
          </form>
          { link }
        </section>  
      </div>
      
      
    )
  }
}

export default withRouter(UserForm);