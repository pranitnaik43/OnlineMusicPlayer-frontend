import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";

import { store } from "./store";
import './App.css';
import Nav from './Components/Nav';
import AddSong from "./Components/Song/AddSong";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import MusicPlayer from './Components/Song/MusicPlayer';
import Playlists from './Components/Playlists';
import Playlist from './Components/Playlist';
import EditSong from './Components/Song/EditSong';
import SearchResults from './Components/SearchResults';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <h1 className="logo m-2">MyMusic</h1>
          <Nav />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route path="/add-song" component={AddSong}></Route>
              <Route path="/edit-song/:id" component={EditSong}></Route>
              <Route path="/song/:id" component={MusicPlayer}></Route>
              <Route path="/playlists" component={Playlists}></Route>
              <Route path="/playlist/:id" component={Playlist}></Route>
              <Route path="/search-results" component={SearchResults}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
