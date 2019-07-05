import React from 'react'


const MembersSidebar = (props) => {
  const users = props.users;
  const ownerId = props.server.owner_id;
  return (
    <ul id="user-list" className="scrollable">
      <h1>Users—{props.memberships.length}</h1>
      {props.memberships.map(member => {
        const user = users[member.user_id];
        return (
          <li
            key={member.id}
          >
            <img src={user && user.image_url} />
            <span>{member.nickname || user && user.username}</span>
            {member.user_id === ownerId && (
              <i
                className="fas fa-crown"
              />
            )}
          </li>
        )
      })}
    </ul>
  ) 
}

export default MembersSidebar