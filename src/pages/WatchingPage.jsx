import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './WatchingPage.css'
import WatchPartySidebar from '../components/WatchPartySidebar'

/* ─── Static Data ─────────────────────────────────────────── */
const MOVIES = [
  {
    id: 1,
    title: 'FRIENDS',
    addedBy: 'Rohan',
    votes: 8,
    up: 8,
    down: 1,
    img: 'https://s3-alpha-sig.figma.com/img/d911/57a5/42850c33558e70a8e53a68f1ae7b9467?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lWuSbObqbStiPSQcEzE-EfLyv1b4xLBpznjdqsHwPLU1REej7MzV9IqWUXUS073e3ptlygV80IV07cpMQmmBvnIe7l5vGUmB3NgK0q67tY6cKPx-dqZXmTP~Gjlfcyn7GDLgyqld63ynMfYJIH3CqU2fxIp1OUBI~QIki~AZJkxm84hgRAnWrWETAifuIU-b~z5DusdRyWMB4fLhtZjJQLJ9p67Qu5OQKGNE13C1~LOG1zVuxFH79VT4H6SUpCVr9id-3iWBSFAMsbyUqYqifUzu8gB8XNFG7OJjg2czQaFBe9OOztKqz8XVJ0GVXtdKdyGvBT-W1Ve93VPUzsrP~w__',
    badge: 'Emmy Nominee 🏆',
  },
  {
    id: 2,
    title: 'The Map of Longing',
    addedBy: 'Graffica',
    votes: 5,
    up: 5,
    down: 1,
    img: 'https://s3-alpha-sig.figma.com/img/c4a9/cb98/b78bc216582ee4cd2602bd9d78c3f57e?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qgbEKjBxWbny3d2tMgUQDA74H1IP5EQx4BuEDvslUflzSJYOA6CPsR-ZEZjAcHldozc6fZo7gPOOjThuLWqKGhQwniY-K7CBNLbwMaqRTLYAU1-svtNFXZOsigpiFi0GQc0GTwo9Z6CqNwPsGFaFxVyryCcBOHn4tlo3s0B5y4kMXpoT~b2k9LvaV1UBGRBhzAf3~opq~VAS9XV1doFBS6yZ1dOhfEnPmGKtkjzUNg7R0kRZ-uNRFNpHth-1p7u-S-Epk4Vb6-PmvkCa52l-GJhaWwE8YGI3zlAnQtQxKjKBxIkttYouU2InaD8U7jfNgFRKuvWiPRtX1hMam8EwSw__',
  },
  {
    id: 3,
    title: 'Spider-Man: Far From Home',
    addedBy: 'You (Khushboo)',
    votes: 3,
    up: 3,
    down: 2,
    img: 'https://s3-alpha-sig.figma.com/img/e0db/f4ba/8b5014fbbc76fca7c9afd5d52f018bb8?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QGQVEqQA4cdXjz2ey6pGxD3Kn2ftjLTJnxPkjwvBMwlSNm63Psg6E77jkAaGkt0uFjWei02h4gUAXaVg6NuyvFKnNgCi6EMJlWLPgqzNlLrPQ~LxaFr2fxoeAvufw6-fJK0u-NddDDSw8paA0CWofxJuKmAgQYxrHAQ~wbx3pwE6Wue~fNAlSX0D39rHH370syiEEWhTqsvI-JgtaQMQFazwA5jVT5zkL-9MfxYVo1WsjXSwfdLQheUe8DyTW0h4Nqbuwrmzwc2dDFCMMI5hzJY5Ik6WMhpDz7UDjfVZ-ZoT6tMqKwl6NKUAsiKPRxuLjZChpTypPSE-VrZkal~~3A__',
  },
  {
    id: 4,
    title: 'People We Meet on Vacation',
    addedBy: 'Akshat',
    votes: 3,
    up: 3,
    down: 4,
    img: 'https://s3-alpha-sig.figma.com/img/f6b6/ae35/fd35869c89aa790d186cf2094a3d2d12?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a90P2rmtECObWLzvSkPDC3lwxF-NRa7vwyyMOPj9deivT89zl5qAneDcZaI0jzQUWEC-W7GnZoLahFLOE0LBuBDlZljgMHuITdVrUDdJTf1BQxmeH8kR4A1P1KeNZbgnVrpaGyuHljzIVJ6TWbXJBkhqTXdExjl8MFXkkxa1p68i~F4q~frX3mM2gwwjAhQPtcv-aG-9cSjJutgkh6E8Xv~QRgSF~h51TcEig3wRIeFDjkiOvY~PbyE6rin6VCQZ6Ykl0TKGrQK9-fTKPP5vkU25AzgYRBXop3u0EHiFagRg7FDvNEkU~SY0LWBf0Y7TwB-aT0RQPwrVksWmaQcupA__',
    badge: 'Emmy Nominee 🏆',
  },
  {
    id: 5,
    title: 'Money Heist',
    addedBy: 'Nancy',
    votes: 1,
    up: 1,
    down: 3,
    img: 'https://s3-alpha-sig.figma.com/img/ed0b/cdc8/a7d0b81f9c902765209fdc86add448dc?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AxaiS0ruSbh3mHKfB9kK1JF5KFPlNQ7KKHTh-ZM9a3BDORsLR-i2nRZCs-dg84aYQ4sRjMZ3XWjC1E5LZ555ykgc7cW1uqX7A5epbELl9CQqXttcw1p~EjbwXOTDDfHuPv7lv18I9l3r7DFSuWoSrqPJarFXufxiZakO-fkPqmPeKaROCP0~etfIaOwHOrpOj4o8U9YaS2bTY2VXJ1KSnd2nplWomobNi0SyBN58QK31ev2BjAy3qxH0UvXZlq6XwfYACUjRPMachFjb6dZXMa53nL7ZoPu-ar6HVrx29QhOBZhfymEjRWiw1U1ZPNVC2bB~4yqaYFFOfj~5Y348VA__',
  },
]

