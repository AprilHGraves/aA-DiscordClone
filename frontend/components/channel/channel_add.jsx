import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { clearErrors } from '../../actions/errors_actions';
import { createChannel } from '../../actions/channels_actions';

const mapStateToProps = (state, ownProps) => {
  const serverId = state.ui.focus.server;
  return {
    serverId,
    errors: state.errors,
    closeComponent: ownProps.closeComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    clearErrors: () => dispatch(clearErrors()),
    noteChannel: (sId, cId) => dispatch(noteChannel(sId, cId))
  }
}

class AddChannel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      server_id: props.serverId
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.inside = document.getElementById("create-channel");
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    this.props.clearErrors();
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target)) {
      this.props.closeComponent();
    }
  }

  submitForm(event) {
    event.preventDefault();
    this.props.createChannel(this.state)
      .then((channelId) => {
        this.props.closeComponent();
        this.props.history.push(`/channels/${this.state.server_id}/${channelId}`);
      })
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value });
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
      <section className="transparent-background">
        <section id="create-channel" className="small-box-type-1">
          <h1>
            CREATE TEXT CHANNEL
          </h1>
          <form onSubmit={this.submitForm} className="form-type-1">
            <label>
              CHANNEL TYPE
              <div className="type-option">
                <i className="fas fa-check-square"/>&nbsp;
                <i className="fas fa-hashtag"/>&nbsp;Text Channel
              </div>
              <div className="type-option">                
                <i className="far fa-square"/>&nbsp;
                <i className="fas fa-volume-down"/>&nbsp;Voice Channel (not implemented)
              </div>
              
            </label>
            
            <label>
              CHANNEL NAME
              <input
                id="name-input"
                type="text"
                onChange={this.changeInput("name")}
                value={this.state.name}
              />
            </label>
            {this.showErrors("name")}
            <div className="form-bottom">
              <button onClick={this.props.closeComponent}>Cancel</button>
              <input type="submit" value="Create Channel" />
            </div>
          </form>
        </section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddChannel))