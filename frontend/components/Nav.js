import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'

const list = ['Items', 'Sell', 'Signup', 'Orders', 'Me']

const Nav = () => {
  return (
    <NavStyles>
      <User>
        {({ data }) => data.me ? <p>{data.me.name}</p> : null}
      </User>
      {list.map(value => (
        <Link key={value} href={`/${value.toLowerCase()}`}>
          <a>{value}</a>
        </Link>
      ))}
    </NavStyles>
  )
}

export default Nav
