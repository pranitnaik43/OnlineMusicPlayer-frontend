import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

const AddtoPlaylistsModal = ({ songId, showModal, setShowModal }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  const [playlists, setPlaylists] = useState([]);
  const [checkedPlaylists, setCheckedPlaylists] = useState([]);

  var configTemp = {
    headers: {
      'Content-Type': 'application/json',
      'access-token': authState.accessToken
    }
  };

  useEffect(() => {
    if(showModal===false) {
      setCheckedPlaylists([]);
    }
    // eslint-disable-next-line
  }, [showModal]);

  useEffect(() => {
    let config = { ...configTemp };
    config.url = process.env.REACT_APP_SERVER_URL + '/playlists';
    config.method = "GET";
    axios(config).then(response => {
      if (response.data && Array.isArray(response.data)) {
        response.data.reverse();
        setPlaylists(response.data);
      }
    }).catch(function(err) {
      console.log(err);
    });
    // eslint-disable-next-line
  }, []);

  const isPlaylistAdded = (playlistId) => {
    if(checkedPlaylists 
      && Array.isArray(checkedPlaylists) 
      && checkedPlaylists.includes(playlistId)) {
        return true;
    }
    return false;
  }

  const handleChange = (e) => {
    let tempPlaylists = [...checkedPlaylists];
    let value = e.target.value;
    let checked = e.target.checked;
    // console.log(value,checked);
    if(checked && !tempPlaylists.includes(value)) {
      tempPlaylists.push(value);
    }
    else if(!checked) {
      tempPlaylists = tempPlaylists.filter(playlistId => (playlistId!==value));
    }
    setCheckedPlaylists([...tempPlaylists]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let config = { ...configTemp };
    config.url = process.env.REACT_APP_SERVER_URL + '/songs/add-to-playlists/' + songId;
    config.method = "PUT";
    config.data = { playlists: checkedPlaylists };
    axios(config).then(response => {
      if (response.data.error) {
        console.log(response.data.error.message);
      } else if(response.data.success) {
        console.log(response.data.success.message);
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  return (
    <>
      <Modal show={showModal} tabIndex="-1">
        <Modal.Header>
          <h5 className="modal-title">Add Song to Playlists</h5>
          <button type="button" className="close" onClick={() => { setShowModal(false) }}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div>
              {
                playlists.map((playlist) => (
                  <div className="form-check" key={playlist._id}>
                    <input name="playlists" className="form-check-input" type="checkbox" value={playlist._id} onChange={ handleChange } checked={isPlaylistAdded(playlist._id)}/>
                    <label className="form-check-label">
                      {playlist.name}
                    </label>
                  </div>
                ))
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false) }}>Close</button>
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit }>Submit</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddtoPlaylistsModal;