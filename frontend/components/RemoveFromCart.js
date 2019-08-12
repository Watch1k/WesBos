import React from 'react'
import styled from 'styled-components'

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  display: block;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`

class RemoveFromCart extends React.Component {
  render() {
    return (
      <BigButton title="Delete Item">&times;</BigButton>
    )
  }
}

export default RemoveFromCart
