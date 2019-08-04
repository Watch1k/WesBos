import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'

const list = [
  { name: 'Shop', url: 'items' },
  { name: 'Sell', url: 'sell' },
  { name: 'Sign Up', url: 'signup' },
  { name: 'Orders', url: 'orders' },
  { name: 'Account', url: 'me' },
  { name: 'Sign In', url: 'signup' },
]

const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          {list.map(({ name, url },
                     index) => {
            if (index === 0 || !me && index === list.length - 1 || me && index < list.length - 1) {
              return (
                <Link key={url} href={`/${url}`}>
                  <a>{name}</a>
                </Link>
              )
            } else {
              return null
            }
          })}
        </NavStyles>
      )}
    </User>
  )
}

export default Nav
