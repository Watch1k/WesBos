import React, { Component } from 'react';
import Form from './styles/Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!,
    $description: String!,
    $price: Int!,
    $image: String,
    $largeImage: String
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      }
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Cool title',
    description: 'Cool desc',
    image: 'dog.jpg',
    largeImage: 'large-dog.jpg',
    price: 300,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number'
      ? value ? parseFloat(value) : ''
      : value;

    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(mutationFn, { loading, error }) => (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            const res = await mutationFn();
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id },
            });
          }}>
            <ErrorMessage error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}/>
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}/>
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}/>
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };