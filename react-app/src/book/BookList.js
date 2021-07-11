import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export class BookList extends Component {
    handleChangePublisher = (event) => {
        this.props.setSelectedPublisherValue(event.target.value);
        this.props.changeFilterValues(event.target.value, 1, this.props.searchValue);
    }

    handlePageIndexChanged = (pageIndex) => {
        this.props.changeFilterValues(this.props.selectedPublisherValue, pageIndex, this.props.searchValue);
    }

    handleSearchChange = (event) => {
        this.props.setSearchValue(event.target.value);
        this.props.changeFilterValues(this.props.selectedPublisherValue, 1, event.target.value);
    }

    deleteBookById = (bookId) => {
        confirmAlert({
            title: 'Confirm delete',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { this.props.deleteBookById(bookId) }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    render() {
        let pagerIndexBtns = [];
        let previousPageIndex = 0;
        let nextPageIndex = 0;

        if (this.props.books && this.props.books.pager) {
            for (let pageIndex = this.props.books.pager.startPage; pageIndex <= this.props.books.pager.endPage; pageIndex++) {
                pagerIndexBtns.push(<li key={pageIndex} className={"paginate_button page-item nolabelselect" + (pageIndex === this.props.books.pager.currentPage ? " active" : "")}><button className="page-link" onClick={() => this.handlePageIndexChanged(pageIndex)}>{pageIndex}</button></li>);
            }
            previousPageIndex = this.props.books.pager.currentPage - 1;
            nextPageIndex = this.props.books.pager.currentPage + 1;
        }

        return (
            <div className="container mt-2">
                <div className="row">
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td className="float-start">
                                    <select className="form-control" value={this.props.selectedPublisherValue}
                                        onChange={this.handleChangePublisher}>
                                        <option key={0} value="">
                                            Select publisher...
                                        </option>
                                        {this.props.publishers && this.props.publishers.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="float-start ps-2">
                                    <i title="Edit publishers" className="fas fa-edit" style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { this.props.history.push("/publishers") }}></i>
                                </td>
                                <td className="float-start" style={{ paddingLeft: "30px", cursor: "pointer" }} onClick={() => { this.props.history.push("/addbook") }}>
                                    <i className="fas fa-plus" style={{ fontSize: "25px", cursor: "pointer", display: "table-cell" }}></i>
                                    <span style={{ display: "table-cell" }}>Add book</span>
                                </td>
                                <td className="text-center">  <input type="search" className="form-control" onChange={this.handleSearchChange} placeholder="Type to search..." value={this.props.searchValue} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Author</th>
                                    <th>Release Year</th>
                                    <th>Publisher</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.books && this.props.books.booksList && this.props.books.booksList.map((item, i) => {
                                    return (
                                        <Fragment key={item.id}>
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.author}</td>
                                                <td>{item.releaseYear}</td>
                                                <td>{item.publisherName}</td>
                                                <td style={{ width: "38px" }}><i title="Edit" className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => { this.props.history.push("/addbook/?id=" + item.id) }}></i></td>
                                                <td style={{ width: "38px" }}><i title="Delete" className="fas fa-trash" style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => this.deleteBookById(item.id)}></i></td>
                                            </tr>
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                        {this.props.books && this.props.books.pager &&
                            <div className="float-end">
                                <div className="table_paginate paging_simple_numbers">
                                    <ul className="pagination">
                                        <li className={"paginate_button page-item previous" + (this.props.books.pager.currentPage === 1 ? " disabled" : "")}>
                                            <button className="page-link nolabelselect" onClick={() => this.handlePageIndexChanged(previousPageIndex)}>Previous</button>
                                        </li>
                                        {pagerIndexBtns}
                                        {(this.props.books.pager.currentPage + 4) < this.props.books.pager.totalPages &&
                                            <Fragment>
                                                <li className={"paginate_button page-item next"}>
                                                    <button className="page-link nolabelselect" onClick={() => this.handlePageIndexChanged(nextPageIndex)}>Next</button>
                                                </li>
                                                <li className="paginate_button page-item nolabelselect">
                                                    <button className="page-link nolabelselect">...</button>
                                                </li>
                                                <li className="paginate_button page-item nolabelselect">
                                                    <button className="page-link nolabelselect" onClick={() => this.handlePageIndexChanged(this.props.books.pager.totalPages)}>{this.props.books.pager.totalPages}</button>
                                                </li>
                                            </Fragment>
                                        }
                                    </ul>
                                </div>
                            </div>
                        }
                        {this.props.books && this.props.books.pager &&
                        <span style={{fontStyle:"italic"}}>{this.props.books.pager.paginationSummary}</span>}
                    </div>
                </div>
            </div>
        )
    }
}
