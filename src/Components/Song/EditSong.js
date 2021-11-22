import SongForm from "./SongForm";
import { useParams } from  "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const EditSong = ({ history }) => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  let params = useParams();
  let songId = params.id;
  const [songData, setSongData] = useState();

  useEffect(() => {
    var config = {
      method: 'get',
      url: process.env.REACT_APP_SERVER_URL+"/songs/"+songId,
      headers: { 
        'Content-Type': 'application/json',
        'access-token': authState.accessToken
      }
    };
    axios(config).then(response => {
      if(response.data.error){
        toast.error("Failed:"+ response.data.error.message, {autoClose: 5000});
        history.goBack();
      }
      if(response.data) {
        setSongData(response.data);
      }
    }).catch(function (error) {
      toast.error("Login Failed:"+ error, {autoClose: 5000});
      // console.log(error);
    });
    // eslint-disable-next-line
  }, []);

  return ( 
    <>
    {
      (songData) ? (
        <SongForm title="Edit Song" method="PUT" serverURL={process.env.REACT_APP_SERVER_URL+'/songs/'+songId} oldSongData={songData}/>
      ) : (<></>)
    }
    </>
  );
}
 
export default EditSong;