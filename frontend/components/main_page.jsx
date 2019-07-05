import React from 'react';
import ChannelIndexContainer from './channel/channel_index_container';
import ServerIndexContainer from './server/server_index_container';
import ChannelShowContainer from './channel/channel_show_container';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  // TODO implement a spinner to distract users while servers load

  render() {
    return (
      <section id="main-page">
        <ServerIndexContainer/>
        <ChannelIndexContainer/>
        <ChannelShowContainer />
      </section>
    )
  }
}

export default MainPage;