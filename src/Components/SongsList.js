import { useHistory } from "react-router";
import { mediaURL } from './Constants';

const SongsList = ({ songs }) => {
  const history = useHistory();

  return (
    <>
      <ul className="list-group list-group-flush">
        {
          (songs && songs.length > 0) ?
            (
              songs.map((song) => (
                <li className="list-group-item position-relative m-0 p-0" key={song._id}>
                  {/* <div className="position-relative"> */}
                  <div className="dropdown position-absolute p-1" style={{ top: "0.5rem", right: "0.5rem", zIndex: 1 }}>
                    <i className="fa fa-caret-down px-2 py-1 bg-light rounded-circle" id="dropdownMenuButton" data-toggle="dropdown"></i>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button className="dropdown-item" onClick={() => { history.push("/song/" + song._id) }}>Remove from playlist</button>
                    </div>
                  </div>
                  <button className="px-3 py-3 text-white d-flex w-100 position-relative border border-dark rounded-lg bg-gray-900" onClick={() => { history.push("/song/" + song._id) }}>
                    <div className="row">
                      <div className="col-2">
                        <img className="rounded w-100" src={mediaURL + song.thumbnaildetails.blobname} onError={(e) => { e.target.src = "https://place-hold.it/300x300/0ff/0ff" }} alt="..."></img>
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
    </>
  );
}

export default SongsList;