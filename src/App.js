import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import AddSong from "./Components/AddSong";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import MusicPlayer from './Components/MusicPlayer';

function App() {
  return (
    <div>
    <BrowserRouter>
        <h1 className="logo m-2">MyMusic</h1>
        <Nav/>
        <div className="container-fluid">
          <Switch>
          <Route exact path="/home" component={Home}></Route>
            <Route path="/add-song" component={AddSong}></Route>
            <Route path="/song/:id" component={MusicPlayer}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
