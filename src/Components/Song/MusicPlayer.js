import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { deleteSong } from "./DeleteSong";
import './MusicPlayer.css';
import AddtoPlaylistsModal from "../AddToPlaylistsModal";
import { mediaURL } from '../Constants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const MusicPlayer = ({ history }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);
  const isAdmin = authState.isAdmin;

  let params = useParams();
  let songId = params.id;

  const [songDetails, setDetails] = useState(null);

  //modal for playlists
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!songId) {
      console.log("Song not found");
    }
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_SERVER_URL + '/songs/' + songId,
      headers: {
        'access-token': authState.accessToken
      }
    };

    axios(config).then(response => {
      if (response.data.error) {
        console.log(response.data.error);
      } else if (response.data) {
        setDetails({ ...response.data });
      }
    });
    // eslint-disable-next-line
  }, [])

  const deleteTheSong = async () => {
    let response = await deleteSong(songId, authState.accessToken);
    if (response && response.success) {
      toast.success(response.success.message, { autoClose: 5000 });
      history.goBack();
    }
    else {
      toast.error(response.error.message, { autoClose: 5000 });
    }
  }

  return (
    <>
      <div className="container darkTransparentBackground mt-3 p-3">
        {
          (songDetails) ? (
            <div style={{ marginBottom: "100px" }}>
              {
                (isAdmin) ? (
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary m-1" onClick={() => { history.push("/edit-song/" + songId) }}><i className="fa fa-pencil px-1"></i>Edit Song</button>
                    <button className="btn btn-outline-danger m-1" onClick={() => { deleteTheSong() }}><i className="fa fa-trash-o px-1"></i>Delete Song</button>
                  </div>
                ) : (<></>)
              }
              <div className="row">
                <div className="p-3 col-6 col-sm-6 col-md-4 col-lg-3">
                  <div className="d-flex">
                    <img className="img-fluid rounded"
                      src={mediaURL + songDetails.thumbnaildetails.blobname} onError={(e) => {e.target.src="https://place-hold.it/300x300/0ff/0ff"}} alt="..."></img>
                  </div>
                </div>

                {/* details */}
                <div className="p-3 col-12 col-sm-6 col-md-6 col-lg-5 text-warning d-flex-column">
                  <h1 className="mx-auto">{songDetails.name}</h1>
                  {
                    (songDetails.artists) ? (
                      <div className="text-white-50">
                        Artisits: {songDetails.artists}
                      </div>
                    ) : (<></>)
                  }
                  <button className="btn btn-outline-primary m-1 mt-3" onClick={() => { setShowModal(true) }}><i className="fa fa-plus px-1"></i>Add to playlist</button>
                  <AddtoPlaylistsModal songId={songDetails._id} showModal={showModal} setShowModal={setShowModal}/>
                </div>

                {/* lyrics */}
                <div className="p-3 col-12 col-md-6 col-lg-4">
                  {
                    (songDetails.lyrics) ? (
                      <>
                        <div className="card bg-gray-900">
                          <h6 className="card-header text-light border border-secondary">
                            Lyrics
                          </h6>
                          <div className="card-body text-warning lyrics" style={{height: "300px", overflow: "auto"}}>
                            {
                              songDetails.lyrics.split("\n").map((line, index) => (
                                <p key={index}>{line}</p>
                              ))
                            }
                          </div>
                        </div>
                      </>
                    ) : (<></>)
                  }
                </div>
              </div>

              {/* My audio player - using HTML5 audio player with custom styles*/}
              <div className="myAudioPlayer border border-warning fixed-bottom px-5 py-2 mx-3 mb-4">
                <audio controls autoPlay className="w-100" controlsList="nodownload noplaybackrate"
                >
                  <source src={ mediaURL + songDetails.songdetails.blobname } type="audio/ogg" />
                </audio>
              </div>
            </div>
          ) : (<p className="text-white text-center">Song not found</p>)
        }

      </div>
    </>
  );
}

export default MusicPlayer;