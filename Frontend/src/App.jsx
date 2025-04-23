import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="w-ful shadow-md">
        <Header />
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center">
        {/* Render the Outlet */}
        <Outlet />
      </main>
      
      {/* Footer */}
      
        <Footer />
      
    </div>
  ) : null;
  
}

export default App
