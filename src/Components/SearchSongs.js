import { useState } from 'react';
import { useHistory } from 'react-router';

const SearchSong = () => {
  const [text, setText] = useState("");
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text==="") return 0;
    history.push("/search-results?text="+text);
  }

  return (
    <>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <div className="input-group w-75 mx-auto my-4">
          <input className="form-control" type="search" onChange={(e) => { setText(e.target.value) }} placeholder="Search..." />
          <div className="input-group-append" id="button-addon4">
            <button className="btn btn-outline-secondary" type="button" onClick={handleSubmit}><i className="fa fa-search"></i></button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchSong;