import React from 'react';
import { Link } from 'react-router-dom';

const Splash = (props) => {
  const link = props.currentUserId ? (
    <Link to="/channels/@me">Open</Link>
  ) : (
    <Link to="/login">Login</Link>
  );
  return (
    <div className="splash">
      <nav>
        <Link to="/">Discord Clone</Link>
        {link}
      </nav>
      <section>
        <h1>It's time to ditch face-to-face interaction.</h1>
        <p>Text chat. Keep it simple.</p>
      </section>
      <footer>
        <h1>Try Discord Clone Today!</h1>
      </footer>
    </div>
  )
}



export default Splash;