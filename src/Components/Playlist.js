import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { mediaURL } from './Constants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Playlist = ({ history }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  let params = useParams();
  let playlistId = params.id;

  const [playlist, setPlaylist] = useState({});

  var config = {
    headers: {
      'access-token': authState.accessToken
    }
  };

  useEffect(() => {
    try {
      const getData = async () => {
        if (!playlistId) {
          console.log("Playlist not found");
        }
        let allSongs = [], tempPlaylist = {}, playlistSongs = [];

        //get all songs
        config.method = 'GET';
        config.url = process.env.REACT_APP_SERVER_URL + '/songs';
        let response = await axios(config);

        if (response.data.error) {
          console.log(response.data.error);
        } else if (response.data) {
          allSongs = response.data;
        }

        //get playlist data from id
        config.url = process.env.REACT_APP_SERVER_URL + '/playlists/' + playlistId;

        response = await axios(config);
        if (response.data.error) {
          toast.error(response.data.error.message, { autoClose: 5000 });
          history.goBack();
        } else if (response.data) {
          // setPlaylist({ ...response.data });
          tempPlaylist = response.data;

          //add songs data to playlist
          if (tempPlaylist.songs) {
            tempPlaylist.songs.forEach(songId => {
              let song = allSongs.find(song => (song._id === songId));
              if (song) {
                playlistSongs.push(song);
              }
            })
          }
          setPlaylist({ ...tempPlaylist, songs: playlistSongs })
        }
      }

      getData();

    } catch (err) {
      console.log(err);
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div className="container darkTransparentBackground mt-3 p-3">
      {/* {console.log(playlist)} */}
      {
        (playlist) ? (
          <>
            <div className="card text-warning">
              <div className="card-header text-center bg-gray-800">
                <h4>{playlist.name}</h4>
              </div>
              <ul className="list-group list-group-flush">
                {
                  (playlist.songs && playlist.songs.length > 0) ?
                    (
                      playlist.songs.map((song) => (
                        <li className="list-group-item position-relative m-0 p-0" key={song._id}>
                          {/* <div className="position-relative"> */}
                          <div className="dropdown position-absolute p-1" style={{ top: "0.5rem", right: "0.5rem", zIndex: 1 }}>
                            <i className="fa fa-caret-down px-2 py-1 bg-light rounded-circle" id="dropdownMenuButton" data-toggle="dropdown"></i>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <button className="dropdown-item" onClick={() => { history.push("/song/"+song._id) }}>Remove from playlist</button>
                            </div>
                          </div>
                          <button className="px-3 py-3 text-white d-flex w-100 position-relative border border-dark rounded-lg bg-gray-900" onClick={() => { history.push("/song/" + song._id) }}>
                            <div className="row">
                              <div className="col-2"> 
                                <img className="rounded w-100" src={mediaURL + song.thumbnaildetails.blobname} onError={(e) => {e.target.src="https://place-hold.it/300x300/0ff/0ff"}} alt="..."></img> 
                              </div>
                              <div className="col-5 text-danger d-flex align-items-center"> 
                                <strong>{song.name}</strong>
                              </div>
                            </div>
                          </button>
                          {/* </div> */}
                        </li>
                      ))
                    ) : (<li className="list-group-item text-center text-danger"> Paylist is empty </li>)
                }
              </ul>
            </div>

          </>
        ) : (<></>)
      }
    </div >
  );
}

export default Playlist;