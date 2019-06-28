import React from 'react';
import { Link } from 'react-router-dom';

class Invite extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <section id="invalid-invite">
        <div>
          Invite Invalid
          <Link to="/channels/@me">Continue to Conflict</Link>
        </div>
      </section>      
    )
  }
}