import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Navbar'
import './style.css'

function Books({ loggedIn, currentUser }) {
    const currentUserId = currentUser.id
    const [library, setLibrary] = useState([]);
    const [isSelected, setIsSelected] = useState("")

    const getLibrary = () => {
    const bodyObj = {
        ReaderId: currentUserId
    }
    axios.get("/api/my-library", bodyObj)
        .then(res => {
            setLibrary(res.data)
        })
    }

    useEffect(getLibrary, []);

    const handleBookChange = e => {
        setIsSelected(e.target.title);
    }

    if (!loggedIn) return (<div> Please log in to use this app! <Link to="/login">Login</Link>
    </div>);
    return (<div>
        <Navbar />
        <div className="container">
            <h1>My Library</h1>
            <div className="row">
                {library.length === 0 ? (
                    <h5>Search for books!</h5>
                ) : (library.map(book => <div className="row" key={book.id}>
                    <input onChange={handleBookChange} title={book.title} checked={isSelected === book.title} type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <img className="col-2" src={book.image}></img>
                    <h6 className="col-5 black-headings">{book.title}</h6>
                    <h6 className="col-2 black-headings">{book.author}</h6>
                    <a className="col-2 link-text" href={book.infoLink}>Link</a>
                </div>))
                }
            </div>
        </div >
    </div>
    );
}


export default Books;