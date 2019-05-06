import React, { Component } from 'react';
import Form from './styles/Form';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!,
    $description: String!,
    $price: Int!,
  ) {
    updateItem(
      data: {
        title: $title
        description: $description
        price: $price
      },
      where: {
        id: $id
      },
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number'
      ? value ? parseFloat(value) : ''
      : value;

    this.setState({ [name]: val });
  };

  render() {
    const { imageLoading } = this.state;

    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id,
      }}>
        {({data, loading}) => {
          if (loading) return <p>Loading...</p>;

          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={this.state}
            >
              {(mutationFn, { loading, error }) => (
                <Form onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await mutationFn();
                  Router.push({
                    pathname: '/item',
                    query: { id: res.data.updateItem.id },
                  });
                }}>
                  <ErrorMessage error={error}/>
                  <fieldset disabled={loading || imageLoading} aria-busy={loading || imageLoading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.item.price}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>

                    <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
