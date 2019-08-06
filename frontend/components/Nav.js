import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'

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
                </Link></>
            )
            : (
              <Link key="signup" href="/signup">
                <a>Sign In</a>
              </Link>
            )}
          {me && <Signout/>}
        </NavStyles>
      )}
    </User>
  )
}

export default Nav
