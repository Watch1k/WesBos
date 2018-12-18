import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const list = ['Items', 'Sell', 'Signup', 'Orders', 'Me'];

const Nav = () => {
  return (
    <NavStyles>
      {list.map(value => (
        <Link key={value} href={`/${value.toLowerCase()}`}>
          <a>{value}</a>
        </Link>
      ))}
    </NavStyles>
  );
};

export default Nav;
