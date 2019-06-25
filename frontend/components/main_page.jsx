import React from 'react';
import ServerIndex from './server/server_index';
import ChannelIndexContainer from './channel/channel_index_container';

const MainPage = (props) => {

  return (
    <section>
      {/* server index */}
      <ServerIndex />
      <ChannelIndexContainer />
      {/* channel index */}
      {/* channel main */}
    </section>
  )
};

export default MainPage;