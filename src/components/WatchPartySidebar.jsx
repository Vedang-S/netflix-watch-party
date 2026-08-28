import React, { useState } from 'react';
import CreatePollModal from './CreatePollModal';
import './WatchPartySidebar.css';

/* ─── SVG Icons ─────────────────────────────────────────── */
const CrownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#E50914">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
);

const InvitePersonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="17" y1="11" x2="23" y2="11" />
  </svg>
);

const UpArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 22H4a2 2 0 0 1-2-2V6" />
    <rect x="6" y="2" width="16" height="16" rx="2" />
    <circle cx="11" cy="7" r="1.5" />
    <path d="M22 13l-3.5-3.5a1.5 1.5 0 0 0-2.12 0L10 16" />
  </svg>
);

const GifIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="8.5" cy="9" r="1" fill="currentColor" />
    <circle cx="15.5" cy="9" r="1" fill="currentColor" />
    <path d="M8 15h8v2H12v-2" />
  </svg>
);

const PollIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="4" x2="4" y2="20" />
    <line x1="8" y1="7" x2="20" y2="7" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="17" x2="18" y2="17" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="5" x2="12" y2="19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="12" x2="19" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* Fallback Avatar Component */
const DefaultAvatar = ({ person, size = 40 }) => {
  const imgSrc = person?.avatar || person?.img || person?.image;
  if (imgSrc) {
    return <img src={imgSrc} alt={person?.name || 'User'} className="rs-avatar-img" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  }
  return (
    <div className="rs-avatar-fallback" style={{ width: size, height: size, borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.45, fontWeight: '700' }}>
      {person?.name ? person.name.charAt(0).toUpperCase() : 'U'}
    </div>
  );
};

export default function WatchPartySidebar({
  isOpen = true,
  onClose,
  people = [],
  messages = [],
  onSendMessage,
  onCreatePoll,
  onInvite,
  onPlayTopChoice,
  initialTab = 'people',
  AvatarComponent = DefaultAvatar
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [chatInput, setChatInput] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!chatInput.trim()) return;
    onSendMessage?.(chatInput.trim());
    setChatInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const Avatar = AvatarComponent;

  return (
    <>
      <aside className="rs-sidebar">
        
        {/* Navigation Tabs */}
        <div className="rs-tabs">
          <button
            className={`rs-tab ${activeTab === 'people' ? 'rs-tab-active' : ''}`}
            onClick={() => setActiveTab('people')}
          >
            People ({people.length})
          </button>
          <button
            className={`rs-tab ${activeTab === 'chat' ? 'rs-tab-active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
        </div>

        {/* ── PEOPLE TAB ── */}
        {activeTab === 'people' && (
          <div className="rs-people-content">
            <div className="rs-people-list">
              {people.map((p, i) => (
                <div key={p.id || i} className="rs-person">
                  <div className="rs-avatar-wrapper">
                    <Avatar person={p} size={42} />
                    <span className="rs-online-dot" />
                  </div>
                  <div className="rs-person-info">
                    <span className="rs-person-name">{p.name}</span>
                    <span className="rs-person-status">
                      {p.isHost ? (
                        <span className="rs-host-label">
                          <CrownIcon /> Host
                        </span>
                      ) : (
                        'Online'
                      )}
                    </span>
                  </div>
                </div>
              ))}

              {/* Invite Action */}
              <div className="rs-person rs-invite-btn" onClick={onInvite}>
                <div className="rs-invite-icon">
                  <InvitePersonIcon />
                </div>
                <span className="rs-invite-text">Invite more people</span>
              </div>
            </div>            
          </div>
        )}

        {/* ── CHAT TAB ── */}
        {activeTab === 'chat' && (
          <div className="rs-chat-container">
            <div className="rs-chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`rs-chat-msg ${msg.isYou ? 'rs-chat-you' : ''}`}>
  {/* Left Avatar for other users */}
  {!msg.isYou && (
    <div className="rs-chat-avatar-wrapper">
      <Avatar person={msg} size={36} />
      <span className="rs-online-dot" />
    </div>
  )}

  {/* Message Wrap */}
  <div className="rs-chat-bubble-wrap">
    <span className="rs-chat-sender">{msg.isYou ? 'You' : msg.sender}</span>
    <div className={`rs-chat-bubble ${msg.isYou ? 'rs-bubble-you' : 'rs-bubble-other'}`}>
      {msg.text}
    </div>
  </div>

  {/* Right Avatar for 'You' */}
  {msg.isYou && (
    <div className="rs-chat-avatar-wrapper">
      <Avatar person={msg} size={36} />
      <span className="rs-online-dot" />
    </div>
  )}
</div>
              ))}
            </div>

            {/* Input Row */}
            <div className="rs-chat-input-row">
              <div className="rs-chat-input-container">
                <input
                  className="rs-chat-input"
                  type="text"
                  placeholder="Type a message...."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                {/* Attachment Popup Menu */}
                {showAttachmentMenu && (
                  <div className="rs-attachment-menu">
                    <button
                      className="rs-menu-item"
                      onClick={() => {
                        setShowAttachmentMenu(false);
                      }}
                    >
                      <ImageIcon />
                      <span>Image</span>
                    </button>

                    <button
                      className="rs-menu-item"
                      onClick={() => {
                        setShowAttachmentMenu(false);
                      }}
                    >
                      <GifIcon />
                      <span>GIF</span>
                    </button>

                    <button
                      className="rs-menu-item"
                      onClick={() => {
                        setShowAttachmentMenu(false);
                        setIsPollModalOpen(true);
                      }}
                    >
                      <PollIcon />
                      <span>Poll</span>
                    </button>
                  </div>
                )}

                {/* Attachment Menu Toggle */}
                <button
                  className="rs-chat-add-btn"
                  onClick={() => setShowAttachmentMenu((prev) => !prev)}
                  aria-label="Add Attachment"
                >
                  <PlusIcon />
                </button>
              </div>

              {/* Send Button */}
              <button className="rs-chat-send" onClick={handleSend} aria-label="Send message">
                <SendIcon />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Create Poll Modal */}
      <CreatePollModal
        isOpen={isPollModalOpen}
        onClose={() => setIsPollModalOpen(false)}
        onCreatePoll={(pollData) => {
          onCreatePoll?.(pollData);
          setIsPollModalOpen(false);
        }}
      />
    </>
  );
}