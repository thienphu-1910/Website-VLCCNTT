import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthenticated(user ? true : false);
    })    
  }, [])

  return (
    authenticated ? <Outlet />: <Navigate to="/" replace />
  );
}

export default ProtectedRoute;