import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux";
import { getPublishers, getBooks, addBook, getBook, updateBook, deleteBook } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { BookList } from "./BookList";
import { AddBook } from "./addBook";

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    getPublishers, getBooks, addBook, getBook, updateBook, deleteBook
}

export const BookConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                selectedPublisherValue: '',
                searchValue: ''
            }
        }

        render() {
            return <Switch>
                <Route path="/books/"
                    render={(routeProps) =>
                        <BookList selectedPublisherValue={this.state.selectedPublisherValue} searchValue={this.state.searchValue} setSelectedPublisherValue={this.handleSetSelectedPublisherValue} setSearchValue={this.handleSetSearchValue} {...this.props} publishers={this.props.publishers} books={this.props.books} deleteBookById={this.handleDeleteBook} changeFilterValues={this.handleChangeFilterValues} />} />
                <Route path="/addbook"
                    render={(routeProps) =>
                        <AddBook {...this.props} addBook={this.handleAddBook} updateBook={this.handleUpdateBook} cancelAddBook={this.handleCancelAddBook} getBook={this.getBookById} location={this.props.location} />} />
            </Switch>
        }

        componentDidMount = () => {
            this.loadInitialData(false);
        }

        loadInitialData = (redirect) => {
            if(redirect){
                this.props.history.push("/books");
            }
            this.props.getPublishers(DataTypes.PUBLISHERS);
            this.props.getBooks(DataTypes.BOOKS);
        }

        handleSetSearchValue = (value) => {
            this.setState(
                { searchValue: value });
        }

        handleSetSelectedPublisherValue = (value) => {
            this.setState(
                { selectedPublisherValue: value });
        }

        handleChangeFilterValues = (publisherId, pageIndex, searchText) => {
            this.props.getBooks(DataTypes.BOOKS, publisherId, pageIndex, searchText);
        }

        handleAddBook = (newBook) => {
            this.props.addBook(DataTypes.BOOK, newBook, this.afterAddOrUpdateBook);
        }

        handleCancelAddBook = () => {
            this.loadInitialData(true);
        }

        handleUpdateBook = (newBook) => {
            this.props.updateBook(DataTypes.BOOK, newBook, this.afterAddOrUpdateBook);
        }

        handleDeleteBook = (bookId) => {
            this.props.deleteBook(DataTypes.BOOK, bookId, this.afterDeleteBook);
        }

        afterAddOrUpdateBook = () => {
            this.props.history.push("/books");
            this.props.getBooks(DataTypes.BOOKS);
        }

        afterDeleteBook = () => {
            this.setState(
                { selectedPublisherValue: '' });

            this.setState(
                { searchValue: '' });

            this.props.getBooks(DataTypes.BOOKS);
        }

        getBookById = (bookId, callback) => {
            this.props.getBook(DataTypes.BOOK, bookId, callback);
        }
    }
)
