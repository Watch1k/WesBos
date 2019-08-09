import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import { TOGGLE_CART_MUTATION } from './Cart'
import { Mutation } from 'react-apollo'

const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <Link key="items" href="/items">
            <a>Shop</a>
          </Link>
          {me
            ? (
              <>
                <Link key="sell" href="/sell">
                  <a>Sell</a>
                </Link>
                <Link key="orders" href="/orders">
                  <a>Orders</a>
                </Link>
                <Link key="me" href="/me">
                  <a>Account</a>
                </Link>
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {(toggleCart) => (
                    <button onClick={toggleCart}>My Cart</button>
                  )}
                </Mutation>
              </>
            )
            : (
              <Link key="signup" href="/signup">
                <a>Sign In</a>
              </Link>
            )}
          {me && <Signout />}
        </NavStyles>
      )}
    </User>
  )
}

export default Nav
