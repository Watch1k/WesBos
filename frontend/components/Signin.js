import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  }

  onChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { password, email } = this.state

    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{
          query: CURRENT_USER_QUERY
        }]}
      >
        {(signin, { error, loading }) => (
          <Form method="post" onSubmit={async e => {
            e.preventDefault()
            signin()
            this.setState({
              name: '',
              password: '',
              email: '',
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Into Your Account</h2>
              <ErrorMessage error={error}/>
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
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this.onChange}
                />
              </label>

              <button type="submit">Sign In!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signin
