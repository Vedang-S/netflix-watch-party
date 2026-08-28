import React, { useState } from 'react'
import './CreatePartyModal.css'

// Inline SVG Icons
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const PartyIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="#b0b0b0" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.8 11.3 2 22l10.7-3.8Z" />
    <path d="M4 3h.01M9 6h.01M15 2h.01M20 8h.01M17 14h.01" strokeWidth="2.5" />
    <path d="m13 8 5-5M11 15l8-4" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="#b0b0b0" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="#b0b0b0" strokeWidth="2" fill="none">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function CreateWatchPartyModal({ isOpen, onClose, onSubmit }) {
  const [partyName, setPartyName] = useState('')
  const [privacy, setPrivacy] = useState('private')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ partyName, privacy, description })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h2>Create a Watch Party</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            
            {/* Party Name */}
            <div className="form-group">
              <label htmlFor="partyName">Party Name</label>
              <div className="input-wrapper">
                <span className="input-icon"><PartyIcon /></span>
                <input
                  id="partyName"
                  type="text"
                  placeholder="e.g. Friday Movie Night"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                />
              </div>
            </div>

            {/* Who Can Join */}
            <div className="form-group">
              <label htmlFor="privacy">Who can join?</label>
              <div className="input-wrapper select-wrapper">
                <span className="input-icon"><LockIcon /></span>
                <select
                  id="privacy"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <option value="private">Private - Invite Only</option>
                  <option value="public">Public - Anyone with link</option>
                  <option value="friends">Friends Only</option>
                </select>
                <span className="select-arrow"><ChevronDownIcon /></span>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                Description <span className="label-optional">(Optional)</span>
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="What are we watching?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-continue">
              Continue <ArrowRightIcon />
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}