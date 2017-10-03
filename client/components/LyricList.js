import React, { Component } from 'react';
import likeLyricQuery from '../queries/likeLyric';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike = (id, likes) => {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  };

  render() {
    console.log(this.props.lyrics);
    return (
      <ul className="collection">
        {this.props.lyrics.map(({ content, id, likes }) => (
          <li className="collection-item" key={id}>
            {content}
            <div className="vote-box">
              <i
                onClick={() => this.onLike(id, likes)}
                className="material-icons"
              >
                thumb_up
              </i>
              {likes}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default graphql(likeLyricQuery)(LyricList);
