import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { useHistory } from 'react-router-dom';
import axios from "axios";

const MusicPlayer = () => {
  let params = useParams();
  let id = params.id;
  // let history = useHistory();

  const [songDetails, setDetails] = useState(null);

  useEffect(() => {
    // console.log(id);
    if(!id) {
      console.log("Song not found");
    }
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_SERVER_URL+'/songs/'+id,
      headers: { 
        'access-token': localStorage.getItem("accessToken")
      }
    };
    
    axios(config).then(response => {
      if(response.data.error) {
        console.log(response.data.error);
      } else if(response.data) {
        setDetails({...response.data});
      }
    });
  }, [id])

  return ( 
    <>  
      <div className="container darkTransparentBackground">
        {console.log(songDetails)}
          {
            (songDetails) ? (
              <div className="row">
                <div className="col-12 col-lg-6 d-flex justify-content-center">
                  <div>
                    <img className="img-fluid rounded w-75"
                    src={process.env.REACT_APP_SERVER_URL + '/thumbnail/' + songDetails.thumbnaildetails.filename}></img>
                    <audio controls autoPlay className="w-75">
                      {console.log(process.env.REACT_APP_SERVER_URL + '/song/' + songDetails.songdetails.filename)}
                      <source src={process.env.REACT_APP_SERVER_URL + '/song/' + songDetails.songdetails.filename} type="audio/ogg" />
                    </audio>
                  </div>
                </div>
                <div className="col-12 col-lg-6">

                </div>
              </div>
            ) : (<p className="text-white text-center">Song not found</p>)
          }
        
      </div>
    </>
  );
}
 
export default MusicPlayer;