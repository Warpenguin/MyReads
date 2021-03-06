import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css'

class SearchBooks extends Component {
    state = {
        queryBooks: []
    }

    searchQuery = (query) => {
        this.setState({ query })
        query ?
            BooksAPI.search(query).then(queryBooks => {
                queryBooks && queryBooks.length > 0 && this.state.query ? this.setState({
                    queryBooks: queryBooks.map((queryBook) => {
                        var book = this.props.books.find((book) => book.id === queryBook.id)
                        queryBook.shelf = book ? book.shelf : 'none'
                        return queryBook
                    })
                }) : this.setState({ queryBooks: [] })
            }) : this.setState({ queryBooks: [] })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // -- only update if queryBooks differ
        if (this.state.queryBooks === nextState.queryBooks) {
            return false
        }
        return true
    }

    render() {
        const { setBookShelf } = this.props
        return (
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Back </Link>
                        <div className="search-books-input-wrapper">
                            <DebounceInput
                                type="text"
                                placeholder="Search by title or author"
                                minLength={1}
                                debounceTimeout={200}
                                onChange={(event) => this.searchQuery(event.target.value)} />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <BookShelf books={this.state.queryBooks} setBookShelf={setBookShelf} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks