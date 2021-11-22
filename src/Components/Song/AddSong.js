import SongForm from "./SongForm";

const AddSong = () => {
  return ( 
    <>
      <SongForm title="Add Song" method="POST" serverURL={process.env.REACT_APP_SERVER_URL+'/songs'}/>
    </>
  );
}
 
export default AddSong;