import { useState } from "react";
import axios from 'axios';

import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const AddSong = ({history}) => {

  const [songData, setSong] = useState({
    name: '',
    artists: '',
    lyrics: '',
    thumbnail: undefined,
    song: undefined
  });
  const [errors, setErrors] = useState({
    name: '',
    song: '',
    thumbnail: ''
  });

  const supportedAudioMimeTypes = ['audio/mp3', 'audio/mpeg'];
  const supportedThumnbnailMimeTypes = ['image/jpeg', 'image/webp', 'image/png'];

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let file = (e.target.files) ? (e.target.files[0]) : (null);
    
    switch(name) {
      case 'song':
        if(!file) {
          errors.song = "Song cannot be empty";
        } else {
          if(supportedAudioMimeTypes.includes(file.type)){
            songData[name] = file;
            errors.song = "";
            break;
          } else {
            errors.song = "File type not supported";
          }
        }
        songData[name] = null;
        break;
      case 'thumbnail':
        //following body executes for song and thumbnail file
        if(!file) {
          errors.song = "Thumbnail cannot be empty";
        } else {
          if(supportedThumnbnailMimeTypes.includes(file.type)){
            songData[name] = file;
            errors.thumbnail = "";
            break;
          } else {
            errors.thumbnail = "File type not supported";
          }
        }
        songData[name] = null;
      break;
      case 'name': 
        if(!value) {
          errors.name = "Name cannot be empty";
        } else {
          errors.name = "";
        } // eslint-disable-next-line
      default:
        songData[name] = value;
        break;
    }
    setSong({ ...songData });
    setErrors({ ...errors });
  }

  const canSubmit = () => {
    var flag = true;
    if(songData.name==="" || songData.song===null) {
      flag = false;
    }
    Object.keys(errors).forEach(key => {
      if(errors[key]!=="")
        flag = false;
    });
    // console.log(songData, errors, flag);
    return flag;
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    console.log("fileType: "+songData.song.type);
    let data = new FormData();
    Object.keys(songData).forEach(key => {
      data.append(key, songData[key]);
    });
    
    var config = {
      method: 'POST',
      url: process.env.REACT_APP_SERVER_URL+'/songs',
      headers: { 
        'access-token': localStorage.getItem("accessToken"),
        'Content-Type': 'multipart/form-data'
      }, 
      data: data
    };
    
    axios(config).then(response => {
      if(response.data.error) {
        toast.error("Failed: "+ response.data.error.message, {autoClose: 5000});
        // console.log(response.data.error);
      }
      else if(response.data.success) {
        toast.success("Song added successfully", {autoClose: 5000});
        console.log(response.data.success);
      }
    });
  }

  return ( 
    <>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 darkTransparentBackground px-5 py-4">
          <h1 className="text-center text-primary">Add song</h1>
          <hr/>
          <form>
            <div className="form-group">
              <label htmlFor="song" className="text-warning">Upload Song</label>
              <input name="song" type="file" className="form-control-file border border-dark text-white-50" accept="audio/*" onChange={handleChange}/>
              <span className="text-danger">{errors.song}</span>
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail" className="text-warning">Upload Thumbnail</label>
              <input name="thumbnail" type="file" className="form-control-file border border-dark text-white-50" accept="image/*" onChange={handleChange}/>
              <span className="text-danger">{errors.thumbnail}</span>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="text-warning">Song Name</label>
              <input name="name" type="text" className="form-control" onChange={handleChange}/>
              <span className="text-danger">{errors.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="artists" className="text-warning">Artists</label>
              <input name="artists" type="text" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="lyrics" className="text-warning">Lyrics</label>
              <textarea name="lyrics" className="form-control" rows="3" onChange={handleChange} ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!canSubmit()}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default AddSong;