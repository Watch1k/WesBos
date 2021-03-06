import React from 'react'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
  }
  .count-enter {
    transform: scaleY(0) scaleX(0.5);
  }
  .count-enter-active {
    transform: scaleY(1) scaleX(1);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: scaleY(1) scaleX(1);
  }
  .count-exit-active {
    transform: scaleY(0) scaleX(0.5);
  }
`

const Dot = styled.div`
  background: ${props => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>
          {count}
        </Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
)

CartCount.propTypes = {}

export default CartCount
