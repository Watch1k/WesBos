import React, { Component } from 'react';
import Header from './Header';

const StyledPage = styled.div`
  
`;

class Page extends Component {
  render() {
    return (
      <>
        <Header/>
        {this.props.children}
      </>
    );
  }
}

export default Page;
