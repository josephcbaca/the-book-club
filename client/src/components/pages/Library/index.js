import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Navbar'
import './style.css'

function Books({ loggedIn, currentUser }) {
    // Setting our component's initial state
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({
        title: "",
        author: "",
        synopsis: ""
    })

    // Load all books and store them with setBooks
    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all books and sets them to books
    function loadBooks() {
        axios.get("/api/library")
            .then(res =>
                console.log(res)
                // setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        // API.deleteBook(id)
        //     .then(res => loadBooks())
        //     .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };



    if (!loggedIn) return (<div> Please log in to use this app! <Link to="/login">Login</Link>
    </div>);
    return (<div>
        <Navbar />
        <div className="container">
            <h1>My Library</h1>
            {/* {
        books.length ? (
            <List>
                {books.map(book => {
                    return (
                        <ListItem key={book._id}>
                            <a href={"/books/" + book._id}>
                                <strong>
                                    {book.title} by {book.author}
                                </strong>
                            </a>
                            <DeleteBtn onClick={() => deleteBook(book._id)} />
                        </ListItem>
                    );
                })}
            </List>

        ) : (
                <h3>No Results to Display</h3>
            )
            
    } */}
        </div >
    </div>
    );
}


export default Books;