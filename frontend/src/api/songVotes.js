import axios from 'axios';


const API = 'http://54.195.241.54:8080/api/song-votes';

export const voteForSong = async (eventId, songTitle, token, customMessage = '') => {
    return axios.post(
        API,
        new URLSearchParams({ eventId, songTitle, customMessage }),
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
};


export const unvoteForSong = async (eventId, songTitle, token) => {
    return axios.delete(
        API,
        {
            headers: { Authorization: `Bearer ${token}` },
            data: new URLSearchParams({ eventId, songTitle })
        }
    );
};

export const getVotesForEvent = async (eventId, token) => {
    return axios.get(
        `${API}/event/${eventId}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
};
