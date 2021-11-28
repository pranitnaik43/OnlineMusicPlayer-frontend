import { NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { EMPTY } from "../reducers/authReducer";
import { useEffect } from 'react';
import SearchSongs from "./SearchSongs";

const Nav = ({ history }) => {

  // auth state from redux store
  const authState = useSelector((state) => state);
  // console.log(authState);

  // dispatch actions for auth reducer
  const dispatch = useDispatch();
  const resetAuth = () => dispatch({ type: EMPTY });

  useEffect(() => {
    if (!authState.accessToken) {
      history.push("/login");
    }
    // console.log(authState);
    // eslint-disable-next-line
  }, []);

  const handleLogout = (e) => {
    resetAuth();
    history.push("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {
              (authState.accessToken) ? (
                <>
                  <NavLink className="nav-link" to="/home">Home</NavLink>
                  <NavLink className="nav-link" to="/playlists">Playlists</NavLink>
                </>
              ) : (<></>)
            }
            {
              (authState.isAdmin) ? (
                <>
                  <NavLink className="nav-link" to="/add-song">Add Song</NavLink>
                </>
              ) : (<></>)
            }
          </ul>
          <ul className="navbar-nav ml-auto">
            {
              (authState.accessToken) ? (
                <>
                <SearchSongs />
                <li className="mx-3"/>
                <li className="nav-link" onClick={(e) => { handleLogout(e) }}>Logout</li>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                  <NavLink className="nav-link" to="/signup">Register</NavLink>
                </>
              )
            }
          </ul>
        </div>
      </nav>
    </>
  );
}

export default withRouter(Nav);