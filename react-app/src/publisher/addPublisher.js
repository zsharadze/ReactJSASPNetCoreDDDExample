import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export class AddPublisher extends Component {

    constructor(props) {
        super(props);
        const queryString = require('query-string');
        let parsed = queryString.parse(this.props.location.search);
        let publisherId = parsed.id;
        this.state = {
            publisherName: '',
            publisherId: publisherId
        };
    }

    handleSubmit = () => {
        if (!this.state.publisherName) {
            confirmAlert({
                title: 'Invalid data',
                message: "Publisheer name can't be empty",
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => { }
                    }
                ]
            });
            return;
        }

        if (!this.state.publisherId) {
            this.props.addPublisher(this.state.publisherName)
        }
        else {
            this.props.updatePublisher(this.state.publisherId, this.state.publisherName)
        }
    }

    handleCancel = () => {
        this.props.history.push("/publishers");
    }

    componentDidMount = () => {
        if (this.state.publisherId) {
            this.props.getPublisher(this.state.publisherId, this.afterPublisherGetById);
        }
    }

    afterPublisherGetById = (publisherObject) => {
        this.setState({ publisherName: publisherObject.name });
    }

    render() {
        return (
            <div className="col-lg-2 col-md-5 col-sm-4 mt-3 ms-3">
                <form>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="mt-1">Publisher name:&nbsp;</label>
                        </div>
                        <input type="text" className="form-control" onChange={(event)=>{this.setState({ publisherName: event.target.value })}} value={this.state.publisherName} />
                    </div>
                    <button type="button" className="btn btn-primary float-end mt-2 mx-2" onClick={this.handleSubmit}>{this.state.publisherId ? "Save" : "Add"}</button>
                    <button type="button" className="btn btn-danger float-end mt-2" onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}
