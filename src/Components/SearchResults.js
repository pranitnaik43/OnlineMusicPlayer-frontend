import axios from 'axios';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import SongsList from './SongsList';

const SearchResults = ({ location, history }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  const [songs, setSongs] = useState([]);

  let paramsString = location.search;
      let searchParams = new URLSearchParams(paramsString);
      let text = searchParams.get("text");

  useEffect(() => {
    try {
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
  }, [text])

  return (
    <div className="container darkTransparentBackground mt-3 p-3">
      <div className="">
        <h3 className="text-warning mb-3">Search Results</h3>
      {
        (songs) ? (
          <SongsList songs={songs} />
        ) : (<></>)
      }
      </div>
    </div>
  );
}

export default SearchResults;