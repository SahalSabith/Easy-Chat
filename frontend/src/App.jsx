import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Pages/Home/Home'
import Header from './assets/components/Header/Header';
import Login from './assets/Pages/Login/Login';
import Register from './assets/Pages/Login/Register';
import Profile from './assets/Pages/Profile/Profile';

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default App
