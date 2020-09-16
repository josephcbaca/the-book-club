import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Navbar'
import './style.css'

function Search({ loggedIn, currentUser }) {
  const [books, setBooks] = useState("");
  const [result, setResult] = useState([]);
  const [isImage, setIsImage] = useState("");
  const [isAuthor, setIsAuthor] = useState("");
  const [isInfoLink, setIsInfoLink] = useState("");
  const [isSelected, setIsSelected] = useState("")

  // GET search to Google api on backend
  // Otherwise we log any errors
  function searchBooks(e) {
    e.preventDefault();
    const bodyObj = { 
      book: books
    }
    console.log(bodyObj)
    axios.get("/api/search-books", bodyObj)
      .then(res => {
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
    console.log(isSelected)
    const bodyObj = {
      image: isImage,
      title: isSelected,
      author: isAuthor,
      infoLink: isInfoLink,
      ReaderId: currentUser.id
    }
    console.log(bodyObj);
    axios.post("/api/save-book", bodyObj)
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
    setIsSelected(e.target.title);
    setIsImage(e.target.src);
    setIsAuthor(e.target.name);
    setIsInfoLink(e.target.value);
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
          name="book"
          onChange={e => setBooks(e.target.value)}
        />
      </div>
      <div className="row mb-3">
        <button onClick={searchBooks} type="button" className="btn btn-outline-dark col-4">Search</button>

        <Link className="col-4" to="/library"><button type="button" className="btn btn-outline-dark col-12">My Library</button></Link>
        { //Check if message failed
          (result.length === 0)
            ? <div></div>
            : <button onClick={addNewBook} type="button" className="btn btn-outline-dark col-4">Add to Shelf</button>
        }
      </div>

      {result.length === 0 ? (
        <div className="row">
          <h5>Search for books!</h5>
        </div>
      ) : (result.map(book => <div className="row" key={book.id}>
        <input onChange={handleBookChange} src={book.volumeInfo.imageLinks.thumbnail} title={book.volumeInfo.title} name={book.volumeInfo.authors} value={book.volumeInfo.infoLink} checked={isSelected === book.volumeInfo.title} type="checkbox" className="form-check-input" id="exampleCheck1"></input>
        <img className="col-2" alt={"Book with cover title "+book.volumeInfo.title} src={book.volumeInfo.imageLinks.thumbnail}></img>
        <h6 className="col-5">{book.volumeInfo.title}</h6>
        <h6 className="col-2">{book.volumeInfo.authors}</h6>
        <a className="col-2" href={book.volumeInfo.infoLink}>Link</a>
      </div>))
      }

    </div>
  </div>);
}

export default Search;