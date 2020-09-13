import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Navbar'
import './style.css'

function Search({ loggedIn, currentUser }) {
  const [books, setBooks] = useState("");
  const [result, setResult] = useState([]);
  const [isSelected, setIsSelected] = useState("")

  // Posts search to api route
  // Otherwise we log any errors
  function searchBooks(e) {
    e.preventDefault();
    const bodyObj = {
      searchBooks: books,
    }
    axios.get("/api/search-books", bodyObj)
      .then(res => {
        console.log(res.data);
        if (!res.data.errmsg) {
          console.log("success!");
          setResult(res.data)
        } else {
          console.log(res.data.errmsg);
        }
      })
      .catch(err => {
        console.log("Search errored.  Try again.");
        console.log(err);
      })
  }

  const handleBookChange = e => {
    setIsSelected(e.target.name);
    console.log(e.target.name)
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
          <button onClick={searchBooks} type="button" className="btn btn-outline-dark mb-3">Search</button>
        </div>
      </div>
      <div className="row">
        { //Check if message failed
          (result.length < 0)
            ? <div> Search for books!</div>
            : result.map(book => <div className="row" key={book.id}>
              <input onChange={handleBookChange} name={book.volumeInfo.title} checked={isSelected === book.volumeInfo.title} type="checkbox" class="form-check-input time-dropbox" id="exampleCheck1"></input>
              <img className="col-2" src={book.volumeInfo.imageLinks.thumbnail}></img>
              <h6 className="col-5 black-headings">{book.volumeInfo.title}</h6>
              <h6 className="col-2 black-headings">{book.volumeInfo.authors}</h6>
              <a className="col-2 link-text" href={book.volumeInfo.infoLink}>Link</a>
            </div>)
        }
      </div>
    </div>
  </div>);
}

export default Search;