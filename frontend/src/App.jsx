import React from 'react'
import { useEffect } from 'react'
import './App.css'
import { useApplicationsStore } from './store/useApplicationsStore'
import Profile from './pages/profile/profile'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard'
const App = () => {
  

  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
