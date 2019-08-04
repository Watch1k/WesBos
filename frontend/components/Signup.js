import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`

class Signup extends Component {
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
    const { password, email, name } = this.state

    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{
          query: CURRENT_USER_QUERY
        }]}
      >
        {(signup, { error, loading }) => (
          <Form method="post" onSubmit={async e => {
            e.preventDefault()
            signup()
            this.setState({
              name: '',
              password: '',
              email: '',
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up For An Account</h2>
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
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
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

              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signup
