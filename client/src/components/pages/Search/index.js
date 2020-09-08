import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Navbar from '../../Navbar'
import './style.css'

function Search({ loggedIn, currentUser }) {
  const [books, setBooks] = useState("");
  // const history = useHistory();

    // Posts a new hosted game to database
    // Otherwise we log any errors
    function searchBooks(e) {
      e.preventDefault();
      const bodyObj = {
          searchBook: books,
      }
      console.log(bodyObj);
      axios.post("/api/search-books", bodyObj)
          .then(res => {
              console.log(res);
              if (!res.data.errmsg) {
                  console.log("success!");
                  // history.push("/browse-game");
              } else {
                  console.log("ERR");
              }
          })
          .catch(err => {
              console.log("Search errored.  Try again.");
              console.log(err);
          })
  }
  if (!loggedIn) return (<div> Please log in to use this app! <Link to="/login">Login</Link>
  </div>);
  return (<div>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col-4">
          <input
            className="form-control"
            type="text"
            placeholder="Search Books"
            name="searchBooks"
            onChange={e => setBooks(e.target.value)}
          />
          <button onClick={searchBooks} type="button" className="btn btn-outline-dark">Search</button>
        </div>
      </div>
    </div>
  </div>);
}

export default Search;