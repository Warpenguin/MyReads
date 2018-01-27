import React, { Component } from 'react'
import './App.css'

const BookShelf = ({title, books, setBookShelf}) => {
    return (
        <div className="bookshelf">
            {title && <h2 className="bookshelf-title">{title}</h2>}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books && books.map((book, i) => (
                        <li key={i}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => setBookShelf(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf