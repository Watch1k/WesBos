import React from 'react'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import CartStyles from './styles/CartStyles'
import SickButton from './styles/SickButton'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import User from './User'

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`

const Cart = () => (
  <User>
    {({ data: { me } }) => {
      if (!me) return null
      console.log(me)
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {(toggleCart) => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <CloseButton
                      title="close"
                      onClick={toggleCart}
                    >&times;</CloseButton>
                    <Supreme>Your Cart</Supreme>
                    <p>You have {me.cart.length} item{me.cart.length === 1 ? '' : 's'} in your cart</p>
                  </header>
                  <ul>
                    {me.cart.map(cartItem => <li key={cartItem.id}>{cartItem.id}</li>)}
                  </ul>
                  <footer>
                    <p>$10.10</p>
                    <SickButton>Checkout</SickButton>
                  </footer>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>
      )
    }}
  </User>
)

export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
