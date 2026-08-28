import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WatchPartySidebar from '../components/WatchPartySidebar'
import './SessionWrapUp.css'

/* ─── Static image URLs ───────────────────────────────────── */
const IMGS = {
  friends: '/friends.png',
  loveandgelato: '/loveandgelato.png',
  manifest: '/manifest.png',
  nobody: '/nobodywantsthis.png',
  littlethings: '/littlethings.png',
}

const AVATAR_IMGS = {
  you: 'https://s3-alpha-sig.figma.com/img/0bde/0426/1a9be8954dd84bcd7817f414e18f86ba?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p~6J8YTvbpTGztFsQqX3L2U4UJCVJwGw~pL8k-y3l6pb5jsxLCRBM9IzsJDK6kqi0CxQdnDo4GuNNcMj9KnVCoRGMqTZesXlPwbhiHsp6iy22x8iWdWa~vsiBrvOs7h5GR8kuyKEkPtZrwcH4fAwz1w3bXq6ng94w7iFdOODRp8qnL0Y1jJSTgKIFKLEGoLNLg8MCBG4i8lvErb2RrTq3PcEDU~ab0SG4OGFGVzzzhSamwAEdMsLwvw1kcEtv427lZ~tkn0YUIVJKxRVv8rIAqN6l3QlJVB1A4oritPYbn0nOFXnyQvl12GY80P7LcuMwvYnjNoK3SZ1B9oPLusgXA__',
  rohan: '/rohanbig.png',
  john: '/johnbig.png',
  graffica: 'https://media.istockphoto.com/id/2162083784/photo/business-woman-and-portrait-on-video-conference-with-communication-for-virtual-seminar-or.jpg?s=612x612&w=0&k=20&c=NeAdu42WeH78eu3jKd_TCyYXzo3c4VEHKlIr3Mz1mlQ='
}

/* Public folder images (always available) */
const PUB = {
  you:      '/you.png',
  rohan:    '/rohan.png',
  nancy:    '/nancy.png',
  graffica: '/graffica.png',
  akshat:   '/akshat.png',
  john:     '/john.png',
}

/* ─── Data ────────────────────────────────────────────────── */
const PARTICIPANTS = [
  { id: 1, name: 'You (Khushboo)', avatarKey: 'you',      micMuted: false, camOn: true,  isYou: true },
  { id: 2, name: 'Nancy',          avatarKey: 'nancy',    micMuted: true,  camOn: false, color: '#9b6fa3' },
  { id: 3, name: 'Rohan',          avatarKey: 'rohan',    micMuted: false, camOn: false, color: '#7a8fa3' },
  { id: 4, name: 'Graffica',       avatarKey: 'graffica', micMuted: false, camOn: true,  isReaction: false },
]
const STATS = [
  { icon: 'clock',    label: 'Watch time',     value: '48m', sub: 'Together' },
  { icon: 'reaction', label: 'Reactions sent', value: '156', sub: 'Total'    },
  { icon: 'message',  label: 'Messages',       value: '57',  sub: 'Total'    },
  { icon: 'trophy',   label: 'Trailblazer',    isAvatar: true               },
]

const TOP_REACTIONS = [
  { emoji: '😂', count: 50 },
  { emoji: '🥲', count: 23 },
  { emoji: '💕', count: 34 },
  { emoji: '😱', count: 50 },
  { emoji: '🍿', count: 45 },
]

const WHATS_NEXT = [
  { id: 1, title: 'Love and Gelato',   episode: 'S1:E1', imgKey: 'loveandgelato' },
  { id: 2, title: 'Manifest',          episode: 'S3:E1', imgKey: 'manifest'     },
  { id: 3, title: 'Nobody wants this', episode: 'S3:E1', imgKey: 'nobody'       },
  { id: 4, title: 'Little Things',     episode: 'S3:E1', imgKey: 'littlethings' },
]

