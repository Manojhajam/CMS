import React from 'react'
import {Router, Routes, BrowserRouter} from 'react-router'
import AuthProvider from './context/authContext'
import PageRoutes from './routes/Routes'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
