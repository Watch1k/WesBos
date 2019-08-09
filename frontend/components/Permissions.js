import React from 'react'
import { Mutation, Query } from 'react-apollo'
import ErrorMessage from './ErrorMessage'
import gql from 'graphql-tag'
import Table from './styles/Table'
import SickButton from './styles/SickButton'
import PropTypes from 'prop-types'

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
]

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions:  [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <ErrorMessage error={error} />
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
              <th>👇🏻</th>
            </tr>
            </thead>
            <tbody>{data.users.map(user => <UserPermissions user={user} key={user.id} />)}</tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
)

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  }
  state = {
    permissions: this.props.user.permissions,
  }

  onChange = (e) => {
    const { checked, value } = e.target
    let permissions = [...this.state.permissions]
    if (checked) {
      permissions.push(value)
    } else {
      permissions = permissions.filter(permission => permission !== value)
    }
    this.setState({ permissions })
  }

  render() {
    const { name, email, id } = this.props.user
    const { permissions } = this.state
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: permissions,
          userId: id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && <tr><td colSpan="9"><ErrorMessage error={error} /></td></tr>}
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${id}-permission-${permission}`}>
                    <input
                      id={`${id}-permission-${permission}`}
                      type="checkbox"
                      value={permission}
                      checked={permissions.includes(permission)}
                      onChange={this.onChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Updat{loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    )
  }
}

export default Permissions
