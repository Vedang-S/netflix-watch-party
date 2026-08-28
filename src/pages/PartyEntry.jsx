import React, { useState } from 'react'
import './PartyEntry.css'
import CreatePartyModal from '../components/CreatePartyModal'
import InviteCrewModal from '../components/InviteCrewModal'
import JoinPartyModal from '../components/JoinPartyModal'
import HowItWorksModal from '../components/HowItWorksModal';
import { useNavigate } from 'react-router-dom'

const SearchIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1.8"/>
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const BellIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10a7 7 0 0 1 14 0v4l2 2H3l2-2v-4Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M10 19a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.8"/>
  </svg>
)

const PeopleIcon = () => (
  <svg className="btn-icon" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="3.5" stroke="white" strokeWidth="1.6"/>
    <path d="M2 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M15 7c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M17.5 14c1.933 0 3.5 1.567 3.5 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)

const LinkIcon = () => (
  <svg className="btn-icon" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 9a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const InfoIcon = () => (
  <svg className="info-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8.5" stroke="#b0b0b0" strokeWidth="1.5"/>
    <path d="M10 9v5" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="6.5" r="0.75" fill="#b0b0b0"/>
  </svg>
)

export default function PartyEntry() {
  const navigate = useNavigate()
  const [modalStep, setModalStep] = useState(null)
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [partyData, setPartyData] = useState(null)

  const handleOpenCreateModal = () => {
    setModalStep('create')
  }

  const handleCreateSubmit = (formData) => {
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString()
    const newPartyData = {
      ...formData,
      partyCode: generatedCode,
      shareUrl: `netflix.com/party/${generatedCode}`
    }

    setPartyData(newPartyData)
    setModalStep('invite') // Step forward to Invite modal
  }

  const handleGoToParty = () => {
    setModalStep(null)
    navigate('/what-are-we-watching', { state: partyData })
  }

  const handleCloseModal = () => {
    setModalStep(null)
  }

  return (
    <div className="page">
      {/* Background photo — right side of screen */}
      <div className="bg-image" />
      {/* Bottom-to-top dark gradient so the banner area reads cleanly */}
      <div className="bg-fade-bottom" />

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="netflix-logo" aria-label="Netflix" />
          <div className="nav-links">
            <a className="nav-link">Home</a>
            <a className="nav-link">TV Shows</a>
            <a className="nav-link">Movies</a>
            <a className="nav-link">New &amp; Popular</a>
            <a className="nav-link">My List</a>
            <a className="nav-link">Browse by Languages</a>
            <div className="nav-pill">
              <span className="new-tag">NEW</span>
              Watch Party
            </div>
          </div>
        </div>
        <div className="nav-right">
          <SearchIcon />
          <BellIcon />
          <div className="profile-square" />
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="hero">
        {/* small label row */}
        <div className="hero-label">
          <div className="n-logo" aria-label="Netflix N" />
          <span className="hero-label-text">Watch Party</span>
        </div>

        <h1 className="hero-title">
          Watch Together.<br />Anywhere.
        </h1>

        <p className="hero-subtitle">
          Create or join a Watch Party to decide,<br />
          watch, and react together in real time
        </p>

        <div className="hero-buttons">
          <button className="btn btn-create" onClick={handleOpenCreateModal}>
            <PeopleIcon />
            Create a Watch Party
          </button>
          <button className="btn btn-join" onClick={() => setModalStep('join')}>
            <LinkIcon />
            Join a Watch Party
          </button>
        </div>

      
        <button className="how-it-works" onClick={() => setIsHowItWorksOpen(true)}>
          How does it work? <InfoIcon />
        </button>
      </main>

      {/* ── Bottom Banner ── */}
      <section className="banner-section">
        <div className="banner-image" role="img" aria-label="Now on your phone" />
      </section>

      {/* ── Modal Component ── */}
      <CreatePartyModal 
        isOpen={modalStep === 'create'} 
        onClose={handleCloseModal} 
        onSubmit={handleCreateSubmit} 
      />
      <InviteCrewModal
        isOpen={modalStep === 'invite'}
        onClose={handleCloseModal}
        onGoToParty={handleGoToParty}
        shareUrl={partyData?.shareUrl}
        partyCode={partyData?.partyCode}
      />
      <JoinPartyModal
        isOpen={modalStep === 'join'}
        onClose={handleCloseModal}
        onJoin={(partyCode) => {
          navigate('/what-are-we-watching', { state: { partyCode } })
        }}  
      />
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  )
}