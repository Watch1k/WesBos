import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    const { id } = payload.data.deleteItem;
    const query = ALL_ITEMS_QUERY;
    const data = cache.readQuery({ query });

    data.items = data.items.filter(item => item.id !== id);

    cache.writeQuery({
      query,
      data,
    });
  };

  render() {
    const { children, id } = this.props;

    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.update}
      >
        {(deleteItem, { error }) => {
          if (error) return <ErrorMessage error={error}/>;

          return (
            <button onClick={() => {
              if (confirm('Are u sure?')) deleteItem();
            }}>
              {children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
