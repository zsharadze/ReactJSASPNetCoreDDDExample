import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export class Publishers extends Component {

    deletePublisherById = (publisherId) => {
        confirmAlert({
            title: 'Confirm delete',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { this.props.deletePublisherById(publisherId) }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    render() {
        return (
            <Fragment>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-sm">
                            <table style={{ width: "390px" }}>
                                <tbody>
                                    <tr>
                                        <td className="float-start">
                                            <i title="Go back" className="fas fa-arrow-left" style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => this.props.history.push("/books")}></i>
                                        </td>
                                        <td className="float-end">
                                            <i className="fa fa-plus" aria-hidden="true" style={{ fontSize: "25px", cursor: "pointer", marginRight: "2px" }} onClick={() => { this.props.history.push("/addpublisher") }}></i><span style={{ cursor: "pointer" }} onClick={() => { this.props.history.push("/addpublisher") }}>Add publisher</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table" style={{ width: "390px" }}>
                                <thead>
                                    <tr>
                                        <th>Publisher name</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.publishers && this.props.publishers.length > 0 && this.props.publishers.map((item, i) => {
                                        return (
                                            <Fragment key={item.id}>
                                                <tr>
                                                    <td data-id={item.id}>{item.name}</td>
                                                    <td style={{ width: "38px" }}><i title="Edit" className="fas fa-edit" style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => { this.props.history.push("/addpublisher/?id=" + item.id)}}></i></td>
                                                    <td style={{ width: "33px" }}><i title="Delete" className="fas fa-trash" style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => this.deletePublisherById(item.id)}></i></td>
                                                </tr>
                                            </Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
