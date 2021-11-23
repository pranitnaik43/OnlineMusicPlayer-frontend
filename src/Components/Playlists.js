import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Playlists = ({ history }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const dataTemplate = {
    type: "",
    title: "",
    playlistId: "",   //for edit
    name: "",
    error: ""
  };
  const [data, setData] = useState({ ...dataTemplate });

  const methods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
  }
  const colors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];

  var configTemp = {
    url: process.env.REACT_APP_SERVER_URL + '/playlists',
    headers: {
      'access-token': authState.accessToken
    }
  };

  useEffect(() => {
    let config = { ...configTemp };
    config.method = methods.GET;
    axios(config).then(response => {
      console.log(response.data);
      if (response.data && Array.isArray(response.data)) {
        response.data.reverse();
        setPlaylists(response.data);
      }
    });
    // eslint-disable-next-line
  }, []);

  const createPlaylist = () => {
    setData({ ...dataTemplate, title: "Create Playlist", type: "create" });
    setShowModal(true);
  }

  const editPlaylist = (playlist) => {
    setData({ ...dataTemplate, title: "Edit Playlist", name: playlist.name, playlistId: playlist._id, type: "edit" });
    setShowModal(true);
  }

  const handleChange = (e) => {
    let value = e.target.value;
    let error;
    if (!value) {
      error = "Name cannot be null";
    } else {
      error = "";
    }
    data.name = value;
    data.error = error;
    setData({ ...data });
  }

  const getRandomColor = () => {
    let length = colors.length;
    let randomNum = Math.floor(Math.random() * length);
    return colors[randomNum];
  }

  //create, update or delete playlist
  const crudAction = (method = methods.POST, id = null) => {
    let config = { ...configTemp };
    config.method = method;
    switch (method) {
      case methods.POST:
        config.data = { name: data.name, color: getRandomColor() };
        break;
      case methods.PUT:
        config.url += "/" + id;
        config.data = { name: data.name };
        break;
      case methods.DELETE:
        config.url += "/" + id;
        break;
      default:
        break;
    }
    console.log(config);
    setShowModal(false);
    axios(config).then(response => {
      if (response.data.error) {
        toast.error("Error:" + response.data.error.message, { autoClose: 5000 });
      } else if (response.data.success.message) {
        toast.success(response.data.success.message, { autoClose: 5000 });
        window.location.reload();
      }
    });
  }
  return (
    <div className="container darkTransparentBackground mt-3 p-3">
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-outline-primary" onClick={createPlaylist}>
          <i className="fa fa-plus pr-2"></i> Create Playlist
        </button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 m-5 d-flex justify-content-center">
        {(playlists.length > 0) ?
          (playlists.map(playlist => {
            return (
              <div className="col my-4" key={playlist._id}>
                <div className="position-relative w-75">
                  <div className="dropdown position-absolute p-1" style={{ top: "0.5rem", right: "0.5rem", zIndex: 1 }}>
                    <i className="fa fa-caret-down px-2 py-1 bg-light rounded-circle" id="dropdownMenuButton" data-toggle="dropdown"></i>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button className="dropdown-item" onClick={() => { editPlaylist(playlist) }}>Edit</button>
                      <button className="dropdown-item" onClick={() => { crudAction(methods.DELETE, playlist._id) }}>Delete</button>
                    </div>
                  </div>
                  <button className={"p-5 text-white d-flex justify-content-center w-100 position-relative border border-dark rounded-lg bg-gradient-" + playlist.color} onClick={() => { history.push("/playlist/"+playlist._id) }}>
                    <div>{playlist.name}</div>
                  </button>
                </div>
              </div>
            )
          })
          ) :
          (<p className="text-center text-white">There are no playlists</p>)}
      </div>
      <Modal show={showModal} tabIndex="-1">
        <Modal.Header>
          <h5 className="modal-title">{data.title}</h5>
          <button type="button" className="close" onClick={() => { setShowModal(false) }}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Playlist Name</span>
            </div>
            <input type="text" className="form-control" value={data.name} onChange={handleChange} autoFocus/>
            <span className="text-danger">{data.error}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false) }}>Close</button>
          <button type="submit" className="btn btn-primary" onClick={() => { (data.type === "edit") ? crudAction(methods.PUT, data.playlistId) : crudAction(methods.POST) }} disabled={!data.name}>Submit</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Playlists;