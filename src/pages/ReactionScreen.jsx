import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ReactionScreen.css'
import ShareScreenModal from '../components/ShareScreenModal';
import CreatePollModal from '../components/CreatePollModal';
import WatchPartySidebar from '../components/WatchPartySidebar';

/* ─── Avatar images (reuse from design) ──────────────────── */
const AVATAR_IMGS = {
  you: 'https://s3-alpha-sig.figma.com/img/0bde/0426/1a9be8954dd84bcd7817f414e18f86ba?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p~6J8YTvbpTGztFsQqX3L2U4UJCVJwGw~pL8k-y3l6pb5jsxLCRBM9IzsJDK6kqi0CxQdnDo4GuNNcMj9KnVCoRGMqTZesXlPwbhiHsp6iy22x8iWdWa~vsiBrvOs7h5GR8kuyKEkPtZrwcH4fAwz1w3bXq6ng94w7iFdOODRp8qnL0Y1jJSTgKIFKLEGoLNLg8MCBG4i8lvErb2RrTq3PcEDU~ab0SG4OGFGVzzzhSamwAEdMsLwvw1kcEtv427lZ~tkn0YUIVJKxRVv8rIAqN6l3QlJVB1A4oritPYbn0nOFXnyQvl12GY80P7LcuMwvYnjNoK3SZ1B9oPLusgXA__',
  rohan: 'https://s3-alpha-sig.figma.com/img/65a9/0947/c89f362d70b4b3dadcd8d0e2ce863ca2?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gixBmjZwGaVf2bt-KJLd9snoAgygsEH4CmCQN-wLs7xtcFqsHDjZ1iJ4erAcMSvj2u8hsrlAlBlghazSsMUQhd6wQM9uLPUYyx~Lv89Vdo72On1rJAaTqtzaUsU7cnjPho6lv0-bhk5t3Z982S0W0uT8-RPkvCO~-etWXDRniHOxXqT1qjHroudKw3z49ezrqakqTbQzvlnUoO~tsT0Zyhw2Fgn9xislcUw9ifIOFdEqyOx47UehP~p5Tu7wy1QUbid1DLLLSR7npV-dsYOXYKvC-KJpL48QFy4qvMyPml3OXIGb7wdpmu5YljQzIdbMqAC--A2aNz49RRBvD6mTNA__',
  nancy: 'https://s3-alpha-sig.figma.com/img/eb9a/a245/6c7c5a67da7d762e55ac7ad96d7f9f12?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XFG-Ez4Kf3hF0KGQ85mikTQRtNaTY7RVKmBB0zS2v9OBW-WhPxatwz~2VnzfGyTSCqTzLo5iK6PNb0lvFBd5njGhdE3XwJSz-cFY4F9uL4HeKCntjLY8I4s5SdTxZFFGjJAmlvkSTbC~sLNc9NT1nUYsLtcCFoNgyLzHdEc3MVYfQTS7TFVWCJY8vv4ESSZIrjUgvBrj70mjexEztG7ejaJRtc8E9egMCyDzgdoX21jNsP5hl~V1M5Q8K6DoS2ZxZmiUq0E6WFPQ7YP43hsjbULNGqhE1X2du~HLDetPsr0eeTQvH6usFWjJ9D-fAOFyuRENl4EtaDGlKzuXQ-jIVQ__',
  graffica: 'https://s3-alpha-sig.figma.com/img/c4a9/cb98/b78bc216582ee4cd2602bd9d78c3f57e?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qgbEKjBxWbny3d2tMgUQDA74H1IP5EQx4BuEDvslUflzSJYOA6CPsR-ZEZjAcHldozc6fZo7gPOOjThuLWqKGhQwniY-K7CBNLbwMaqRTLYAU1-svtNFXZOsigpiFi0GQc0GTwo9Z6CqNwPsGFaFxVyryCcBOHn4tlo3s0B5y4kMXpoT~b2k9LvaV1UBGRBhzAf3~opq~VAS9XV1doFBS6yZ1dOhfEnPmGKtkjzUNg7R0kRZ-uNRFNpHth-1p7u-S-Epk4Vb6-PmvkCa52l-GJhaWwE8YGI3zlAnQtQxKjKBxIkttYouU2InaD8U7jfNgFRKuvWiPRtX1hMam8EwSw__',
}

