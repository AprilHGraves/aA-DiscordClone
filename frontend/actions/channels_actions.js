
import { receiveErrors } from "./errors_actions";
import { getChannels, postChannel, patchChannel, deleteChannel } from "../util/channel_util";

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

const removeChannel = channelId => ({
  type: REMOVE_CHANNEL,
  channelId
});


export const fetchChannels = (serverId) => dispatch => (
  getChannels(serverId)
    .then(channels => {
      dispatch(receiveChannels(channels));
    })
);

export const createChannel = channel => dispatch => (
  postChannel(channel)
    .then(channel => {
      dispatch(receiveChannel(channel));
      return channel.id
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const updateChannel = (id, channel) => dispatch => (
  patchChannel(id, channel)
    .then(channel => {
      dispatch(receiveChannel(channel));
    }, errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const destroyChannel = channelId => dispatch => (
  deleteChannel(channelId)
    .then(payload => {
      dispatch(removeChannel(payload.channelId));
    })
);
