import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }

  state = {
    password: '',
    confirmPassword: '',
  }

  onChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { password, confirmPassword } = this.state
    const { resetToken } = this.props
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken,
          password,
          confirmPassword,
        }}
        refetchQueries={[{
          query: CURRENT_USER_QUERY,
        }]}
      >
        {(reset, { error, loading }) => (
          <Form method="post" onSubmit={async e => {
            e.preventDefault()
            await reset()
            this.setState({
              password: '',
              confirmPassword: '',
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Password reset</h2>
              <ErrorMessage error={error}/>
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
              <label htmlFor="confirmPassword">
                Confirm password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={this.onChange}
                />
              </label>

              <button type="submit">Reset your password!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Reset
