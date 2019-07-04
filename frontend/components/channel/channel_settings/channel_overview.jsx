import React from 'react';
import { connect } from "react-redux";
import { clearErrors } from '../../../actions/errors_actions';
import { updateChannel } from '../../../actions/channels_actions';
import debounce from 'lodash/debounce';


const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel,
    unsavedChanges: ownProps.unsavedChanges,
    unsavedChangesPresent: ownProps.unsavedChangesPresent,
    noUnsavedChanges: ownProps.noUnsavedChanges,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateChannel: (id, server) => dispatch(updateChannel(id, server)),
    clearErrors: () => dispatch(clearErrors())
  }
}

class ChannelOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.channel.name,
      topic: props.channel.topic || ""
    }
    this.handleChanges = debounce(this.handleChanges.bind(this), 500);
    this.changeInput = this.changeInput.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);    
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
    this.props.updateChannel(this.props.channel.id, this.state);
  }

  resetChanges() {
    this.props.noUnsavedChanges();
    this.setState({
      name: this.props.channel.name,
      topic: this.props.channel.topic || ""
    });
  }

  handleChanges() {
    this.props.unsavedChangesPresent();
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value })
      this.handleChanges();
    }
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
    const topic = this.state.topic;
    return (
      <section className="right-fs-box">
        <h1>OVERVIEW</h1>
        <section id="channel-overview" className="form-type-1">
          <label>CHANNEL NAME
            <input id="name-input" value={this.state.name} onChange={this.changeInput("name")} />
          </label>
          {this.showErrors("name")}
          <label>CHANNEL TOPIC
            <div>
              <textarea
                id="topic-input"
                value={topic.length > 1024 && topic.slice(0,1025) || topic}
                placeholder="No topic set."
                onChange={this.changeInput("topic")}  
              />
              <span>{topic > 1023 && 0 || 1024 - topic.length}</span>

            </div>
          </label>

        </section>
        <div id="overview-image"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelOverview)