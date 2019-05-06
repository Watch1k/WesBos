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
    image: '',
    largeImage: '',
    price: 300,
    imageLoading: false,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number'
      ? value ? parseFloat(value) : ''
      : value;

    this.setState({ [name]: val });
  };

  uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    this.setState({ imageLoading: true });
    const res = await fetch('http://api.cloudinary.com/v1_1/dwr3og8hq/image/upload/', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      imageLoading: false,
    });
  };

  render() {
    const { imageLoading } = this.state;

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
            <fieldset disabled={loading || imageLoading} aria-busy={loading || imageLoading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {imageLoading && 'Loading...'}
                {this.state.image && <img src={this.state.image} width="200" alt="Upload Preview"/>}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