// Searchable catalog (mock data — swap in a real search API later).
// `img` is optional — set it to a real poster URL and it'll be used instead
// of the `gradient` placeholder. Leave it out to fall back to the gradient.
const SEARCH_CATALOG = [
  {
    title: 'The Break-Up',
    img: '../../public/thebreakup.png',
    gradient: 'linear-gradient(135deg, #7b2350 0%, #2a1030 100%)',
    ageRating: 'U/A 16+',
    meta: '1h 46m',
    hd: true,
    genres: ['Bittersweet', 'Romantic', 'Dramedy'],
  },
  {
    title: 'Operation Safed Sagar',
    img: '../../public/safedsagar.png',
    gradient: 'linear-gradient(135deg, #2b4a6b 0%, #0e1b26 100%)',
    ageRating: 'U/A 13+',
    meta: '6 Episodes',
    hd: true,
    genres: ['Rousing', 'Inspiring', 'Action'],
    top10: true,
    recentlyAdded: true,
  },
  {
    title: 'Stranger Things',
    img: '../../public/strangerthings5thumb.jpg',
    gradient: 'linear-gradient(135deg, #5b1414 0%, #14090c 100%)',
    ageRating: 'U/A 16+',
    meta: '4 Seasons',
    hd: true,
    genres: ['Supernatural', 'Suspenseful', 'Sci-Fi'],
    top10: true,
  },
  {
    title: 'Interstellar',
    img: '../../public/interstellar.jpg',
    gradient: 'linear-gradient(135deg, #17324a 0%, #060c14 100%)',
    ageRating: 'U/A 13+',
    meta: '2h 49m',
    hd: true,
    genres: ['Epic', 'Sci-Fi', 'Emotional'],
  },
]

