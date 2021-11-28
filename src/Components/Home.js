import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";  
import axios from 'axios';
import { mediaURL } from './Constants';

const Home = () => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  const [playlists, setPlaylists] = useState([]);

  var config = {
    headers: {
      'access-token': authState.accessToken
    }
  };

  useEffect(() => {
    try {
      const getData = async () => {
        let allSongs = [], tempPlaylists = [], playlistSongs = [];

        //get all songs
        config.method = 'GET';
        config.url = process.env.REACT_APP_SERVER_URL + '/songs';
        let response = await axios(config);

        if (response.data.error) {
          console.log(response.data.error);
        } else if (response.data) {
          allSongs = response.data;
        }

        //get public playlists
        config.url = process.env.REACT_APP_SERVER_URL + '/playlists/public';

        response = await axios(config);
        if (response.data.error) {
          console.log(response.data.error.message);
        } else if (response.data) {
          tempPlaylists = response.data;
          console.log(tempPlaylists)

          //add songs data to each playlist
          tempPlaylists.forEach(playlist => {
            playlistSongs = []
            if (playlist.songs) {
              playlist.songs.forEach(songId => {
                let song = allSongs.find(song => (song._id === songId));
                if (song) {
                  playlistSongs.push(song);
                }
              })
            }
            playlist.songs = playlistSongs;
          })


          setPlaylists([...tempPlaylists])
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
      {/* {console.log(playlists)} */}
      {
        (playlists && playlists.length>0) ? (
          <>
            {
              playlists.map(playlist => (
                <div className="mb-5" key={playlist._id}>
                    <h4 className="text-danger mb-3"> {playlist.name} </h4>
                    <div className="row flex-nowrap homePlaylist mx-3" style={{ overflowX: "auto" }}>
                      {
                        playlist.songs.map(song => (
                          <div className="col-7 col-sm-4 col-md-3 col-lg-3 col-xl-2 d-flex-column" key={song._id}>
                            <Link to={"/song/"+song._id}> 
                              <img className="rounded w-100 mx-auto"
                                src={mediaURL + song.thumbnaildetails.blobname}
                                onError={(e) => {e.target.src="https://place-hold.it/300x300/0ff/0ff"}}
                                alt={song.name}></img>
                            </Link>
                            <div className="text-center text-warning mx-auto">{song.name}</div>
                          </div>
                        ))
                      }
                    </div>
                </div>
              ))
            }

          </>
        ) : (
          <p className="text-center text-white">Loading...</p>
        )
      }
      
      {/* <div className="text-warning m-4">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum incidunt ut error, hic odio, praesentium iste cupiditate molestiae accusantium pariatur repudiandae placeat vero, officia assumenda aspernatur commodi dicta mollitia possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum suscipit quia nemo obcaecati quae consequuntur minima neque aut, soluta, debitis enim est laboriosam iusto! Molestias ipsam vitae optio quis odit.
        </p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus placeat facilis ipsum sunt dignissimos officiis quibusdam impedit, quaerat voluptas in nostrum iure vitae praesentium nemo nam qui deleniti reiciendis.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, sequi, suscipit culpa non architecto ex cum ipsam enim quod vitae possimus dolore earum dolores laudantium eum adipisci repellat a asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis maiores nobis minima itaque laudantium, quaerat, possimus placeat expedita, at accusantium rem quibusdam ducimus explicabo tempore a? Sint consequuntur totam ad.</p>
      </div> */}
    </div>
  );
}

export default Home;