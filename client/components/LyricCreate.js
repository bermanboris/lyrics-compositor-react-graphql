import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addLyricQuery from '../queries/addLyric';
// import fetchSongQuery from '../queries/fetchSong';

class LyricCreate extends Component {
  state = { content: '' };

  onSubmit = event => {
    event.preventDefault();
    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content
      }
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   addLyricToSong: {
      //     id: this.props.songId,
      //     __typename: 'SongType',
      //     lyrics: [
      //       ...this.props.lyrics,
      //       {
      //         id: 0,
      //         content: this.state.content,
      //         likes: 0,
      //         __typename: 'LyricType'
      //       }
      //     ]
      //   }
      // },
      // update: (store, { data: { addLyricToSong } }) => {
      //   const data = store.readQuery({
      //     query: addLyricQuery
      //   });
      //   data.lyrics.push(addLyricToSong);
      //   store.writeQuery({ query: addLyricQuery, data });
      // }
    });
    this.setState({ content: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Add a lyric</label>
          <input
            onChange={({ target: { value } }) =>
              this.setState({ content: value })}
            value={this.state.content}
          />
        </form>
      </div>
    );
  }
}

export default graphql(addLyricQuery)(LyricCreate);
