import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Head from 'next/head'
import { format } from 'date-fns'
import ErrorMessage from './ErrorMessage'
import formatMoney from '../lib/formatMoney'
import OrderStyles from './styles/OrderStyles'

const SINGLE_ORDER_QUERY = gql(`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id 
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`)

class Order extends Component {
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{
        id: this.props.id,
      }}>
        {({ data, error, loading }) => {
          if (error) return <ErrorMessage error={error}/>
          if (loading) return <p>Loading...</p>
          const order = data.order
          return (
            <OrderStyles data-test="order">
              <Head>
                <title>Sick Fits - Order {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span>{this.props.id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a', { awareOfUnicodeTokens: true })}</span>
              </p>
              <p>
                <span>Order Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title}/>
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Qty: {item.quantity}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          )
        }}
      </Query>
    )
  }
}

Order.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Order