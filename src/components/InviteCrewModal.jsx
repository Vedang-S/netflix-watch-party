import React, { useState } from 'react'
import './InviteCrewModal.css'

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function InviteCrewModal({ 
  isOpen = true, 
  onClose, 
  onGoToParty, 
  shareUrl = "netflix.com/party/x7y9...", 
  partyCode = "8492" 
}) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(partyCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="invite-overlay" onClick={onClose}>
      <div className="invite-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="invite-header">
          <h2>Invite your crew</h2>
          <p>Share the link or code to watch together in sync.</p>
        </div>

        {/* Content Body */}
        <div className="invite-body">
          
          {/* Share Link Section */}
          <div className="invite-section">
            <label className="invite-label">Share Link</label>
            <div className="link-input-wrapper">
              <span className="link-text">{shareUrl}</span>
              <button 
                type="button" 
                className={`btn-copy-link ${copiedLink ? 'copied' : ''}`}
                onClick={handleCopyLink}
              >
                {copiedLink ? <CheckIcon /> : <CopyIcon />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Party Code Section */}
          <div className="invite-section">
            <label className="invite-label">Party Code</label>
            <div className="code-row">
              <div className="code-display-box">
                <span className="code-value">{partyCode}</span>
              </div>
              <button 
                type="button" 
                className={`btn-copy-code ${copiedCode ? 'copied' : ''}`}
                onClick={handleCopyCode}
                aria-label="Copy Party Code"
              >
                {copiedCode ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="invite-footer">
          <button type="button" className="btn-invite-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-go-party" onClick={onGoToParty}>
            Go to Party <ArrowRightIcon />
          </button>
        </div>

      </div>
    </div>
  )
}