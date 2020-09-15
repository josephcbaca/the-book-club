import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Navbar'
import './style.css'

function Search({ loggedIn, currentUser }) {
  const [books, setBooks] = useState("");
  const [result, setResult] = useState([]);
  const [isSelected, setIsSelected] = useState("")

  // GET search to api route
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

  // Posts a new hosted game to database
  // Otherwise we log any errors
  function addNewBook(e) {
    e.preventDefault();
    const bodyObj = {
      title: "",
      author: "",
      synopsis: "",
      ReaderId: ""
    }
    console.log(bodyObj);
    axios.post("/api/host-new-game", bodyObj)
      .then(res => {
        console.log(res);
        if (!res.data.errmsg) {
          console.log("success!");
        } else {
          console.log("ERR");
        }
      })
      .catch(err => {
        console.log("Create Game errored.  Try again.");
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
      <div className="row mb-3">
        <input
          className="form-control col-4"
          type="text"
          placeholder="Search Books"
          name="searchBooks"
          onChange={e => setBooks(e.target.value)}
        />
      </div>
      <div className="row mb-3">
        <button onClick={searchBooks} type="button" className="btn btn-outline-dark col-4">Search</button>

        <Link className="col-4" to="/library"><button type="button" className="btn btn-outline-dark col-12">My Library</button></Link>
        {/* { //Check if message failed
          (result.length < 0)
        ? <div></div>
        : <button onClick={addNewBook} type="button" className="btn btn-outline-dark col-4">Add to Shelf</button>
        } */}
      </div>
      <div className="row">
        {
          (result.length < 0)
            ? <p>Search for books!</p>
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