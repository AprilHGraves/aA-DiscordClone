import React from 'react';
import { Link } from 'react-router-dom';

const Splash = (props) => {
  const link = props.currentUserId ? (
    <Link to="/channels/@me" id="header-right">Open</Link>
  ) : (
    <Link to="/login" id="header-right">Login</Link>
  );

  return (
    <div className="splash">
      <nav>
        <Link id="header-left" to="/">
          <img src="/assets/logo.png" className="logo" />
          <img src="/assets/logo_text.png" className="logo-txt" />
        </Link>
        <ul id="header-middle">
          <li><button>Placeholder 1</button></li>
          <li><button>Placeholder 2</button></li>
        </ul>     
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