import React from 'react';
import { withRouter } from 'react-router-dom'

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: props.user.image_url,
      picFile: "",
      username: props.user.username,
      email: props.user.email,
      oldPW: "",
      newPW: "",
      editMode: false,
      pwMode: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.showPWFields = this.showPWFields.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.fileSelector = function() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.addEventListener("change", this.handleFileSelect.bind(this));
      // input.addEventListener("input", this.handleFileSelect);
      return input
    }.call(this);
  }
  
  componentWillUnmount() {
    this.props.clearErrors();
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
        return <span>- That email already has an account</span>
      } else {
        return <span>- {errors}</span>
      }
    } else if (label && input) {
      label.classList.remove("red-text");
      input.classList.remove("red-border");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user[username]', this.state.username);
    formData.append('user[email]', this.state.email);
    formData.append('oldPW', this.state.oldPW);
    formData.append('newPW', this.state.newPW);
    if (this.state.picFile) {
      formData.append('user[photo]', this.state.picFile);
    }
    this.props.editUser(this.props.user.id, formData)
      .then(() => {this.setState({editMode: false})});
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value });
    }
  }

  deleteAccount(event) {
    event.preventDefault();
    this.props.deleteAccount(this.props.user)
      .then(() => this.props.history.push(`/login`));
  }

  showPWFields(event) {
    event.preventDefault();
    this.setState({ pwMode: true})
  }

  passwordFields() {
    if (this.state.pwMode) {
      return (
        <section>
          <label id="old_password-label">CURRENT PASSWORD {this.showErrors("old_password")}
            <input id="old_password-input" type="password" value={this.state.oldPW} onChange={this.changeInput("oldPW")} />
          </label>
          <label id="new_password-label">NEW PASSWORD {this.showErrors("new_password")}
            <input id="new_password-input" type="password" value={this.state.newPW} onChange={this.changeInput("newPW")} />
          </label>
        </section>
      )
    } else {
      return (
        <button onClick={this.showPWFields}>Change Password?</button>
      )
    }
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        picFile: file,
        image_url: fileReader.result
      });
    };
    fileReader.readAsDataURL(file);
  }

  selectFile(event) {
    this.fileSelector.dispatchEvent(new MouseEvent("click"));
  }

  showImgHover(show) {
    return (event) => {
      const p = document.getElementById("change-photo");
      if (show) {
        p.classList.add("show");
      } else {
        p.classList.remove("show");
      }
    }
  }

  switchMode(event) {
    event.preventDefault();
    this.props.clearErrors();
    this.setState({
      image_url: this.props.user.image_url,
      picFile: "",
      username: this.props.user.username,
      email: this.props.user.email,
      oldPW: "",
      newPW: "",
      editMode: !this.state.editMode,
      pwMode: false
    });
  }

  showEditForm() {
    return (
      <form onSubmit={this.handleSubmit} className="form-type-1">
        <div>
          <div className="photo"
            style={{ backgroundImage: `url(${this.state.image_url})` }}
            onClick={this.selectFile}
            onMouseEnter={this.showImgHover(true)}
            onMouseLeave={this.showImgHover(false)}
          >
            <p id="change-photo" className="photo">
              CHANGE<br/>AVATAR
            </p>
            <div className="photo-icon"/>
          </div>
          <section>
            <label id="username-label">USERNAME {this.showErrors("username")}
              <input id="username-input" type="text" value={this.state.username} onChange={this.changeInput("username")} />
            </label>
            <label id="email-label">EMAIL {this.showErrors("email")}
              <input id="email-input" type="text" value={this.state.email} onChange={this.changeInput("email")} />
            </label>
            {this.passwordFields()}
          </section>
        </div>
        <div>
          <button onClick={this.deleteAccount}>Delete Account</button>
          <div>
            <button onClick={this.switchMode}>Cancel</button>
            <input type="submit" value="Save" />
          </div>
        </div>        
      </form>
    )
  }

  showSummary() {
    const tag = this.props.user.tag;
    const tagIdxStart = tag.indexOf("#");
    const tagNum = tag.slice(tagIdxStart);
    return (
      <section id="show-user-info">
        <div className="photo"
          style={{ backgroundImage: `url(${this.state.image_url})` }}
        />
        <div id="show-user-info-center">
          <div>
            <h2>USERNAME</h2>
            <span>{this.props.user.username}</span>
            <span>{tagNum}</span>
          </div>
          <div>
            <h2>EMAIL</h2>
            <span>{this.props.user.email}</span>
          </div>
        </div>
        <button onClick={this.switchMode}>Edit</button>
      </section>
    )
  }

  render() {
    return (
      <div id="update-user-form">
        {this.state.editMode && this.showEditForm() || this.showSummary()}
      </div>
    )
  }
}

export default withRouter(UpdateUserForm);