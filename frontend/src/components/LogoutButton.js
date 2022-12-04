import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


const LogoutButton = () => {
    const { logout } = useAuth0();
  return (
    <button type="button" class="btn btn-dark" onClick={() => logout()}>
    Log out
    </button>   
  )
}

export default LogoutButton