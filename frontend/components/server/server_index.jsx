import React from 'react';
import { Link } from 'react-router-dom';

const ServerIndex = props => {

  return (
    <ul>
      <li><Link to="/channels/@me">Home</Link></li>
    </ul>
  )
}

export default ServerIndex;