// Profile avatar images (using Figma profile images)
const AVATAR_IMGS = {
  you:      'https://s3-alpha-sig.figma.com/img/0bde/0426/1a9be8954dd84bcd7817f414e18f86ba?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p~6J8YTvbpTGztFsQqX3L2U4UJCVJwGw~pL8k-y3l6pb5jsxLCRBM9IzsJDK6kqi0CxQdnDo4GuNNcMj9KnVCoRGMqTZesXlPwbhiHsp6iy22x8iWdWa~vsiBrvOs7h5GR8kuyKEkPtZrwcH4fAwz1w3bXq6ng94w7iFdOODRp8qnL0Y1jJSTgKIFKLEGoLNLg8MCBG4i8lvErb2RrTq3PcEDU~ab0SG4OGFGVzzzhSamwAEdMsLwvw1kcEtv427lZ~tkn0YUIVJKxRVv8rIAqN6l3QlJVB1A4oritPYbn0nOFXnyQvl12GY80P7LcuMwvYnjNoK3SZ1B9oPLusgXA__',
  rohan:    'https://s3-alpha-sig.figma.com/img/65a9/0947/c89f362d70b4b3dadcd8d0e2ce863ca2?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gixBmjZwGaVf2bt-KJLd9snoAgygsEH4CmCQN-wLs7xtcFqsHDjZ1iJ4erAcMSvj2u8hsrlAlBlghazSsMUQhd6wQM9uLPUYyx~Lv89Vdo72On1rJAaTqtzaUsU7cnjPho6lv0-bhk5t3Z982S0W0uT8-RPkvCO~-etWXDRniHOxXqT1qjHroudKw3z49ezrqakqTbQzvlnUoO~tsT0Zyhw2Fgn9xislcUw9ifIOFdEqyOx47UehP~p5Tu7wy1QUbid1DLLLSR7npV-dsYOXYKvC-KJpL48QFy4qvMyPml3OXIGb7wdpmu5YljQzIdbMqAC--A2aNz49RRBvD6mTNA__',
  nancy:    'https://s3-alpha-sig.figma.com/img/eb9a/a245/6c7c5a67da7d762e55ac7ad96d7f9f12?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XFG-Ez4Kf3hF0KGQ85mikTQRtNaTY7RVKmBB0zS2v9OBW-WhPxatwz~2VnzfGyTSCqTzLo5iK6PNb0lvFBd5njGhdE3XwJSz-cFY4F9uL4HeKCntjLY8I4s5SdTxZFFGjJAmlvkSTbC~sLNc9NT1nUYsLtcCFoNgyLzHdEc3MVYfQTS7TFVWCJY8vv4ESSZIrjUgvBrj70mjexEztG7ejaJRtc8E9egMCyDzgdoX21jNsP5hl~V1M5Q8K6DoS2ZxZmiUq0E6WFPQ7YP43hsjbULNGqhE1X2du~HLDetPsr0eeTQvH6usFWjJ9D-fAOFyuRENl4EtaDGlKzuXQ-jIVQ__',
  friends_thumb: 'https://s3-alpha-sig.figma.com/img/739b/19c5/ba7ba99e721768aa7da19feceb1b2e61?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t2vTZgz7LM-fMb8f4mwzbEijdXjAta519zkIsUJV5lT6ihdf5aIdOK2ZJ6J8G5Cv4TSQOioWerH7Xo8Ca5R4TGYinJefYIN57Hm1KHCMuKfSlU6S8u3~4IM2QhWG02Al42iFhprJp6VSQXnW2n1LkwKHKLy2Yg5YnyTLkoDituHdK6547p~vMvPP3YAfkkI-uO8DvCPtn0DedPVIThjpqGUnOAIwb6yEzV59HRe2ek-VtMrCLVcFi7Zx0XH-~RoigftS3dyM5Oo3zrm5-b7pOiP3xvb5w4ZzfH0RnubdJjLlgkvrOTWfqb4oC9DvP8w4BJZkxxmygezQKxB~TnyIbg__',
}

const PEOPLE = [
  { name: 'You (Khushboo)', status: 'Host', isHost: true, avatarKey: 'you' },
  { name: 'Rohan',    status: 'Online', avatarKey: 'rohan' },
  { name: 'Nancy',    status: 'Online', avatarKey: 'nancy' },
  { name: 'Graffica', status: 'Online', color: '#9C6B2E' },
  { name: 'Akshat',   status: 'Online', color: '#D4A017' },
  { name: 'Nitya',    status: 'Online', color: '#A0522D' },
  { name: 'Arpit',    status: 'Online', color: '#5A6B8A' },
  { name: 'John',     status: 'Online', color: '#C2856B' },
]

