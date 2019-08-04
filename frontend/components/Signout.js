import React from 'react'
import { Mutation } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import gql from 'graphql-tag'

const SIGNOUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`

const Signout = () => {
  return (
    <Mutation
      mutation={SIGNOUT_MUTATION}
      refetchQueries={[{
        query: CURRENT_USER_QUERY,
      }]}
    >
      {(signout) => (
        <button onClick={signout}>
          Sign Out
        </button>
      )}
    </Mutation>
  )
}

export default Signout
