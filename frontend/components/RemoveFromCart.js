import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  display: block;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  update = (cache, payload) => {
    const { id } = payload.data.removeFromCart
    const query = CURRENT_USER_QUERY
    const data = cache.readQuery({ query })

    data.me.cart = data.me.cart.filter(item => item.id !== id)

    cache.writeQuery({
      query,
      data,
    })
  }

  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: this.props.id,
          },
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <BigButton
            disabled={loading} title="Delete Item"
            onClick={() => removeFromCart().catch((err) => alert(err.message))}
          >&times;</BigButton>)}
      </Mutation>
    )
  }
}

export default RemoveFromCart
