import React from 'react';
import { connect } from "react-redux";
import { clearErrors } from '../../../actions/errors_actions';
import { updateServer } from '../../../actions/servers_actions';
import debounce from 'lodash/debounce';


const mapStateToProps = (state, ownProps) => {
  return {
    server: ownProps.server,
    unsavedChanges: ownProps.unsavedChanges,
    unsavedChangesPresent: ownProps.unsavedChangesPresent,
    noUnsavedChanges: ownProps.noUnsavedChanges,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateServer: (id, server) => dispatch(updateServer(id, server)),
    clearErrors: () => dispatch(clearErrors())
  }
}

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.server.name,
      image_url: props.server.image_url,
      picFile: "",
    }
    this.handleChanges = debounce(this.handleChanges.bind(this), 500);
    this.changeInput = this.changeInput.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.fileSelector = function () {
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
    const input = document.getElementById(`${key}-input`);
    if (errors) {
      input.classList.add("red-border");
      if (errors[0] === "can't be blank") {
        return <span className="red-text">This field is required</span>
      } else {
        return <span className="red-text">- {errors}</span>
      }
    } else if (input) {
      input.classList.remove("red-border");
    }
  }
  
  saveChanges() {
    this.props.noUnsavedChanges();
    const formData = new FormData();
    formData.append('server[name]', this.state.name);
    if (this.state.picFile) {
      formData.append('server[photo]', this.state.picFile);
    }
    this.props.updateServer(this.props.server.id, formData);
  }

  resetChanges() {
    this.props.noUnsavedChanges();
    this.setState({
      name: this.props.server.name, 
      image_url: this.props.server.image_url,
      picFile: ""
    });
  }

  handleChanges() {
    this.props.unsavedChangesPresent();
  }

  changeInput(key) {
    return (event) => {
      this.setState({[key]: event.target.value})
      this.handleChanges();
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
      this.handleChanges();
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

  render() {
    return (
      <section className="right-fs-box">
        <h1>SERVER OVERVIEW</h1>
        <section id="server-overview" className="form-type-1">
          <div className="photo"
            style={this.state.image_url && { backgroundImage: `url(${this.state.image_url})` }}
            onClick={this.selectFile}
            onMouseEnter={this.showImgHover(true)}
            onMouseLeave={this.showImgHover(false)}
          >
            <p id="change-photo" className="photo">
              CHANGE<br />ICON
            </p>
            <div className="photo-icon" />
            <span className="gray-text">Minimum Size: none</span>
          </div>
          <div>
            <p className="gray-text">We recommend that you pick a good image</p>
            <button onClick={this.selectFile}>Upload Image</button>
          </div>
          <label>SERVER NAME
            <input id="name-input" value={this.state.name} onChange={this.changeInput("name")}/>
          </label>
          {this.showErrors("name")}

        </section>
        {this.props.unsavedChanges && (
          <div id="unsaved-changes">
            <span>Careful -- you have unsaved changes!</span>
            <div>
              <button className="reset" onClick={this.resetChanges}>Reset</button>
              <button className="save" onClick={this.saveChanges}>Save Changes</button>
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)