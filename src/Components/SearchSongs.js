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
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="input-group">
          <input className="form-control" type="search" onChange={(e) => { setText(e.target.value) }} placeholder="Search..." />
          <div className="input-group-append" id="button-addon4">
            <button className="btn btn-outline-light" type="button" onClick={handleSubmit}><i className="fa fa-search"></i></button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchSong;