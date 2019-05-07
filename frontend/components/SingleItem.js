import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

class SingleItem extends Component {
  render() {
    const { id } = this.props;
    console.log(id);

    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{ id }}
      >
        {(error, loading, data) => {
          if (error) return <ErrorMessage error={error}/>;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found</p>;

          return (
            <div>
              <p>single item component</p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