/* ─── Icons ───────────────────────────────────────────────── */
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <line x1="9" y1="2" x2="9" y2="16" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
    <line x1="2" y1="9" x2="16" y2="9" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#ccc" strokeWidth="1.5"/>
    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#ccc" strokeWidth="1.5"/>
    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#ccc" strokeWidth="1.5"/>
    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#ccc" strokeWidth="1.5"/>
  </svg>
)
const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <line x1="2" y1="5" x2="18" y2="5" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="10" x2="18" y2="10" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="15" x2="18" y2="15" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)
const UpArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13V3M8 3L3 8M8 3L13 8" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ThumbUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M4 13H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2m0 7V6m0 7h7.17a1 1 0 0 0 .98-.8l.85-4.25A1 1 0 0 0 13 7H9V3a1 1 0 0 0-1-1H7L4 6" stroke="#5a9" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ThumbDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M10 1H12a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2m0-7v7m0-7H2.83a1 1 0 0 0-.98.8L1 9.05A1 1 0 0 0 2 10h4v3a1 1 0 0 0 1 1h1l3-4" stroke="#c55" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <polygon points="4,2 16,9 4,16" fill="white"/>
  </svg>
)

const CrownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#E50914">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
);

const InviteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="17" y1="11" x2="23" y2="11" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1.8"/>
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)
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

