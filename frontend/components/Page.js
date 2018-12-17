import React, { Component } from 'react';
import Header from './Header';
import styled from 'styled-components';

const StyledPage = styled.div`
  border: 1px solid red;
`;

class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Header/>
        {this.props.children}
      </StyledPage>
    );
  }
}

export default Page;
