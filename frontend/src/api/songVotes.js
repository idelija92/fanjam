import API from '../services/api';

export const voteForSong = async (eventId, songTitle, token, customMessage = '') => {
  return API.post(
    '/song-votes',
    new URLSearchParams({ eventId, songTitle, customMessage })
  );
};

export const unvoteForSong = async (eventId, songTitle, token) => {
  return API.delete(
    '/song-votes',
    {
      data: new URLSearchParams({ eventId, songTitle })
    }
  );
};

export const getVotesForEvent = async (eventId, token) => {
  return API.get(`/song-votes/event/${eventId}`);
};
