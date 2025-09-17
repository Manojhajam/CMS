import React from 'react'
import {Router, Routes, BrowserRouter} from 'react-router'
import LandingPage from './Pages/LandingPage'
import PageRoutes from './routes/Routes'

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes/>
    </BrowserRouter>
  )
}

export default App
