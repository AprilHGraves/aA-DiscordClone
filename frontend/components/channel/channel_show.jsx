import React from 'react';


class ChannelShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.savedHeight) {
      // TODO save scrolls for each channel in state ui slice
    } else {
      const el = document.getElementById("message-center");
      el.scrollTop = el.scrollHeight;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  showUsers() {
    // if (this.props.usersBar) {
      return (
        <ul id="user-list" className="scrollable">

        </ul>
      ) 
    // }
  }

  render() {
    return (
      <section id="channel-show">
        <div id="show-top">

        </div>
        <div id="show-bottom">
          <div id="message-box" >
            <ul id="message-center" className="scrollable">
              <li>test</li><li>test</li><li>test</li><li>test</li><li>test</li><li>test</li><li>test</li>

            </ul>
            <form id="message-form" onSubmit={this.handleSubmit}>
              <input placeholder={`message channel name`}/>
            </form>

          </div>
          {this.showUsers()}
        </div>
        
      </section>
    )
  }
}

export default ChannelShow;