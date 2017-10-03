import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import fetchSongs from '../queries/fetchSongs';
import deleteSongQuery from '../queries/deleteSong';

class SongList extends Component {
  static defaultProps = {
    data: { songs: [] }
  };

  deleteSong = async id => {
    this.props
      .mutate({ variables: { id } })
      .then(this.props.data.refetch);
  };

  renderSongs() {
    return this.props.data.songs.map(({ id, title }, i) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          onClick={() => this.deleteSong(id)}
          className="material-icons right"
        >
          delete
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading && !this.props.data.songs) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link
          to={`/songs/new`}
          className="btn-floating link btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSongQuery)(
  graphql(fetchSongs)(SongList)
);