/* ─── Participant cam data ────────────────────────────────── */
const PARTICIPANTS = [
  { id: 1, name: 'You (Khushboo)', avatarKey: 'you',     micMuted: false, camOn: true,  isYou: true },
  { id: 2, name: 'Nancy',          avatarKey: 'nancy',   micMuted: true,  camOn: false, color: '#9b6fa3' },
  { id: 3, name: 'Rohan',          avatarKey: 'rohan',   micMuted: false, camOn: false, color: '#7a8fa3' },
  { id: 4, name: 'Akshat',         avatarKey: null,      micMuted: true,  camOn: true,  color: '#c8a830' },
  { id: 5, name: 'Graffica',       avatarKey: 'graffica',micMuted: false, camOn: true,  isReaction: false },
]

/* ─── Chat messages data ─────────────────────────────────── */
const CHAT_MESSAGES = [
  { id: 1,  sender: 'Rohan',   text: 'Hey guyz!',              isYou: false, avatarKey: 'rohan'    },
  { id: 2,  sender: 'Nancy',   text: "What's up?",             isYou: false, avatarKey: 'nancy'    },
  { id: 3,  sender: 'You',     text: 'Are you all enjoying?',  isYou: true,  avatarKey: 'you'      },
  { id: 4,  sender: 'Graffica',text: 'for sure',               isYou: false, avatarKey: 'graffica' },
  { id: 5,  sender: 'Akshat',  text: 'Yeah! All time fav series', isYou: false, color: '#c8a830'  },
  { id: 6,  sender: 'Rohan',   text: "y'all noticed that?",   isYou: false, avatarKey: 'rohan'    },
  { id: 7,  sender: 'John',    text: 'yeah! Epic man',         isYou: false, color: '#C2856B'      },
  { id: 8,  sender: 'Graffica',text: 'Crayyy fr!',             isYou: false, avatarKey: 'graffica' },
  { id: 9,  sender: 'You',     text: "Who's your fav character?", isYou: true, avatarKey: 'you'   },
  { id: 10, sender: 'Akshat',  text: 'hmmmm, all i guess',    isYou: false, color: '#c8a830'      },
  { id: 11, sender: 'Rohan',   text: 'sleepy rn!!!',           isYou: false, avatarKey: 'rohan'    },
]

const PEOPLE = [
  { name: 'You (Khushboo)', avatarKey: 'you',     isHost: true  },
  { name: 'Rohan',          avatarKey: 'rohan'                  },
  { name: 'Nancy',          avatarKey: 'nancy'                  },
  { name: 'Graffica',       avatarKey: 'graffica'               },
  { name: 'Akshat',         color: '#c8a830'                    },
  { name: 'Nitya',          color: '#A0522D'                    },
  { name: 'Arpit',          color: '#5A6B8A'                    },
  { name: 'John',           color: '#C2856B'                    },
]

const REACTIONS = ['❤️', '😂', '😭', '😍', '🔥']

/* ─── Small SVG Icons ────────────────────────────────────── */
const NetflixLogoFull = () => (
  <svg width="92" height="25" viewBox="0 0 92 25" fill="none" aria-label="Netflix">
    <text x="0" y="21" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#E50914" letterSpacing="-1">NETFLIX</text>
  </svg>
)

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

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 10a7 7 0 0 1 14 0v4l2 2H3l2-2v-4Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M10 19a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.8"/>
  </svg>
)

const PeopleIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
    <circle cx="5" cy="3.5" r="2.5" fill="#aaa"/>
    <path d="M0 11c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="#aaa"/>
    <circle cx="11" cy="3.5" r="2" fill="#aaa"/>
    <path d="M13 11c0-1.66-.9-3.11-2.24-3.87" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
)

const SkipBackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0" stroke="white" strokeWidth="1.6"/>
    <path d="M9.5 9.5 7 12l2.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="12" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Arial">10</text>
  </svg>
)

const SkipFwdIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0" stroke="white" strokeWidth="1.6"/>
    <path d="M14.5 9.5 17 12l-2.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="12" y="15" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Arial">10</text>
  </svg>
)

const VolumeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)

const PauseNextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="4" width="4" height="16" rx="1" fill="white"/>
    <rect x="12" y="4" width="4" height="16" rx="1" fill="white"/>
    <polygon points="17,4 22,12 17,20" fill="white"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.6"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="white" strokeWidth="1.6"/>
  </svg>
)

const CaptionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.6"/>
    <path d="M7 12h4M7 15h2M13 12h4M13 15h2" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)

const FullscreenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)

const MicIcon = ({ muted }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {muted ? (
      <>
        <path d="M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M17 16.95A7 7 0 0 1 5 12v-2M19 12v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="white" strokeWidth="1.8"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </>
    )}
  </svg>
)

const CamIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M23 7l-7 5 7 5V7z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <rect x="1" y="5" width="15" height="14" rx="2" stroke="white" strokeWidth="1.8"/>
  </svg>
)

const EmojiIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1" fill="white"/>
    <circle cx="15" cy="10" r="1" fill="white"/>
  </svg>
)

const CastIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="2" cy="20" r="1" fill="white"/>
  </svg>
)

const ExitIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#E50914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16 17 21 12 16 7" stroke="#E50914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke="#E50914" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const MicOffSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2M19 12v-2M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const MicOnSmallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="white" strokeWidth="2"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="5" x2="12" y2="19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="12" x2="19" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
)

const InviteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="#aaa" strokeWidth="1.6"/>
    <path d="M4 20c0-3.31 3.58-6 8-6" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="19" y1="16" x2="19" y2="22" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="16" y1="19" x2="22" y2="19" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const CrownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#E50914">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
);



