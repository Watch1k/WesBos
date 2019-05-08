import Items from './items';

const Home = (props) => {
  return (
    <div>
      <Items page={props.query.page}/>
    </div>
  );
};

export default Home;