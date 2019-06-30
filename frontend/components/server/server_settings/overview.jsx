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
      image_url: props.server.image_url
    }
    this.handleChanges = debounce(this.handleChanges.bind(this), 500);
    this.changeInput = this.changeInput.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  handleChanges() {
    this.props.unsavedChangesPresent();
  }

  saveChanges() {
    this.props.noUnsavedChanges();
    this.props.updateServer(this.props.server.id, this.state);
  }

  resetChanges() {
    this.props.noUnsavedChanges();
    this.setState({name: this.props.server.name, image_url: this.props.server.image_url});
  }

  changeInput(key) {
    return (event) => {
      this.setState({[key]: event.target.value})
      this.handleChanges();
    }
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

  render() {
    return (
      <section className="right-fs-box">
        <h1>SERVER OVERVIEW</h1>
        <section id="server-overview" className="form-type-1">
          <img src={this.state.image_url}/>
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