/* ─── Avatar component ───────────────────────────────────── */
function Avatar({ person, size = 36 }) {
  const key = person.avatarKey
  if (key && AVATAR_IMGS[key]) {
    return (
      <img
        className="rs-avatar-img"
        src={AVATAR_IMGS[key]}
        alt={person.name || person.sender}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }
  const name = person.name || person.sender || '?'
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div
      className="rs-avatar-fallback"
      style={{
        width: size, height: size, borderRadius: '50%',
        background: person.color || '#555',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36, fontWeight: 700, color: '#fff', flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

/* ─── Participant Cam Tile ───────────────────────────────── */
function CamTile({ participant }) {
  return (
    <div className={`rs-cam-tile ${participant.isYou ? 'rs-cam-you' : ''}`}>
      {/* Camera feed / avatar */}
      <div className="rs-cam-feed">
        {participant.camOn && participant.avatarKey ? (
          <img
            src={AVATAR_IMGS[participant.avatarKey]}
            alt={participant.name}
            className="rs-cam-img"
          />
        ) : (
          <div className="rs-cam-avatar-wrap">
            <Avatar person={participant} size={44} />
          </div>
        )}
      </div>

      {/* Mic indicator top-right */}
      <div className="rs-cam-mic-badge">
        {participant.micMuted ? <MicOffSmallIcon /> : <MicOnSmallIcon />}
      </div>

      {/* Name label bottom */}
      <div className="rs-cam-label">{participant.name}</div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ReactionScreen({ onBack }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState(CHAT_MESSAGES)
  const [progress] = useState(65)   // mock progress %
  const [micMuted, setMicMuted] = useState(false)
  const [camOff, setCamOff] = useState(false)
  const [floatingReactions, setFloatingReactions] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const emojiTimerRef = useRef(null)

  const handleReact = (emoji) => {
    const id = Date.now()
    setFloatingReactions(prev => [...prev, { id, emoji }])
    setTimeout(() => setFloatingReactions(prev => prev.filter(r => r.id !== id)), 2000)
  }

  const handleSend = () => {
    if (!chatInput.trim()) return
    setMessages(prev => [...prev, {
      id: Date.now(), sender: 'You', text: chatInput.trim(), isYou: true, avatarKey: 'you',
    }])
    setChatInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="rs-root">

      {/* ── Navbar ── */}
      <nav className="rs-navbar">
        <div className="rs-nav-left">
          {/* Netflix logo */}
          <div className="rs-netflix-logo" aria-label="Netflix" />
          <div className="rs-nav-links">
            <a className="rs-nav-link">Home</a>
            <a className="rs-nav-link">TV Shows</a>
            <a className="rs-nav-link">Movies</a>
            <a className="rs-nav-link">New &amp; Popular</a>
            <a className="rs-nav-link">My List</a>
            <a className="rs-nav-link">Browse by Languages</a>
            <div className="rs-nav-pill">
              <span className="rs-new-tag">NEW</span>
              Watch Party
            </div>
          </div>
        </div>
        <div className="rs-nav-right">
          <BellIcon />
          <div className="rs-profile-square" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ opacity: 0.7 }}>
            <path d="M1 1l5 5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          {onBack && (
            <button className="rs-back-btn" onClick={onBack}>← Back</button>
          )}
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="rs-body">

        {/* ── Main (left) ── */}
        <main className="rs-main">

          {/* Breadcrumb */}
          <div className="rs-breadcrumb">
            <div className="rs-n-logo" />
            <span className="rs-bc-watch">Watch Party</span>
            <span className="rs-bc-sep">·</span>
            <span className="rs-bc-crew">The crew</span>
            <span className="rs-bc-sep">·</span>
            <PeopleIcon />
            <span className="rs-bc-count">8</span>
          </div>

          {/* Video player */}
          <div className="rs-player-wrap">
            {/* Episode badge */}
            <div className="rs-episode-badge">S1:E1 Pilot</div>

            {/* Thumbnail / video placeholder */}
            <div className="rs-player-thumb">
              <img
                src="../../public/episode.jpg"
                alt="Friends S1E1 Pilot"
                className="rs-player-img"
              />
              <div className="rs-player-overlay" />
            </div>

            {/* Floating emoji reactions */}
            <div className="rs-float-reactions" aria-hidden>
              {floatingReactions.map(r => (
                <span key={r.id} className="rs-float-emoji">{r.emoji}</span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="rs-progress-bar-wrap">
              <div className="rs-progress-bg">
                <div className="rs-progress-fill" style={{ width: `${progress}%` }} />
                <div className="rs-progress-thumb" style={{ left: `${progress}%` }} />
              </div>
              <span className="rs-time-label">16:34</span>
            </div>

            {/* Controls */}
            <div className="rs-controls">
              <div className="rs-controls-left">
                <button className="rs-ctrl-btn" aria-label="Play"><PlayIcon /></button>
                <button className="rs-ctrl-btn" aria-label="Rewind 10s"><SkipBackIcon /></button>
                <button className="rs-ctrl-btn" aria-label="Forward 10s"><SkipFwdIcon /></button>
                <button className="rs-ctrl-btn" aria-label="Volume"><VolumeIcon /></button>
              </div>
              <div className="rs-controls-right">
                <button className="rs-ctrl-btn" aria-label="Next episode"><PauseNextIcon /></button>
                <button className="rs-ctrl-btn" aria-label="Settings"><SettingsIcon /></button>
                <button className="rs-ctrl-btn" aria-label="Captions"><CaptionIcon /></button>
                <button className="rs-ctrl-btn" aria-label="Fullscreen"><FullscreenIcon /></button>
              </div>
            </div>
          </div>

          {/* Participant camera strip */}
          <div className="rs-cam-strip">
            {PARTICIPANTS.map(p => (
              <CamTile key={p.id} participant={p} />
            ))}
            {/* Invite more tile */}
            {/* Custom Scroll Indicator & Invite Circular Button */}
<div className="sw-cam-end-controls">
  {/* Vertical Indicators */}
  <div className="sw-cam-indicators">
    <div className="sw-indicator-red" />
    <div className="sw-indicator-grey" />
  </div>

  {/* Circular Invite Button */}
  <button className="sw-cam-invite-circle">
    <svg 
      width="34" height="34" viewBox="0 0 24 24" 
      fill="none" stroke="white" strokeWidth="1.8" 
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M14 19a6 6 0 0 0-12 0" />
      <circle cx="8" cy="9" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="16" y1="11" x2="22" y2="11" />
    </svg>
    <span className="sw-cam-invite-label">
      Invite more<br/>people
    </span>
  </button>
</div>
          </div>

          {/* Bottom toolbar */}
          <div className="rs-toolbar">
            <button
              className={`rs-tool-btn ${micMuted ? 'rs-tool-muted' : ''}`}
              onClick={() => setMicMuted(m => !m)}
              aria-label="Toggle mic"
            >
              <MicIcon muted={micMuted} />
            </button>
            <button
              className={`rs-tool-btn ${camOff ? 'rs-tool-muted' : ''}`}
              onClick={() => setCamOff(c => !c)}
              aria-label="Toggle camera"
            >
              <CamIcon />
            </button>
            <div
              className="rs-emoji-picker-wrap"
              onMouseEnter={() => { clearTimeout(emojiTimerRef.current); setShowEmojiPicker(true) }}
              onMouseLeave={() => { emojiTimerRef.current = setTimeout(() => setShowEmojiPicker(false), 250) }}
            >
              {showEmojiPicker && (
                <div className="rs-toolbar-reaction-popup">
                  {REACTIONS.map(emoji => (
                    <button
                      key={emoji}
                      className="rs-reaction-btn"
                      onClick={() => { handleReact(emoji); setShowEmojiPicker(false) }}
                      aria-label={`React with ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              <button className="rs-tool-btn" aria-label="Reactions">
                <EmojiIcon />
              </button>
            </div>
            <button className="rs-tool-btn" aria-label="Cast" onClick={() => setIsShareModalOpen(true)}>
              <CastIcon />
            </button>
            <button className="rs-tool-btn rs-tool-exit" aria-label="Leave party" onClick={() => { navigate('/session-wrap-up') }}>
              <ExitIcon />
            </button>
          </div>
        </main>

      <div className="rs-sidebar-wrap">
        <WatchPartySidebar
          people={PEOPLE}
          messages={messages}
          initialTab={activeTab}
          onSendMessage={(text) => {
            setMessages(prev => [...prev, {
              id: Date.now(), sender: 'You', text, isYou: true, avatarKey: 'you',
            }])
          }}
          onCreatePoll={(pollData) => {
            console.log('Poll Created:', pollData)
          }}
          onInvite={() => {}}
        />
        <button className="rs-sidebar-close" aria-label="Close sidebar" onClick={() => {}}>
          <CloseIcon />
        </button>
      </div>
      <ShareScreenModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onStartSharing={(selectedOption) => {
          console.log('Started sharing option:', selectedOption);
          setIsShareModalOpen(false);
        }}
      />
      <CreatePollModal
        isOpen={isPollModalOpen}
        onClose={() => setIsPollModalOpen(false)}
        onCreatePoll={(pollData) => {
          console.log('Poll Created:', pollData);
        }}
      />
    </div>
    </div>
  )
}