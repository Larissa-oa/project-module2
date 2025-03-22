import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FoodPage from './assets/pages/FoodPage'
import SocialPage from './assets/pages/SocialPage'
import AboutPage from './assets/pages/AboutPage'
import NotFoundPage from './assets/pages/NotFoundPage'


function App() {

  return (
    <>
    <Navbar />
      <Routes>
      <Route path = "/" element={<HomePage />} />
      <Route path ="food" element={<FoodPage />} />
      <Route path ="/socialpage" element={<SocialPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage/>} />
      </Routes>
   <Footer />
    </>
  )
}

export default App
