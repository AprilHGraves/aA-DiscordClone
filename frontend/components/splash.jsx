import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link to="/channels/@me">Open</Link>
  ) : (
    <Link to="/login">Login</Link>
  );

  const link2 = props.currentUserId ? (
    <Link to="/channels/@me" className="center">Open Conflict</Link>
  ) : (
    <button onClick={demoLogin} className="center button">Demo Login</button>
  );

  const link3 = props.currentUserId ? (
    <Link to="/channels/@me">Open Conflict</Link>
  ) : (
    <Link to="/register">Sign Up Now</Link>
  );

  const placeholder = event => {
    event.preventDefault();
  }

  const scrollDown = event => {
    event.preventDefault();
    window.scrollBy(0, document.body.scrollHeight);    
  }

  const addShow = event => {
    const el = document.querySelector(".about-me");
    el.classList.add("show");
  }

  const removeShow = event => {
    const el = document.querySelector(".about-me");
    el.classList.remove("show");
  }


  return (
    <div id="splash-page">
      <nav>
        <Link id="header-left" to="/">
          <img src={window.logoImg} className="logo" />
          <img src={window.logoTxtImg} className="logo-txt" />
        </Link>
        <section id="header-middle">
          <button onClick={scrollDown}>About Conflict</button>
          <span onMouseEnter={addShow} onMouseLeave={removeShow}>
            About Me &nbsp;
            <img src="https://discordapp.com/assets/779a770c34fcb823a598a7277301adaf.svg"/>
          </span>
          <div className="about-me" onMouseEnter={addShow} onMouseLeave={removeShow}>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="http://github.com/AprilHGraves">Github</a></li>
              {/* make a link to other work eventually */}
            </ul>
          </div>
          
        </section>
        <section id="header-right">
          <a href="https://twitter.com"><i className='fab fa-twitter'></i></a>
          <a href="https://facebook.com"><i className='fab fa-facebook'></i></a>
          <a href="https://instagram.com"><i className='fab fa-instagram'></i></a>
          {link1}
        </section>
      </nav>
      <section id="splash-about">
        <h1>It's time to ditch in-person interaction.</h1>
        <p>Text chat application for recluses that's free, slightly secure, and designed to work on your browser.<br/>Stop going outside everyday and hassling with people. Simplify your life.</p>
        <div>
          <a href="https://discordapp.com" className="center left">Go to Discord</a>
          {link2}
        </div>
      </section>
      <div id="splash-graphic">
        <img className="animate-float" id="splash-disk" src="https://discordapp.com/assets/215346366a9a7d50924fc245ddb048d2.svg"></img>
        <img id="splash-image" src={window.splashImg}></img>
        <img className="animate-float" id="splash-coin-1" src="https://discordapp.com/assets/9e05338bd66e0985fceb83317cb94b9c.svg"></img>
        <img className="animate-float" id="splash-coin-2" src="https://discordapp.com/assets/9e05338bd66e0985fceb83317cb94b9c.svg"></img>
        <img className="animate-float" id="splash-bomb" src="https://discordapp.com/assets/eb301f28da3199edbd3ef19690d61674.svg"></img>
      </div>
      
      
      <section id="splash-info">
        <Link to="/" >
          <img src={window.logoImg}/>
        </Link>
        
        <div>
          <h3>Product</h3>
          <a href="http://discordapp.com">Based on Discord</a>
          <a href="https://heroku.com">Hosted on Heroku</a>
        </div>
        <div>
          <h3>Developers</h3>
          <span>Student: April Graves</span>
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
          <span>JS / Javascript</span>
          <span>PostgreSQL</span>
          <span>React, Redux</span>
          <span>Ruby on Rails</span>
        </div>
        <div>
          <h3>Assets</h3>
          <a href="http://discordapp.com">Discord Images</a>
          <a href="http://fontawesome.com">Font Awesome</a>
          <a href="https://fonts.google.com/">Google Fonts</a>
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



export default Splash;