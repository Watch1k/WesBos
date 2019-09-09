import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import User from './User'
import StripeCheckout from 'react-stripe-checkout'
import calcTotalPrice from '../lib/calcTotalPrice'

const totalItems = cart => cart.reduce((tally, item) => tally + item.quantity, 0)

class TakeMyMoney extends React.Component {
  onToken = res => console.log('On Token!', res)

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(me.cart)}`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_Oy1r98mxqsDBoXUecLY7IXdJ00BKbppZZt"
            currency="USD"
            token={res => this.onToken(res)}
          >{this.props.children}</StripeCheckout>
        )}
      </User>
    )
  }
}

export default TakeMyMoney