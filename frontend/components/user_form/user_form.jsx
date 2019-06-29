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
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
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

  showErrors(key) {
    let errors = this.props.errors[key];
    const label = document.getElementById(`${key}-label`);
    const input = document.getElementById(`${key}-input`);
    if (errors) {      
      label.classList.add("red-text")
      input.classList.add("red-border")
      if (errors[0] === "can't be blank") {   
        return <span>- This field is required</span>
      } else if (errors[0] === "has already been taken") {
        return <span>- You already have an account</span>
      } else {
        return <span>- {errors}</span>
      }
    } else if (label && input) {
      label.classList.remove("red-text");
      input.classList.remove("red-border");
    }
  }

  demoLogin(event) {
    event.preventDefault();
    const demoUser = {
      email: "demo_user@comcast.net",
      password: "demodemo",
    }
    this.props.formCallback(demoUser)
      .then(() => this.props.history.push(`/channels/@me`));
  };

  render() {
    const formType = this.props.formType;
    const link = formType === "login" ? (
      <p>Need an account? <Link to="/register">Register</Link></p>
    ) : (
      <Link to="/login">Already have an account?</Link>
    );
    return (
      <div id="login-page">
        <Link id="login-logo" to="/">
          <img src={window.logoImg} className="logo" />
          <img src={window.logoTxtImg} className="logo-txt" />
        </Link>
        
        <section className={formType}>
          <h1>{formType === "login" ? "Welcome Back!" : "Create an account"}</h1>
          {formType === "login" && <p>We're not excited to see you again.</p>}
          
          <form onSubmit={this.handleSubmit} className="form-type-1">
            <label id="email-label">EMAIL {this.showErrors("email")}
              <input id="email-input" type="email" value={this.state.email} onChange={this.changeInput("email")} />
            </label>

            { formType === "register" && (
              <label id="username-label">USERNAME {this.showErrors("username")}
                <input id="username-input" type="text" value={this.state.username} onChange={this.changeInput("username")} />
              </label>
            ) }

            <label id="password-label">PASSWORD {this.showErrors("password")}
              <input id="password-input" type="password" value={this.state.password} onChange={this.changeInput("password")} />
            </label>

            { formType === "login" && <button id="demo-login" onClick={this.demoLogin}>Demo Login</button> }

            <input type="submit" value={this.props.formType === "login" ? "Login" : "Continue"} />
          </form>
          { link }
          {formType === "register" && (
            <p id="policy-notice">
              By registering, you agree to Discord's &nbsp;
              <a href="https://discordapp.com/terms">Terms of Service</a>&nbsp;and&nbsp;
              <a href="https://discordapp.com/privacy">Privacy Policy</a>.
            </p>
          )}
        </section>  
      </div>
      
      
    )
  }
}

export default withRouter(UserForm);