/* Sidebar people panel */
const SIDEBAR_PEOPLE = [
  { id: 1, name: 'You(Khushboo)', avatar: PUB.you,      isHost: true },
  { id: 2, name: 'Rohan',         avatar: PUB.rohan     },
  { id: 3, name: 'Nancy',         avatar: PUB.nancy     },
  { id: 4, name: 'Graffica',      avatar: PUB.graffica  },
  { id: 5, name: 'Akshat',        avatar: PUB.akshat    },
  { id: 6, name: 'Nitya',         color: '#A0522D'      },
  { id: 7, name: 'Arpit',         color: '#5A6B8A'      },
  { id: 8, name: 'John',          avatar: PUB.john      },
]

/* Chat messages for sidebar */
const INITIAL_MSGS = [
  { id:1,  sender:'Rohan',          avatar: PUB.rohan,   text:'Hey guys!'                  },
  { id:2,  sender:'Nancy',          avatar: PUB.nancy,   text:"What's up?"                 },
  { id:3,  isYou:true, name:'You(Khushboo)', avatar: PUB.you, text:'Are you all enjoying?' },
  { id:4,  sender:'Graffica',       avatar: PUB.graffica,text:'for sure'                   },
  { id:5,  sender:'Akshat',         avatar: PUB.akshat,  text:'Yeah! All time fav series'  },
  { id:6,  sender:'Rohan',          avatar: PUB.rohan,   text:"y'all noticed that?"        },
  { id:7,  sender:'John',           avatar: PUB.john,    text:'yeah! Epic man'              },
  { id:8,  sender:'Graffica',       avatar: PUB.graffica,text:'Craxyyy fr!'                },
  { id:9,  isYou:true, name:'You(Khushboo)', avatar: PUB.you, text:"Who's your fav character?" },
  { id:10, sender:'Akshat',         avatar: PUB.akshat,  text:'hmmm, all i guess'          },
  { id:11, sender:'Rohan',          avatar: PUB.rohan,   text:'Sleepy rn!!!'               },
]

/* ─── Icons ───────────────────────────────────────────────── */
const MicOnIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="white" strokeWidth="2"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const MicOffIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const MicLargeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="white" strokeWidth="1.8"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
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
const ChatBtnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7 10 12 15 17 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
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

const PlayBtnIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
)
const PlusSmIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
)
const EndSessionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16 17 21 12 16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const SearchIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1.8"/>
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
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
const BellIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10a7 7 0 0 1 14 0v4l2 2H3l2-2v-4Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M10 19a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.8"/>
  </svg>
)

const ClapIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
    <text y="50" fontSize="52">👏</text>
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
const PeopleCountIcon = () => (
  <svg width="13" height="11" viewBox="0 0 14 12" fill="none">
    <circle cx="5" cy="3.5" r="2.5" fill="#aaa"/>
    <path d="M0 11c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="#aaa"/>
    <circle cx="11" cy="3.5" r="2" fill="#aaa"/>
    <path d="M13 11c0-1.66-.9-3.11-2.24-3.87" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round"/>
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

/* ─── Stat icons ──────────────────────────────────────────── */
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="1.8"/>
    <polyline points="12 6 12 12 16 14.5" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ReactionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="1.8"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1" fill="#aaa"/>
    <circle cx="15" cy="10" r="1" fill="#aaa"/>
    <path d="M18.5 4.5l-2-2m2 2L18 7" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)
const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#aaa" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
)
const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 9H3V5h3M18 9h3V5h-3" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 2h12v8a6 6 0 0 1-12 0V2z" stroke="#aaa" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 16v4M9 20h6" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const STAT_ICON = { clock: <ClockIcon/>, reaction: <ReactionIcon/>, message: <MessageIcon/>, trophy: <TrophyIcon/> }


