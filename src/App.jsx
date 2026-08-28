import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PartyEntry from './pages/PartyEntry'
import WatchingPage from './pages/WatchingPage'
import ReactionScreen from './pages/ReactionScreen'
import SessionWrapUp from './pages/SessionWrapUp'
import './App.css'

function WhatAreWeWatching() {
  return (
    <div className="page" style={{ padding: '40px', color: 'white' }}>
      <h1>What Are We Watching?</h1>
      <p>Select a title or lobby room to start watching together.</p>
      <Link to="/" style={{ color: '#E50914', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Back to Entry Page
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PartyEntry />} />
        <Route path="/what-are-we-watching" element={<WatchingPage />} />
        <Route path="/reaction-screen" element={<ReactionScreen />} />
        <Route path="/session-wrap-up" element={<SessionWrapUp />} />
      </Routes>
    </BrowserRouter>
  )
}