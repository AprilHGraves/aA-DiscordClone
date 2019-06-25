import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Splash = (props) => {

  const demoLogin = (event) => {
    event.preventDefault();
    const demoUser = {
      email: "demo_user@comcast.net",
      password: "demodemo",
    }
    props.login(demoUser)
      .then(() => props.history.push(`/channels/@me`));
  };

  const link1 = props.currentUserId ? (
    <Link to="/channels/@me" id="header-right">Open</Link>
  ) : (
    <Link to="/login" id="header-right">Login</Link>
  );

  const link2 = props.currentUserId ? (
    <Link to="/channels/@me" id="center-link">Open Conflict</Link>
  ) : (
    <button onClick={demoLogin} id="center-button">Demo Login</button>
  );

  const link3 = props.currentUserId ? (
    <Link to="/channels/@me">Open Conflict</Link>
  ) : (
    <Link to="/register">Sign Up Now</Link>
  );

  const placeholder = event => {
    event.preventDefault();
  }

  return (
    <div className="splash">
      <nav>
        <Link id="header-left" to="/">
          <img src="/assets/logo.png" className="logo" />
          <img src="/assets/logo_text.png" className="logo-txt" />
        </Link>
        <section id="header-middle">
          <button onClick={placeholder}>Placeholder 1</button>
          <button onClick={placeholder}>Placeholder 2</button>
        </section>     
        {link1}
      </nav>
      <section id="splash-about">
        <h1>It's time to ditch face-to-face interaction.</h1>
        <p>Text chat app for recluses.</p>
        {link2}
      </section>
      <img id="splash-graphic" src="/assets/splash_background.png"></img>
      <section id="splash-info">
        <Link to="/" >
          <img src="/assets/logo.png"/>
        </Link>
        
        <div>
          <h3>Product</h3>
          <a href="http://discordapp.com">Based on Discord</a>
          <a href="#">Heroku Hosting</a>
        </div>
        <div>
          <h3>Developers</h3>
          <span>Main: April Graves</span>
          <span>Advisor: Carly Schaaf</span>
        </div>
        <div>
          <h3>Github</h3>
          <a href="http://github.com/AprilHGraves/aA-DiscordClone/">Code</a>
          <a href="http://github.com/AprilHGraves/aA-DiscordClone/wiki/backend-routes">Backend Routes</a>
          <a href="http://github.com/AprilHGraves/aA-DiscordClone/wiki/frontend-routes">Frontend Routes</a>
          <a href="http://github.com/AprilHGraves/aA-DiscordClone/wiki/mvp-list">MVP List</a>
          <a href="http://github.com/AprilHGraves/aA-DiscordClone/wiki/sample-state">Sample State</a>
          <a href="http://github.com/AprilHGraves/aA-DiscordClone/wiki/schema">Schema</a>
        </div>
        <div>
          <h3>Technologies</h3>
          <span>Ruby on Rails</span>
          <span>JS / Javascript</span>
          <span>React, Redux</span>
          <span>PostgreSQL</span>
        </div>
        <div>
          <h3>Assets</h3>
          <span>placeholder</span>
          <span>placeholder</span>
        </div>
      </section>
      <hr />
      <footer>
        <div>
          <h2>Ready to try Conflict? It's free!</h2>
          <p>JOIN FEWER THAN 5 MEMBERS TODAY</p>
        </div>  
        {link3}
      </footer>
    </div>
  )
}



export default withRouter(Splash);