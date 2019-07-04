import React from 'react';
import { connect } from "react-redux";
import { destroyChannel } from "../../../actions/channels_actions";
import ChannelInviteListContainer from './channel_invite_list_container';
import ChannelOverviewContainer from './channel_overview';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.entities.channels[state.ui.focus.channel],
    closeComponent: ownProps.closeComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyChannel: (channelId) => dispatch(destroyChannel(channelId))
  }
}

class ChannelSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Overview",
      unsavedChanges: false
    };
    this.closeSettings = this.closeSettings.bind(this);
    this.unsavedChangesPresent = this.unsavedChangesPresent.bind(this);
    this.noUnsavedChanges = this.noUnsavedChanges.bind(this);
    this.delChannel = this.delChannel.bind(this);
  }

  closeSettings(event) {
    event.preventDefault();
    if (this.state.unsavedChanges) {
      this.alertUnsavedChanges();
    } else {
      this.props.closeComponent();
    }
  }

  switchPage(key) {
    return event => {
      if (this.state.unsavedChanges) {
        this.alertUnsavedChanges();
      } else {
        this.setState({ page: key });
        const oldNode = document.querySelector(".selected");
        oldNode.classList.remove("selected")
        event.target.classList.add("selected");
      }
    }
  }

  alertUnsavedChanges() {
    if (this.state.unsavedChanges) {
      const screen = document.querySelector(".settings-fullscreen");
      const alertbox = document.getElementById("unsaved-changes");
      screen.classList.add("shake");
      alertbox.classList.add("redden");
      setTimeout(() => {
        screen.classList.remove("shake");
        alertbox.classList.remove("redden");
      }, 1000);
    }
  }

  unsavedChangesPresent() {
    if (!this.state.unsavedChanges) {
      this.setState({ unsavedChanges: true });
    }
  }

  noUnsavedChanges() {
    this.setState({ unsavedChanges: false });
  }

  getPage() {
    switch (this.state.page) {
      case "Invites":
        return (
          <ChannelInviteListContainer />
        )
      default:
        return (
          <ChannelOverviewContainer
            channel={this.props.channel}
            unsavedChanges={this.state.unsavedChanges}
            unsavedChangesPresent={this.unsavedChangesPresent}
            noUnsavedChanges={this.noUnsavedChanges}

          />
        )
    }
  }

  delChannel() {
    this.props.closeComponent();
    this.props.destroyChannel(this.props.channel.id);
  }


  render() {
    return (
      <section className="settings-fullscreen">
        <div className="settings-left">
          <section className="options-list">
            <ul>
              <h1>
                # {this.props.channel.name}
                <span>TEXT CHANNELS</span>
              </h1>
              <li onClick={this.switchPage("Overview")} className="selected">Overview</li>
              <li onClick={this.switchPage("Invites")}>Invites</li>
            </ul>
            <ul>
              <li onClick={this.delChannel} className="destroy">
                Delete Channel
              </li>
            </ul>
          </section>

        </div>
        <div className="settings-right scrollable">
          <section className="settings-right-box">
            {this.getPage()}
            <button id="x-button" onClick={this.closeSettings}>X</button>
          </section>
        </div>

      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettings)