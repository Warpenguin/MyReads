import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  setBookShelf = (updatedBook, shelf) => {
    updatedBook.shelf = shelf

    BooksAPI.update(updatedBook, shelf)

    this.setState((state) => ({
      books:
        [...state.books.filter((book) => book.id !== updatedBook.id), updatedBook]
    }));
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            setBookShelf={this.setBookShelf} />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            setBookShelf={this.setBookShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
