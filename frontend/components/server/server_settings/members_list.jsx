import React from 'react';
import { connect } from "react-redux";
import { selectServerMembershipByServer } from '../../../util/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    server: ownProps.server,
    server_memberships: selectServerMembershipByServer(state, ownProps.server.id),
    users: state.entities.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateServer: (id, server) => dispatch(updateServer(id, server)),
    clearErrors: () => dispatch(clearErrors())
  }
}

class MembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  showDots(show) {
    return (event) => {
      if (show) {
        event.currentTarget.children[2].classList.add("show-dots");
      } else {
        event.currentTarget.children[2].classList.remove("show-dots");
      }
    }
  }

  getRows() {
    const users = this.props.users;
    return this.props.server_memberships.map(membership => {
      const user = users[membership.user_id];
      return (
        <tr
          key={membership.id}
          className="tr-hover-row"
          onMouseEnter={this.showDots(true)}
          onMouseLeave={this.showDots(false)}
        >
          <td>
            <img src={user.image_url} />
            <div>
              <p className="white-text">{membership.nickname || user.username}</p>
              <span className="gray-text">{user.tag}</span>
            </div>
          </td>
          <td>
            <div className="roles">
              roles will go here
            </div>
          </td>

          <td
            id={`role-${membership.id}`}
            className="more-options"
          >
            <i className="fas fa-ellipsis-v"/>
          </td>

        </tr>
        
      )
    })
  }

  render() {
    return (
      <section className="right-fs-box">
        <h1>SERVER MEMBERS</h1>
        <section id="members-list" className="settings-table-1">
          <table>
            <tbody>
              {this.getRows()}
            </tbody>
          </table>
        </section>


      </section>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MembersList)