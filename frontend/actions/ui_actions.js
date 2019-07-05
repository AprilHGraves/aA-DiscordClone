export const FOCUS_SERVER = "FOCUS_SERVER";
export const FOCUS_CHANNEL = "FOCUS_CHANNEL";
export const NOTE_CHANNEL = "NOTE_CHANNEL";
export const RECEIVE_MODAL = "RECEIVE_MODAL";

export const focusServer = (serverId) => ({
  type: FOCUS_SERVER,
  serverId
});

// modify state.ui.focus.channel
export const focusChannel = (channelId) => ({
  type: FOCUS_CHANNEL,
  channelId
});

// state.ui[serverId] = channelId
export const noteChannel = (serverId, channelId) => ({
  type: NOTE_CHANNEL,
  note: { serverId, channelId }
});

// export const showModal = (modalName) => ({
//   type: RECEIVE_MODAL,
//   modalName 
// });


export const showModal = (modalName) => {
  return {
    type: RECEIVE_MODAL,
    modalName
  }
}