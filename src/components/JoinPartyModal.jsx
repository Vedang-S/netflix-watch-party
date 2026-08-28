import React, { useState } from 'react';
import './JoinPartyModal.css';

const RECENT_INVITES = [
  {
    id: '1',
    title: 'Stranger Thing...',
    status: 'Starting in 10 mins',
    hostName: 'Elena R.',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    poster: '../../public/strangerthings.webp',
  },
  {
    id: '2',
    title: 'The Witcher',
    status: 'Started 5 mins ago',
    hostName: 'Marcus T.',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    poster: '../../public/thewitcher.png',
  },
];

export default function JoinPartyModal({ isOpen = true, onClose, onJoin }) {
  const [partyCode, setPartyCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (partyCode.trim()) {
      onJoin?.(partyCode.trim());
    }
  };

  return (
    <div className="jpm-backdrop" onClick={onClose}>
      <div className="jpm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="jpm-header">
          <h2 className="jpm-title">Join a Watch Party</h2>
          <button className="jpm-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="jpm-body">
          {/* Party Code Form */}
          <form className="jpm-form" onSubmit={handleSubmit}>
            <label className="jpm-label">Party Code / Invite Link</label>
            <div className="jpm-input-row">
              <input
                type="text"
                className="jpm-input"
                placeholder="e.g. https://netflix.com/party/1234 or Code"
                value={partyCode}
                onChange={(e) => setPartyCode(e.target.value)}
              />
              <button type="submit" className="jpm-submit-btn">
                Join Party
              </button>
            </div>
          </form>

          {/* Recently Invited Section */}
          <div className="jpm-recent-section">
            <h3 className="jpm-subtitle">Recently Invited</h3>
            <div className="jpm-cards-grid">
              {RECENT_INVITES.map((invite) => (
                <div key={invite.id} className="jpm-card">
                  <img src={invite.poster} alt={invite.title} className="jpm-card-poster" />
                  <div className="jpm-card-details">
                    <h4 className="jpm-card-title">{invite.title}</h4>
                    <span className="jpm-card-status">{invite.status}</span>
                    <div className="jpm-card-footer">
                      <div className="jpm-host-info">
                        <img src={invite.hostAvatar} alt={invite.hostName} className="jpm-host-avatar" />
                        <span className="jpm-host-name">{invite.hostName}</span>
                      </div>
                      <button className="jpm-card-join-btn" onClick={() => onJoin?.(invite.id)}>
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="jpm-footer">
          <button className="jpm-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}