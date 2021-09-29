import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Fragment } from "react";

export class AddBook extends Component {

    constructor(props) {
        super(props);
        const queryString = require('query-string');
        let parsed = queryString.parse(this.props.location.search);
        let bookId = parsed.id;
        let publisherId = this.props.publishers ? this.props.publishers[0].id : '';

        this.state = {
            bookId: bookId,
            bookName: '',
            bookAuthor: '',
            bookReleaseYear: '',
            bookPublisherId: publisherId
        };
    }

    handleSubmit = () => {
        if (!this.state.bookName) {
            this.modalOkDialog("Book name can't be empty");
            return;
        }
        if (!this.state.bookAuthor) {
            this.modalOkDialog("Author can't be empty");
            return;
        }
        if (!this.state.bookReleaseYear) {
            this.modalOkDialog("Release year can't be empty");
            return;
        }
        if (this.state.bookReleaseYear <= 0 || this.state.bookReleaseYear > 2200) {
            this.modalOkDialog("Invalid release year");
            return;
        }

        if (!this.state.bookId) {
            let newBookObject = {
                Name: this.state.bookName,
                Author: this.state.bookAuthor,
                ReleaseYear: this.state.bookReleaseYear,
                PublisherId: this.state.bookPublisherId
            }
            this.props.addBook(newBookObject)
        }
        else {
            let bookObject = {
                Id: this.state.bookId,
                Name: this.state.bookName,
                Author: this.state.bookAuthor,
                ReleaseYear: this.state.bookReleaseYear,
                PublisherId: this.state.bookPublisherId
            }
            this.props.updateBook(bookObject)
        }
    }

    modalOkDialog = (message) => {
        confirmAlert({
            title: 'Invalid data',
            message: message,
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => { }
                }
            ]
        });
    }

    componentDidMount = () => {
        if (this.state.bookId) {
            this.props.getBook(this.state.bookId, this.afterBookGetById);
        }
    }

    afterBookGetById = (bookObject) => {
        if (bookObject) {
            this.setState({
                bookName: bookObject.name,
                bookAuthor: bookObject.author,
                bookReleaseYear: bookObject.releaseYear,
                bookPublisherId: bookObject.publisherId
            });
        }
    }

    render() {
        return (
            <Fragment>
                <table className="m-2" style={{ width: "350px" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "100px" }}>
                                <label>Book name:&nbsp;</label>
                            </td>
                            <td className="td2AddBook">
                                <input type="text" className={"form-control" + (this.state.bookName.length ? '' : ' errorInput')} onChange={(event) => { this.setState({ bookName: event.target.value }) }} value={this.state.bookName} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "90px" }}>
                                <label>Author:&nbsp;</label>
                            </td>
                            <td className="td2AddBook">
                                <input type="text" className={"form-control" + (this.state.bookAuthor.length ? '' : ' errorInput')} onChange={(event) => { this.setState({ bookAuthor: event.target.value }) }} value={this.state.bookAuthor} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "90px" }}>
                                <label>Release year:&nbsp;</label>
                            </td>
                            <td className="td2AddBook">
                                <input type="number" className={"form-control" + (this.state.bookReleaseYear <= 0 || this.state.bookReleaseYear > 2200 ? ' errorInput' : '')} onChange={(event) => { this.setState({ bookReleaseYear: event.target.value }) }} value={this.state.bookReleaseYear} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "90px" }}>
                                <label>Publisher:&nbsp;</label>
                            </td>
                            <td className="td2AddBook">
                                <select className="form-select" value={this.state.bookPublisherId}
                                    onChange={(event) => { this.setState({ bookPublisherId: event.target.value }) }}>
                                    {this.props.publishers && this.props.publishers.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="button" className="btn btn-primary float-end ms-2 mt-2" onClick={this.handleSubmit}>{this.state.bookId ? "Save" : "Add"}</button>
                                <button type="button" className="btn btn-danger float-end mt-2" onClick={() => { this.props.cancelAddBook() }}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
