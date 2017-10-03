import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import query from '../queries/fetchSongs';

class SongCreate extends Component {
  state = { title: '' };

  onSubmit = async event => {
    const { mutate, history } = this.props;
    event.preventDefault();

    await mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    });

    history.push('/');
  };

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            autoFocus
            onChange={({ target: { value } }) =>
              this.setState({ title: value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation addSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
