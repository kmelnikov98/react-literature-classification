import './App.css';
import { Route, Routes } from "react-router-dom";
import Profile from './views/Profile';
import Home from './views/Home';
import ExternalApi from './views/ExternalApi';
import NavBar from './components/nav-bar';
import { useAuth0 } from '@auth0/auth0-react'
import ProtectedRoute from './auth/protected-route';
import { useEffect } from 'react';

function App() {
  const { isLoading, user } = useAuth0()
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if(!user) {
        return
    }

    storeUserProfile();
  });

const storeUserProfile = async () => {
    if(!user) {
        return
    }

    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
    };

    try {
    const response = await fetch(`${serverUrl}/api/user/add-user`, requestOptions);
    const responseData = await response.json();
    console.log(responseData)
    } catch (error) {
        console.log(error)
    }
}

  if (isLoading) {
    return <div> Loading ... </div> // can return component here instead
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Routes> {/* switch is used to render one view at a time; if no switch, then they all render at once */}
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/external-api" element={
            <ProtectedRoute user={user}>
              <ExternalApi />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
