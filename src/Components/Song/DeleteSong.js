import axios from "axios";

export const deleteSong = async (songId, accessToken) => {
  var config = {
    method: 'delete',
    url: process.env.REACT_APP_SERVER_URL + '/songs/' + songId,
    headers: {
      'access-token': accessToken
    }
  };
  try {
    let response = await axios(config);
    return response.data;
  } catch(err) {
    return { error: { message: err } };
  }
}