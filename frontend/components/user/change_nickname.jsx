import React from 'react';
import { connect } from "react-redux";
import { clearErrors } from '../../actions/errors_actions';
import { changeNickname } from '../../actions/server_memberships_actions';
import { selectServerMembershipByServerAndUser } from '../../util/selectors';


const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[state.session.id];
  const serverId = state.ui.focus.server;
  return {
    user,
    membership: selectServerMembershipByServerAndUser(state, serverId, user.id),
    errors: state.errors,
    closeComponent: ownProps.closeComponent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNickname: (id, nickname) => dispatch(changeNickname(id, nickname)),
    clearErrors: () => dispatch(clearErrors())
  }
}

class ChangeNickname extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: props.membership.nickname || ""
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }


  componentDidMount() {
    this.inside = document.getElementById("change-nickname");
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
    this.props.changeNickname(this.props.membership.id, this.state.nickname)
      .then(() => {
        this.props.closeComponent();
      })    
  }

  changeInput(key) {
    return (event) => {
      this.setState({ [key]: event.target.value });
    }
  }

  render() {
    return (
      <section className="transparent-background">
        <section id="change-nickname" className="small-box-type-1">
          <h1>
            CHANGE NICKNAME
          </h1>
          <form onSubmit={this.submitForm} className="form-type-1">
            <label>
              NICKNAME
              <input
                type="text"
                placeholder={this.props.user.username}
                onChange={this.changeInput("nickname")}
                value={this.state.nickname}
              />
            </label>
            <button>
              Reset Nickname
            </button>
            <div className="form-bottom">
              <button onClick={this.props.closeComponent}>Cancel</button>
              <input type="submit" value="Save"/>
            </div>
          </form>
        </section>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNickname)