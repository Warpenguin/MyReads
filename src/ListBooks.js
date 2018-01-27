import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import './App.css'

const ListBooks = ({ books, setBookShelf }) => {
    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {books && books.length > 0 ?
                        <div>
                            <BookShelf title='Currently Reading' books={books.filter(book => book.shelf === 'currentlyReading')} setBookShelf={setBookShelf} />
                            <BookShelf title='Want to Read' books={books.filter(book => book.shelf === 'wantToRead')} setBookShelf={setBookShelf} />
                            <BookShelf title='Read' books={books.filter(book => book.shelf === 'read')} setBookShelf={setBookShelf} />
                        </div>
                        : <div className='loader' />
                    }
                </div>
                <div className="open-search">
                    <Link to="/search" >Add a book</Link>
                </div>
            </div>
        </div>
    )
}
ListBooks.propTypes = {
    books: React.PropTypes.array.isRequired,
}

export default ListBooks