import axios from 'axios';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import SongsList from './SongsList';

const SearchResults = ({ location, history }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    try {
      let paramsString = location.search;
      let searchParams = new URLSearchParams(paramsString);
      let text = searchParams.get("text");
      if (!text) {
        history.goBack();
      }

      var config = {
        url: process.env.REACT_APP_SERVER_URL + '/search?text='+text,
        method: "get",
        headers: {
          'access-token': authState.accessToken
        }
      };

      axios(config).then(response => {
        console.log(response.data)
        if (response.data && Array.isArray(response.data)) {
          setSongs(response.data);
        }
      });
    }
    catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {
        (songs) ? (
          <SongsList songs={songs} />
        ) : (<></>)
      }
    </>
  );
}

export default SearchResults;