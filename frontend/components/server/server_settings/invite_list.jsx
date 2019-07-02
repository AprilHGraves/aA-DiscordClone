import React from 'react';
import { connect } from "react-redux";
import { fetchInvites, destroyInvite } from '../../../actions/invites_actions';
import { selectInvitesByServer } from '../../../util/selectors';

const mapStateToProps = (state, ownProps) => {
  const serverId = state.ui.focus.server;
  const allInvites = Object.values(state.entities.invites);
  return {
    invites: selectInvitesByServer(allInvites, serverId),
    users: state.entities.users,
    serverId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInvites: (serverId) => dispatch(fetchInvites(serverId)),
    destroyInvite: (inviteId) => dispatch(destroyInvite(inviteId))
  }
}

class InviteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.delInv = this.delInv.bind(this);
    this.showInviteX = this.showInviteX.bind(this);
  }

  componentDidMount() {
    this.props.fetchInvites(this.props.serverId);
  }

  componentDidUpdate() {
    const secondNodes = document.getElementsByClassName("tic");
    this.tickClock = setInterval(() => {
      const nowDate = Date.now();
      for (let i=0, fin=secondNodes.length; i < fin; i++) {
        const node = secondNodes[i];
        const id = node.id;
        const expireDate = new Date(id);
        const time = this.getTime(expireDate, nowDate);
        node.innerHTML = time;
        
      }
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.tickClock);
  }

  getTime(expireDate, nowDate) {
    const difference = expireDate - nowDate;
    const dateObj = new Date(difference);
    return `${dateObj}`.match(/\w+ \d+ \d+ (.*) GMT/)[1]
  }

  delInv(event) {
    event.preventDefault();
    const id = Number(event.target.id.slice(4));
    this.props.destroyInvite(id);
  }

  showInviteX(show) {
    return (event) => {
      if (show) {
        event.currentTarget.children[4].classList.add("show-x");
      } else {
        event.currentTarget.children[4].classList.remove("show-x");
      }
    }
  }


  getRows() {
    const users = this.props.users;
    
    return this.props.invites.map(invite => {
      const user = users[invite.inviter_id];
      const expireDate = new Date(invite.expire_date);
      const nowDate = Date.now();
      return (
        <tr 
          key={invite.id}
          className="invite-row"
          onMouseEnter={this.showInviteX(true)}
          onMouseLeave={this.showInviteX(false)}
        >
          <td>
            <img src={user.image_url}/>
            <div>
              <p className="white-text">{user.username}</p>
              <span className="gray-text">#channel-name</span>
            </div>
          </td>
          <td className="gray-text">{invite.code}</td>
          <td className="white-text">
            {invite.uses}
            {invite.max_uses && `/${invite.max_uses}`}
          </td>
          <td>
            <p className="white-text">
              {invite.expire_date ? (
                <span id={`${expireDate}`} className="tic">{this.getTime(expireDate, nowDate)}</span>
              ) : (
                <span>∞</span>
              )}
              
            </p>
          </td>
          <td
            id={`inv-${invite.id}`}
            className="del-inv"
            onClick={this.delInv}
          >
              x
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <section className="right-fs-box">
        <h1>INVITES</h1>
        <section id="invite-list">
          <span className="gray-text">
            Here's a list of all active invite links. You can revoke any one.
          </span>
          <table>
            <thead>
              <tr>
                <th className="gray-text">INVITER</th>
                <th className="gray-text">INVITE CODE</th>
                <th className="gray-text">USES</th>
                <th className="gray-text">EXPIRES</th>
              </tr>
            </thead>
            <tbody>
              {this.getRows() }
            </tbody>
          </table>
        </section>
        
       
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteList)