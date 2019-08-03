import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Item from '../components/Item'
import Pagination from './Pagination'
import { perPage } from '../config'

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(first: $first, skip: $skip, orderBy: id_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 60px;
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page}/>
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: (this.props.page - 1) * perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            if (!data.items) return null;
            return (
              <ItemsList>
                {data.items.map(item => <Item item={item} key={item.id}/>)}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page}/>
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