export const watchingPageMessages = [
  {
    id: "1",
    sender: "Rohan",
    text: "Hey guyz!",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "2",
    sender: "Nancy",
    text: "What’s up?",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "3",
    sender: "You",
    text: "Are you all enjoying?",
    isYou: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "4",
    sender: "Graffica",
    text: "for sure",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "5",
    sender: "Akshat",
    text: "Yeah! All time fav series",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "6",
    sender: "Rohan",
    text: "y’all noticed that?",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "7",
    sender: "John",
    text: "yeah! Epic man",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "8",
    sender: "Graffica",
    text: "Craxyyy fr!",
    isYou: false,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "9",
    sender: "You",
    text: "Who’s your fav character?",
    isYou: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
];

/* ─── Avatar ──────────────────────────────────────────────── */
function Avatar({ person, size = 36 }) {
  if (person.avatarKey && AVATAR_IMGS[person.avatarKey]) {
    return (
      <img
        className="wp-avatar-img"
        src={AVATAR_IMGS[person.avatarKey]}
        alt={person.name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }
  const initials = person.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div
      className="wp-avatar-fallback"
      style={{
        width: size, height: size, borderRadius: '50%', background: person.color || '#555',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36, fontWeight: 700, color: '#fff', flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

/* ─── Movie Card ─────────────────────────────────────────── */
function MovieCard({ movie }) {
  return (
    <div className="wp-card">
      <div
        className="wp-card-img"
        style={movie.img ? { backgroundImage: `url(${movie.img})` } : { background: movie.gradient || '#222' }}
      >
        {!movie.img && <span className="wp-card-placeholder-title">{movie.title}</span>}
        <div className="wp-card-overlay" />
        <div className="wp-card-bottom">
          <div className="wp-card-addedby">
            <span className="wp-addedby-dot" />
            Added by {movie.addedBy}
            {movie.badge && <span className="wp-card-badge"> · {movie.badge}</span>}
          </div>
          <div className="wp-card-votes">
            <span className="wp-votes-count">
              <UpArrowIcon />
              <span className="wp-votes-num">{movie.votes}</span>
              <span className="wp-votes-label">Votes</span>
            </span>
            <span className="wp-votes-right">
              <ThumbUpIcon /><span className="wp-vote-detail">{movie.up}</span>
              <ThumbDownIcon /><span className="wp-vote-detail">{movie.down}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Search Result Card ─────────────────────────────────── */
function SearchResultCard({ item, onAdd, added }) {
  return (
    <div className="wp-search-card">
      <div
        className="wp-search-poster"
        style={
          item.img
            ? { backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: item.gradient }
        }
      >
        {item.top10 && (
          <span className="wp-search-top10">
            <span className="wp-search-top10-num">10</span> TOP 10
          </span>
        )}
        {item.recentlyAdded && <span className="wp-search-recent-tag">Recently added</span>}
        {!item.img && <span className="wp-search-poster-title">{item.title}</span>}
      </div>
      <div className="wp-search-info">
        <button className="wp-add-to-vote-btn" onClick={onAdd} disabled={added}>
          <PlusIcon />
          {added ? 'Added' : 'Add to Vote'}
        </button>
        <div className="wp-search-meta-row">
          <span className="wp-search-meta-badge">{item.ageRating}</span>
          <span>{item.meta}</span>
          {item.hd && <span className="wp-search-meta-badge">HD</span>}
        </div>
        <div className="wp-search-genres">{item.genres.join(' · ')}</div>
      </div>
    </div>
  )
}

/* ─── Custom Add Card (when a search has no catalog match) ── */
function CustomAddCard({ query, imgUrl, onImgUrlChange, onAdd }) {
  return (
    <div className="wp-search-card wp-custom-add-card">
      <div
        className="wp-search-poster"
        style={
          imgUrl.trim()
            ? { backgroundImage: `url(${imgUrl.trim()})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: 'linear-gradient(135deg, #2a2a2a 0%, #111 100%)' }
        }
      >
        {!imgUrl.trim() && <span className="wp-search-poster-title">{query}</span>}
      </div>
      <div className="wp-search-info">
        <input
          className="wp-custom-img-input"
          type="text"
          placeholder="Paste an image URL (optional)"
          value={imgUrl}
          onChange={(e) => onImgUrlChange(e.target.value)}
        />
        <button className="wp-add-to-vote-btn" onClick={onAdd}>
          <PlusIcon /> Add “{query}”
        </button>
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────── */
export default function WatchingPage({ onBack }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('people')
  const [movies, setMovies] = useState(MOVIES)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [customImgUrl, setCustomImgUrl] = useState('')
  const [addedTitles, setAddedTitles] = useState([])

  const trimmedQuery = searchQuery.trim()
  // No query yet → show the full trending pool. Typing filters it by keyword.
  const overlayResults = trimmedQuery
    ? SEARCH_CATALOG.filter(item =>
        item.title.toLowerCase().includes(trimmedQuery.toLowerCase())
      )
    : SEARCH_CATALOG
  const showCustomAdd = trimmedQuery.length > 0 && overlayResults.length === 0

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
    setCustomImgUrl('')
  }

  const handleAddToVote = (item) => {
    if (addedTitles.includes(item.title)) return
    setMovies(prev => [
      {
        id: `search-${item.title}`,
        title: item.title,
        addedBy: 'You (Khushboo)',
        votes: 0,
        up: 0,
        down: 0,
        img: item.img,
        gradient: item.gradient,
        badge: item.top10 ? 'Trending' : undefined,
      },
      ...prev,
    ])
    setAddedTitles(prev => [...prev, item.title])
    closeSearch()
  }

  const handleCustomAdd = () => {
    if (!trimmedQuery) return
    setMovies(prev => [
      {
        id: `custom-${Date.now()}`,
        title: trimmedQuery,
        addedBy: 'You (Khushboo)',
        votes: 0,
        up: 0,
        down: 0,
        img: customImgUrl.trim() || undefined,
        gradient: 'linear-gradient(135deg, #2a2a2a 0%, #111 100%)',
      },
      ...prev,
    ])
    closeSearch()
  }

  return (
    <div className="wp-root">

      {/* Dims the whole page behind the search overlay */}
      {isSearchOpen && <div className="wp-search-dim-overlay" onClick={closeSearch} />}

      {/* ── Navbar ── */}
      <nav className="wp-navbar">
        <div className="wp-nav-left">
          {/* Netflix logo */}
          <div className="wp-netflix-logo" />
          <div className="wp-nav-links">
            <a className="wp-nav-link">Home</a>
            <a className="wp-nav-link">TV Shows</a>
            <a className="wp-nav-link">Movies</a>
            <a className="wp-nav-link">New &amp; Popular</a>
            <a className="wp-nav-link">My List</a>
            <a className="wp-nav-link">Browse by Languages</a>
            <div className="wp-nav-pill">
              <span className="wp-new-tag">NEW</span>
              Watch Party
            </div>
          </div>
        </div>
        <div className="wp-nav-right">
          <SearchIcon />
          <BellIcon />
          <div className="wp-profile-square" />
          {/* back button — dev convenience */}
          {onBack && (
            <button className="wp-back-btn" onClick={onBack}>← Entry</button>
          )}
        </div>
      </nav>

      {/* ── Body (main + sidebar) ── */}
      <div className="wp-body">

        {/* ── Main content ── */}
        <main className="wp-main">
          {/* Breadcrumb */}
          <div className="wp-breadcrumb">
            <div className="wp-n-logo" />
            <span className="wp-bc-watch">Watch Party</span>
            <span className="wp-bc-sep">·</span>
            <span className="wp-bc-crew">The crew</span>
            <span className="wp-bc-sep">·</span>
            <PeopleIcon />
            <span className="wp-bc-count">8</span>
          </div>

          {/* Title */}
          <h1 className="wp-title">What do you want to watch?</h1>
          <p className="wp-subtitle">Add your picks to the list and vote for what we watch together</p>

          {/* Search + view toggle */}
          <div className="wp-search-row">
            <div className="wp-search-bar" onClick={() => setIsSearchOpen(true)}>
              <PlusIcon />
              <input
                className="wp-search-input"
                type="text"
                placeholder="Add a movie, show or episode (e.g. Stranger Things, Interstellar)"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setIsSearchOpen(true)
                }}
                onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
              />
            </div>
            <div className="wp-view-toggle">
              <button className="wp-view-btn wp-view-active"><GridIcon /></button>
              <button className="wp-view-btn"><ListIcon /></button>
            </div>
          </div>

          {/* Titles Added grid — stays in place and dims behind the search overlay */}
          <div className="wp-grid-section">
            <div className="wp-titles-header">
              <span className="wp-titles-label">Titles Added</span>
              <span className="wp-titles-count">{movies.length}</span>
            </div>
            <div className="wp-grid">
              {movies.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>

            {/* Search overlay — floats above the (dimmed) grid */}
            {isSearchOpen && (
              <div className="wp-search-overlay-panel">
                <div className="wp-titles-header">
                  <span className="wp-titles-label">{trimmedQuery ? 'Search Results' : 'Trending'}</span>
                  <span className="wp-titles-count">{overlayResults.length}</span>
                  <button className="wp-search-close-btn" onClick={closeSearch} aria-label="Close search">✕</button>
                </div>
                <div className="wp-grid">
                  {overlayResults.map(item => (
                    <SearchResultCard
                      key={item.title}
                      item={item}
                      added={addedTitles.includes(item.title)}
                      onAdd={() => handleAddToVote(item)}
                    />
                  ))}
                  {showCustomAdd && (
                    <CustomAddCard
                      query={trimmedQuery}
                      imgUrl={customImgUrl}
                      onImgUrlChange={setCustomImgUrl}
                      onAdd={handleCustomAdd}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ── Sidebar ── */}
        <aside className="wp-sidebar">
         <WatchPartySidebar onPlayTopChoice={() => navigate('/reaction-screen')} people={PEOPLE} messages={watchingPageMessages} activeTab={activeTab} onTabChange={setActiveTab} />
          {/* Currently Leading */}
          <div className="wp-leading-section">
            <h4 className="wp-leading-title">Currently Leading</h4>
            <div className="wp-leading-card">
              <div
                className="wp-leading-thumb"
                style={{ backgroundImage: `url(${AVATAR_IMGS.friends_thumb})` }}
              />
              <div className="wp-leading-info">
                <span className="wp-leading-name">FRIENDS</span>
                <span className="wp-leading-votes">
                  <UpArrowIcon /> 8 Votes
                </span>
              </div>
            </div>
          </div>

          {/* Play button */}
          <button className="wp-play-btn" onClick={() => navigate('/reaction-screen')}>
            <PlayIcon />
            Play top choice
          </button>
          <p className="wp-play-note">Host will play when everyone is ready</p>
        </aside>
      </div>
    </div>
  )
}