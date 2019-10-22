import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import User, { CURRENT_USER_QUERY } from './User'
import { Mutation } from 'react-apollo'
import StripeCheckout from 'react-stripe-checkout'
import calcTotalPrice from '../lib/calcTotalPrice'
import gql from 'graphql-tag'

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            change
            total
            items {
                id
                title
            }
        }
    }
`

const totalItems = cart => cart.reduce((tally, item) => tally + item.quantity, 0)

class TakeMyMoney extends React.Component {
  onToken = (res, createOrder) => {
    createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => alert(err.message))
  }

  render() {
    return (
      <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(createOrder) => (
          <User>
            {({ data: { me } }) => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="Sick Fits"
                description={`Order of ${totalItems(me.cart)}`}
                image={me.cart[0].item && me.cart[0].item.image}
                stripeKey="pk_test_8A42uZZSYk2hp2RIiTFSV1iD00nTZ3lXxu"
                currency="USD"
                token={res => this.onToken(res, createOrder)}
              >{this.props.children}</StripeCheckout>
            )}
          </User>
        )}
      </Mutation>
    )
  }
}

export default TakeMyMoney