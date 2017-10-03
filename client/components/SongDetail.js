import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import fetchSong from '../queries/fetchSong';

import LyricList from './LyricList';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) return <div>Loading.....</div>;

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate
          lyrics={song.lyrics}
          songId={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => ({
    variables: { id: props.match.params.id }
  })
})(SongDetail);
