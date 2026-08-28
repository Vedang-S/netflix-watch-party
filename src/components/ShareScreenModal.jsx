import React, { useState } from 'react';
import './ShareScreenModal.css';

const OPTIONS = [
  {
    id: 'entire',
    title: 'Your Entire Screen',
    description: 'Share everything on your active display.',
  },
  {
    id: 'window',
    title: 'Application Window',
    description: 'Choose a specific app to share.',
  },
  {
    id: 'tab',
    title: 'Browser Tab',
    description: 'Share a single tab for privacy.',
  },
];

export default function ShareScreenModal({ isOpen = true, onClose, onStartShare }) {
  const [selectedId, setSelectedId] = useState('entire');

  if (!isOpen) return null;

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="share-modal-header">
          <h2>Share your screen</h2>
          <button className="share-modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Options List */}
        <div className="share-modal-body">
          {OPTIONS.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <div
                key={option.id}
                className={`share-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedId(option.id)}
              >
                <div className="share-option-thumbnail">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/739b/19c5/ba7ba99e721768aa7da19feceb1b2e61?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t2vTZgz7LM-fMb8f4mwzbEijdXjAta519zkIsUJV5lT6ihdf5aIdOK2ZJ6J8G5Cv4TSQOioWerH7Xo8Ca5R4TGYinJefYIN57Hm1KHCMuKfSlU6S8u3~4IM2QhWG02Al42iFhprJp6VSQXnW2n1LkwKHKLy2Yg5YnyTLkoDituHdK6547p~vMvPP3YAfkkI-uO8DvCPtn0DedPVIThjpqGUnOAIwb6yEzV59HRe2ek-VtMrCLVcFi7Zx0XH-~RoigftS3dyM5Oo3zrm5-b7pOiP3xvb5w4ZzfH0RnubdJjLlgkvrOTWfqb4oC9DvP8w4BJZkxxmygezQKxB~TnyIbg__"
                    alt={option.title}
                  />
                </div>
                <div className="share-option-info">
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </div>
                {isSelected && (
                  <div className="share-option-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="share-modal-footer">
          <button className="share-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="share-btn-submit" onClick={() => onStartShare?.(selectedId)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="3" width="20" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M10 7.5l5 3.5-5 3.5v-7z" />
              <path d="M8 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Start Sharing
          </button>
        </div>
      </div>
    </div>
  );
}