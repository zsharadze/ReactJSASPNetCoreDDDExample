import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux";
import { getPublishers, getPublisher, addPublisher, updatePublisher, deletePublisher } from "../data/ActionCreators";
import { AddPublisher } from "../publisher/addPublisher";
import { Publishers } from "../publisher/publishers";
import { DataTypes } from "../data/Types";


const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    getPublishers, getPublisher, addPublisher, updatePublisher, deletePublisher
}

export const PublisherConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {

        render() {
            return <Switch>
                <Route path="/publishers"
                    render={(routeProps) =>
                        <Publishers {...this.props} publishers={this.props.publishers}  deletePublisherById={this.handleDeletePublisher} />} />
                <Route path="/addpublisher"
                    render={(routeProps) =>
                        <AddPublisher {...this.props} publisherId={this.props.match.params.id} addPublisher={this.handleAddPublisher} updatePublisher={this.handleUpdatePublisher} getPublisher={this.getPublisherById} location={this.props.location} />} />
            </Switch>
        }

        componentDidMount = () => {
            this.props.getPublishers(DataTypes.PUBLISHERS);
        }

        handleAddPublisher = (publisherName) => {
            let publisherObject = {
                Name: publisherName
            }

            this.props.addPublisher(DataTypes.PUBLISHERS, publisherObject, this.afterPublisherAdd);
        }

        afterPublisherAdd = () => {
            this.props.history.push("/publishers");
            this.props.getPublishers(DataTypes.PUBLISHERS);
        }

        afterPublisherUpdate = () => {
            this.props.history.push("/publishers");
            this.props.getPublishers(DataTypes.PUBLISHERS);
        }

        afterPublisherDelete = () => {
            this.props.getPublishers(DataTypes.PUBLISHERS);
        }

        getPublisherById = (publisherId, callback) => {
            this.props.getPublisher(DataTypes.PUBLISHERS, publisherId, callback);
        }

        handleUpdatePublisher = (publisherId, publisherName) => {
            let publisherObject = {
                Id: publisherId,
                Name: publisherName
            }
            this.props.updatePublisher(DataTypes.PUBLISHERS, publisherObject, this.afterPublisherUpdate);
        }

        handleDeletePublisher = (publisherId) => {
            this.props.deletePublisher(DataTypes.PUBLISHERS, publisherId, this.afterPublisherDelete);
        }
    }
)
