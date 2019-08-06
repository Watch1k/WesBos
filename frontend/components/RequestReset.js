import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

class RequestReset extends Component {
  state = {
    email: '',
  }

  onChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email } = this.state

    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
        refetchQueries={[{
          query: CURRENT_USER_QUERY,
        }]}
      >
        {(reset, { error, loading, called }) => (
          <Form method="post" onSubmit={async e => {
            e.preventDefault()
            await reset()
            this.setState({ email: '' })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              <ErrorMessage error={error}/>
              {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={this.onChange}
                />
              </label>

              <button type="submit">Request Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default RequestReset
