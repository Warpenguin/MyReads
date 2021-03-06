import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import NoMatch from './NoMatch'
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
      <Switch>
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
        <Route component={NoMatch}/>
      </Switch>
    )
  }
}

export default BooksApp