function Avatar({ person, size = 36 }) {
  const key = person.avatarKey
  if (key && AVATAR_IMGS[key]) {
    return (
      <img
        className="sw-avatar-img"
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
      className="sw-avatar-fallback"
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


/* ─── CrewTile ────────────────────────────────────────────── */
function CamTile({ participant }) {
  return (
    <div className={`sw-cam-tile ${participant.isYou ? 'sw-cam-you' : ''}`}>
      {/* Camera feed / avatar */}
      <div className="sw-cam-feed">
        {participant.camOn && participant.avatarKey ? (
          <img
            src={AVATAR_IMGS[participant.avatarKey]}
            alt={participant.name}
            className="sw-cam-img"
          />
        ) : (
          <div className="sw-cam-avatar-wrap">
            <Avatar person={participant} size={44} />
          </div>
        )}
      </div>

      {/* Mic indicator top-right */}
      <div className="sw-cam-mic-badge">
        {participant.micMuted ? <MicOffSmallIcon /> : <MicOnSmallIcon />}
      </div>

      {/* Name label bottom */}
      <div className="sw-cam-label">{participant.name}</div>
    </div>
  )
}


/* ─── StatCard ────────────────────────────────────────────── */
function StatCard({ stat }) {
  return (
    <div className="sw-stat-card">
      <div className="sw-stat-header">
        {STAT_ICON[stat.icon]}
        <span className="sw-stat-label">{stat.label}</span>
      </div>
      {stat.isAvatar
        ? <img src={PUB.rohan} alt="Trailblazer" className="sw-stat-avatar-img" />
        : (
          <div className="sw-stat-body">
            <span className="sw-stat-value">{stat.value}</span>
            <span className="sw-stat-sub">{stat.sub}</span>
          </div>
        )
      }
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────── */
export default function SessionWrapUp({ onBack }) {
  const navigate = useNavigate()
  const [added, setAdded] = useState({})
  const [chatOpen, setChatOpen] = useState(false)
  const [micMuted, setMicMuted] = useState(false)
  const [camOff, setCamOff] = useState(false)

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [msgs, setMsgs] = useState(INITIAL_MSGS)
  const [activeTab, setActiveTab] = useState('chat')

  const handleSend = (text) => {
    setMsgs(prev => [...prev, {
      id: prev.length + 1, isYou: true,
      name: 'You(Khushboo)', avatar: PUB.you, text,
    }])
  }

  return (
    <div className="sw-root">

      {/* ── Navbar ── */}
      <nav className="sw-navbar">
        <div className="sw-nav-left">
          <div className="netflix-logo" aria-label="Netflix" />
          <div className="sw-nav-links">
            <a className="sw-nav-link">Home</a>
            <a className="sw-nav-link">TV Shows</a>
            <a className="sw-nav-link">Movies</a>
            <a className="sw-nav-link">New &amp; Popular</a>
            <a className="sw-nav-link">My List</a>
            <a className="sw-nav-link">Browse by Languages</a>
            <div className="sw-nav-pill">
              <span className="sw-new-tag">NEW</span>
              Watch Party
            </div>
          </div>
        </div>
        <div className="sw-nav-right">
          <SearchIcon />
          <BellIcon />
          <div className="sw-profile-sq" />
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="sw-body">

        {/* ── Main ── */}
        <main className="sw-main">

          {/* Breadcrumb */}
          <div className="sw-breadcrumb">
            <div className="sw-bc-logo" />
            <span className="sw-bc-watch">Watch Party</span>
            <span className="sw-bc-dot">·</span>
            <span className="sw-bc-crew">The crew</span>
            <span className="sw-bc-dot">·</span>
            <PeopleIcon />
            <span className="sw-bc-count">8</span>
          </div>

          {/* Heading */}
          <h1 className="sw-heading">Party ended <span>🎉</span></h1>

          {/* Summary row */}
          <div className="sw-summary-row">

            {/* Movie card */}
            <div className="sw-movie-card">
              <img src={IMGS.friends} alt="Friends" className="sw-movie-img" />
              <div className="sw-movie-footer">
                <div className="sw-movie-meta">Watched together</div>
                <div className="sw-movie-ep">S1:E1 Pilot</div>
              </div>
            </div>

            {/* Stats block */}
            <div className="sw-stats-block">
              <p className="sw-block-label">How it went</p>
              <div className="sw-stats-row">
                {STATS.map((s, i) => <StatCard key={i} stat={s} />)}
              </div>
              <p className="sw-block-label sw-block-label--gap">Top reactions</p>
              <div className="sw-reactions-row">
                {TOP_REACTIONS.map((r, i) => (
                  <div key={i} className="sw-chip">
                    <span className="sw-chip-emoji">{r.emoji}</span>
                    <span className="sw-chip-count">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crew */}
          <h2 className="sw-crew-heading">The crew</h2>
          <div className="sw-cam-strip">
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
          <div className="sw-toolbar">
            <button
              className={`sw-tool ${micMuted ? 'sw-tool-muted' : ''}`}
              onClick={() => setMicMuted(m => !m)}
              aria-label="Toggle mic"
            >
              <MicIcon muted={micMuted} />
            </button>
            <button
              className={`sw-tool ${camOff ? 'sw-tool-muted' : ''}`}
              onClick={() => setCamOff(c => !c)}
              aria-label="Toggle camera"
            >
              <CamIcon />
            </button>
            <div
              className="sw-emoji-picker-wrap"
              onMouseEnter={() => { setShowEmojiPicker(true) }}
              onMouseLeave={() => { setShowEmojiPicker(false) }}
              style={{ position: 'relative', display: 'flex' }}
            >
              {showEmojiPicker && (
                <div className="sw-toolbar-reaction-popup" style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px', background: 'rgba(24,24,24,0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '30px', padding: '6px 10px' }}>
                  {['❤️', '😂', '😭', '😍', '🔥'].map(emoji => (
                    <button
                      key={emoji}
                      className="sw-reaction-btn"
                      onClick={() => setShowEmojiPicker(false)}
                      aria-label={`React with ${emoji}`}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              <button className="sw-tool" aria-label="Reactions">
                <EmojiIcon />
              </button>
            </div>
            <button className="sw-tool" aria-label="Cast" onClick={() => setIsShareModalOpen(true)}>
              <CastIcon />
            </button>
            <button className="sw-tool sw-tool-exit" aria-label="Leave party" onClick={() => navigate('/session-wrap-up')}>
              <ExitIcon />
            </button>
          </div>

          {/* Action row */}
          <div className="sw-actions">
            <button className="sw-act sw-act-dark" onClick={() => setChatOpen(p => !p)}>
              <ChatBtnIcon /><span>Chat</span>
            </button>
            <button className="sw-act sw-act-dark">
              <DownloadIcon /><span>Download recap</span>
            </button>
            <button className="sw-act sw-act-red">
              <PlayBtnIcon /><span>Play Next Voted</span>
            </button>
          </div>

        </main>

        {/* ── Sidebar ── */}
        {chatOpen ? (
          <div className="sw-sidebar-wrap">
            <WatchPartySidebar
              isOpen
              initialTab={activeTab}
              people={SIDEBAR_PEOPLE}
              messages={msgs}
              onSendMessage={handleSend}
              onClose={() => setChatOpen(false)}
              onTabChange={setActiveTab}
            />
          </div>
        ) : (
          <div className="sw-sidebar-wrap">
            <aside className="sw-sidebar">

              {/* Thanks */}
              <div className="sw-thanks-block">
                <div className="sw-clap-wrap"><ClapIcon /></div>
                <p className="sw-thanks-title">Thanks for watching together!</p>
                <p className="sw-thanks-sub">Until next time</p>
              </div>

              {/* End session */}
              <button className="sw-end-btn">
                <EndSessionIcon />
                <span>End session for everyone</span>
              </button>

              <div className="sw-divider" />

              {/* What's next */}
              <div className="sw-next-hdr">
                <p className="sw-next-title">What's next?</p>
                <p className="sw-next-sub">Add to the queue or start a new vote</p>
              </div>

              <div className="sw-next-list">
                {WHATS_NEXT.map(item => (
                  <div key={item.id} className="sw-next-item">
                    <div className="sw-thumb-wrap">
                      <span className="sw-thumb-n">N</span>
                      <img src={IMGS[item.imgKey]} alt={item.title} className="sw-thumb-img" />
                    </div>
                    <div className="sw-next-info">
                      <span className="sw-next-show">{item.title}</span>
                      <span className="sw-next-ep">{item.episode}</span>
                    </div>
                    <button
                      className={`sw-plus-btn${added[item.id] ? ' sw-plus-added' : ''}`}
                      onClick={() => setAdded(p => ({ ...p, [item.id]: true }))}
                    >
                      {added[item.id] ? '✓' : <PlusSmIcon />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="sw-vote-wrap">
                <button
                  className="sw-vote-btn"
                  onClick={() => navigate('/what-are-we-watching', { state: { newVote: true } })}
                >
                  Start a new vote
                </button>
              </div>

            </aside>
          </div>
        )}

      </div>
    </div>
  )
}