import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
        <button type="button" className="btn btn-light me-2" onClick={() => loginWithRedirect()}>
            Log In
        </button>
    )
  )
}

export default LoginButton