import React from 'react';
import './HowItWorksModal.css';

const STEPS = [
  {
    id: 'create',
    title: 'Create or join a party',
    description: 'Start your own room or use an invite link to join an existing one.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="17" y1="11" x2="23" y2="11" />
      </svg>
    ),
  },
  {
    id: 'invite',
    title: 'Invite your friends',
    description: 'Share the unique room link with anyone you want to watch with.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
        <circle cx="12" cy="7" r="4" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    id: 'vote',
    title: 'Vote on what to watch',
    description: 'Everyone can suggest titles and vote to decide the lineup.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    id: 'sync',
    title: 'Watch together in sync',
    description: 'Playback is synced for everyone. Chat and react in real time.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
      </svg>
    ),
  },
];

export default function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="hiw-backdrop" onClick={onClose}>
      <div className="hiw-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="hiw-header">
          <h2 className="hiw-title">How Watch Together works</h2>
          <button className="hiw-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Steps List */}
        <div className="hiw-content">
          {STEPS.map((step) => (
            <div key={step.id} className="hiw-step">
              <div className="hiw-icon-box">{step.icon}</div>
              <div className="hiw-step-info">
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="hiw-footer">
          <button className="hiw-gotit-btn" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}