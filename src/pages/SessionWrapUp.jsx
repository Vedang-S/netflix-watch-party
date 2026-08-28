import { useState } from 'react'
import WatchPartySidebar from '../components/WatchPartySidebar'
import './SessionWrapUp.css'

/* ─── Image URLs (all valid Figma exports) ────────────────── */
const IMGS = {
  /* avatars */
  you:      'https://s3-alpha-sig.figma.com/img/0bde/0426/1a9be8954dd84bcd7817f414e18f86ba?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p~6J8YTvbpTGztFsQqX3L2U4UJCVJwGw~pL8k-y3l6pb5jsxLCRBM9IzsJDK6kqi0CxQdnDo4GuNNcMj9KnVCoRGMqTZesXlPwbhiHsp6iy22x8iWdWa~vsiBrvOs7h5GR8kuyKEkPtZrwcH4fAwz1w3bXq6ng94w7iFdOODRp8qnL0Y1jJSTgKIFKLEGoLNLg8MCBG4i8lvErb2RrTq3PcEDU~ab0SG4OGFGVzzzhSamwAEdMsLwvw1kcEtv427lZ~tkn0YUIVJKxRVv8rIAqN6l3QlJVB1A4oritPYbn0nOFXnyQvl12GY80P7LcuMwvYnjNoK3SZ1B9oPLusgXA__',
  rohan:    'https://s3-alpha-sig.figma.com/img/65a9/0947/c89f362d70b4b3dadcd8d0e2ce863ca2?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gixBmjZwGaVf2bt-KJLd9snoAgygsEH4CmCQN-wLs7xtcFqsHDjZ1iJ4erAcMSvj2u8hsrlAlBlghazSsMUQhd6wQM9uLPUYyx~Lv89Vdo72On1rJAaTqtzaUsU7cnjPho6lv0-bhk5t3Z982S0W0uT8-RPkvCO~-etWXDRniHOxXqT1qjHroudKw3z49ezrqakqTbQzvlnUoO~tsT0Zyhw2Fgn9xislcUw9ifIOFdEqyOx47UehP~p5Tu7wy1QUbid1DLLLSR7npV-dsYOXYKvC-KJpL48QFy4qvMyPml3OXIGb7wdpmu5YljQzIdbMqAC--A2aNz49RRBvD6mTNA__',
  nancy:    'https://s3-alpha-sig.figma.com/img/eb9a/a245/6c7c5a67da7d762e55ac7ad96d7f9f12?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XFG-Ez4Kf3hF0KGQ85mikTQRtNaTY7RVKmBB0zS2v9OBW-WhPxatwz~2VnzfGyTSCqTzLo5iK6PNb0lvFBd5njGhdE3XwJSz-cFY4F9uL4HeKCntjLY8I4s5SdTxZFFGjJAmlvkSTbC~sLNc9NT1nUYsLtcCFoNgyLzHdEc3MVYfQTS7TFVWCJY8vv4ESSZIrjUgvBrj70mjexEztG7ejaJRtc8E9egMCyDzgdoX21jNsP5hl~V1M5Q8K6DoS2ZxZmiUq0E6WFPQ7YP43hsjbULNGqhE1X2du~HLDetPsr0eeTQvH6usFWjJ9D-fAOFyuRENl4EtaDGlKzuXQ-jIVQ__',
  graffica: 'https://s3-alpha-sig.figma.com/img/c4a9/cb98/b78bc216582ee4cd2602bd9d78c3f57e?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qgbEKjBxWbny3d2tMgUQDA74H1IP5EQx4BuEDvslUflzSJYOA6CPsR-ZEZjAcHldozc6fZo7gPOOjThuLWqKGhQwniY-K7CBNLbwMaqRTLYAU1-svtNFXZOsigpiFi0GQc0GTwo9Z6CqNwPsGFaFxVyryCcBOHn4tlo3s0B5y4kMXpoT~b2k9LvaV1UBGRBhzAf3~opq~VAS9XV1doFBS6yZ1dOhfEnPmGKtkjzUNg7R0kRZ-uNRFNpHth-1p7u-S-Epk4Vb6-PmvkCa52l-GJhaWwE8YGI3zlAnQtQxKjKBxIkttYouU2InaD8U7jfNgFRKuvWiPRtX1hMam8EwSw__',
  /* trailblazer = rohan avatar (same person in design) */
  trailblazer: 'https://s3-alpha-sig.figma.com/img/65a9/0947/c89f362d70b4b3dadcd8d0e2ce863ca2?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gixBmjZwGaVf2bt-KJLd9snoAgygsEH4CmCQN-wLs7xtcFqsHDjZ1iJ4erAcMSvj2u8hsrlAlBlghazSsMUQhd6wQM9uLPUYyx~Lv89Vdo72On1rJAaTqtzaUsU7cnjPho6lv0-bhk5t3Z982S0W0uT8-RPkvCO~-etWXDRniHOxXqT1qjHroudKw3z49ezrqakqTbQzvlnUoO~tsT0Zyhw2Fgn9xislcUw9ifIOFdEqyOx47UehP~p5Tu7wy1QUbid1DLLLSR7npV-dsYOXYKvC-KJpL48QFy4qvMyPml3OXIGb7wdpmu5YljQzIdbMqAC--A2aNz49RRBvD6mTNA__',
  /* Friends episode thumbnail */
  friends: 'https://s3-alpha-sig.figma.com/img/d911/57a5/42850c33558e70a8e53a68f1ae7b9467?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lWuSbObqbStiPSQcEzE-EfLyv1b4xLBpznjdqsHwPLU1REej7MzV9IqWUXUS073e3ptlygV80IV07cpMQmmBvnIe7l5vGUmB3NgK0q67tY6cKPx-dqZXmTP~Gjlfcyn7GDLgyqld63ynMfYJIH3CqU2fxIp1OUBI~QIki~AZJkxm84hgRAnWrWETAifuIU-b~z5DusdRyWMB4fLhtZjJQLJ9p67Qu5OQKGNE13C1~LOG1zVuxFH79VT4H6SUpCVr9id-3iWBSFAMsbyUqYqifUzu8gB8XNFG7OJjg2czQaFBe9OOztKqz8XVJ0GVXtdKdyGvBT-W1Ve93VPUzsrP~w__',
  /* Sidebar "What's next" thumbnails — reuse working WatchingPage URLs */
  lastofus:     'https://s3-alpha-sig.figma.com/img/ed0b/cdc8/a7d0b81f9c902765209fdc86add448dc?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AxaiS0ruSbh3mHKfB9kK1JF5KFPlNQ7KKHTh-ZM9a3BDORsLR-i2nRZCs-dg84aYQ4sRjMZ3XWjC1E5LZ555ykgc7cW1uqX7A5epbELl9CQqXttcw1p~EjbwXOTDDfHuPv7lv18I9l3r7DFSuWoSrqPJarFXufxiZakO-fkPqmPeKaROCP0~etfIaOwHOrpOj4o8U9YaS2bTY2VXJ1KSnd2nplWomobNi0SyBN58QK31ev2BjAy3qxH0UvXZlq6XwfYACUjRPMachFjb6dZXMa53nL7ZoPu-ar6HVrx29QhOBZhfymEjRWiw1U1ZPNVC2bB~4yqaYFFOfj~5Y348VA__',
  manifest:     'https://s3-alpha-sig.figma.com/img/f6b6/ae35/fd35869c89aa790d186cf2094a3d2d12?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a90P2rmtECObWLzvSkPDC3lwxF-NRa7vwyyMOPj9deivT89zl5qAneDcZaI0jzQUWEC-W7GnZoLahFLOE0LBuBDlZljgMHuITdVrUDdJTf1BQxmeH8kR4A1P1KeNZbgnVrpaGyuHljzIVJ6TWbXJBkhqTXdExjl8MFXkkxa1p68i~F4q~frX3mM2gwwjAhQPtcv-aG-9cSjJutgkh6E8Xv~QRgSF~h51TcEig3wRIeFDjkiOvY~PbyE6rin6VCQZ6Ykl0TKGrQK9-fTKPP5vkU25AzgYRBXop3u0EHiFagRg7FDvNEkU~SY0LWBf0Y7TwB-aT0RQPwrVksWmaQcupA__',
  nobody:       'https://s3-alpha-sig.figma.com/img/e0db/f4ba/8b5014fbbc76fca7c9afd5d52f018bb8?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QGQVEqQA4cdXjz2ey6pGxD3Kn2ftjLTJnxPkjwvBMwlSNm63Psg6E77jkAaGkt0uFjWei02h4gUAXaVg6NuyvFKnNgCi6EMJlWLPgqzNlLrPQ~LxaFr2fxoeAvufw6-fJK0u-NddDDSw8paA0CWofxJuKmAgQYxrHAQ~wbx3pwE6Wue~fNAlSX0D39rHH370syiEEWhTqsvI-JgtaQMQFazwA5jVT5zkL-9MfxYVo1WsjXSwfdLQheUe8DyTW0h4Nqbuwrmzwc2dDFCMMI5hzJY5Ik6WMhpDz7UDjfVZ-ZoT6tMqKwl6NKUAsiKPRxuLjZChpTypPSE-VrZkal~~3A__',
  littlethings: 'https://s3-alpha-sig.figma.com/img/739b/19c5/ba7ba99e721768aa7da19feceb1b2e61?Expires=1788739200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t2vTZgz7LM-fMb8f4mwzbEijdXjAta519zkIsUJV5lT6ihdf5aIdOK2ZJ6J8G5Cv4TSQOioWerH7Xo8Ca5R4TGYinJefYIN57Hm1KHCMuKfSlU6S8u3~4IM2QhWG02Al42iFhprJp6VSQXnW2n1LkwKHKLy2Yg5YnyTLkoDituHdK6547p~vMvPP3YAfkkI-uO8DvCPtn0DedPVIThjpqGUnOAIwb6yEzV59HRe2ek-VtMrCLVcFi7Zx0XH-~RoigftS3dyM5Oo3zrm5-b7pOiP3xvb5w4ZzfH0RnubdJjLlgkvrOTWfqb4oC9DvP8w4BJZkxxmygezQKxB~TnyIbg__',
}

/* ─── Data ────────────────────────────────────────────────── */
const CREW = [
  { id: 1, name: 'You(Khushboo)', imgKey: 'you',      micMuted: false, isYou: true  },
  { id: 2, name: 'Nancy',         imgKey: 'nancy',    micMuted: true,  color: '#9b6fa3' },
  { id: 3, name: 'Rohan',         imgKey: 'rohan',    micMuted: false                   },
  { id: 4, name: 'Graffica',      imgKey: 'graffica', micMuted: true                    },
  { id: 5, name: 'Akshat',        imgKey: null,       micMuted: false, color: '#c8a830' },
  { id: 6, name: 'Arpit',         imgKey: null,       micMuted: true,  color: '#5A6B8A' },
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
  { id: 1, title: 'The Last of Us',   episode: 'S1:E1', imgKey: 'lastofus'     },
  { id: 2, title: 'Manifest',          episode: 'S3:E1', imgKey: 'manifest'     },
  { id: 3, title: 'Nobody wants this', episode: 'S3:E1', imgKey: 'nobody'       },
  { id: 4, title: 'Little Things',     episode: 'S3:E1', imgKey: 'littlethings' },
]

/* ─── People / Chat sidebar demo data ────────────────────────
   Note: no source images were provided for Akshat/Arpit/John/Meera,
   so they fall back to WatchPartySidebar's initials avatar. */
const SIDEBAR_PEOPLE = [
  { id: 1, name: 'You(Khushboo)', avatar: IMGS.you,      isHost: true },
  { id: 2, name: 'Nancy',         avatar: IMGS.nancy   },
  { id: 3, name: 'Rohan',         avatar: IMGS.rohan   },
  { id: 4, name: 'Graffica',      avatar: IMGS.graffica},
  { id: 5, name: 'Akshat' },
  { id: 6, name: 'Arpit'  },
  { id: 7, name: 'John'   },
  { id: 8, name: 'Meera'  },
]

const INITIAL_CHAT_MESSAGES = [
  { id: 1,  sender: 'Rohan',    name: 'Rohan',    avatar: IMGS.rohan,    text: 'Hey guyz!' },
  { id: 2,  sender: 'Nancy',    name: 'Nancy',    avatar: IMGS.nancy,    text: "What's up?" },
  { id: 3,  isYou: true,        name: 'You(Khushboo)', avatar: IMGS.you, text: 'Are you all enjoying?' },
  { id: 4,  sender: 'Graffica', name: 'Graffica', avatar: IMGS.graffica,text: 'for sure' },
  { id: 5,  sender: 'Akshat',   name: 'Akshat',   text: 'Yeah! All time fav series' },
  { id: 6,  sender: 'Rohan',    name: 'Rohan',    avatar: IMGS.rohan,    text: "y'all noticed that?" },
  { id: 7,  sender: 'John',     name: 'John',     text: 'yeah! Epic man' },
  { id: 8,  sender: 'Graffica', name: 'Graffica', avatar: IMGS.graffica,text: 'Craxyyy if!' },
  { id: 9,  isYou: true,        name: 'You(Khushboo)', avatar: IMGS.you, text: "Who's your fav character?" },
  { id: 10, sender: 'Akshat',   name: 'Akshat',   text: 'hmmmm, all i guess' },
  { id: 11, sender: 'Rohan',    name: 'Rohan',    avatar: IMGS.rohan,    text: 'sleepy rn!!!' },
]

/* ─── Icons ───────────────────────────────────────────────── */
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M5 10a7 7 0 0 1 14 0v4l2 2H3l2-2v-4Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M10 19a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.8"/>
  </svg>
)

const ChevronIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M1 1l5 5 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const PeopleIcon = () => (
  <svg width="13" height="12" viewBox="0 0 14 12" fill="none">
    <circle cx="5" cy="3.5" r="2.5" fill="#aaa"/>
    <path d="M0 11c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="#aaa"/>
    <circle cx="11" cy="3.5" r="2" fill="#aaa"/>
    <path d="M13 11c0-1.66-.9-3.11-2.24-3.87" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="1.8"/>
    <polyline points="12 6 12 12 16 14.5" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ReactionStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22 11v1a10 10 0 1 1-9-10" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="9" y1="9" x2="9.01" y2="9" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="15" y1="9" x2="15.01" y2="9" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M16 5h6M19 2v6" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const MessageStatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" stroke="#aaa" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 9H3a1 1 0 0 1-1-1V5h4M18 9h3a1 1 0 0 0 1-1V5h-4" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 2h12v8a6 6 0 0 1-12 0V2z" stroke="#aaa" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 16v4M9 20h6" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const MicOnIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="white" strokeWidth="1.8"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const MicOffIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M1 1l22 22M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12v-2m14 0v-2M12 19v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const MicToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="white" strokeWidth="1.8"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8"  y1="23" x2="16" y2="23" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const CamToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M23 7l-7 5 7 5V7z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
    <rect x="1" y="5" width="15" height="14" rx="2" stroke="white" strokeWidth="1.8"/>
  </svg>
)

const EmojiToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1" fill="white"/>
    <circle cx="15" cy="10" r="1" fill="white"/>
  </svg>
)

const CastToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="2" cy="20" r="1" fill="white"/>
  </svg>
)

const ExitToolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#E50914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16 17 21 12 16 7" stroke="#E50914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke="#E50914" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const ChatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
)

const DownloadRecapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7 10 12 15 17 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
)

const CrewCrownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#E50914">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
)

const ClapIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="M9.5 8.5l-1.2-3a1.3 1.3 0 0 0-2.4 1l1.7 4.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.7 8l-1-3.3a1.3 1.3 0 0 0-2.5.8l1 3.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 7.6l-.4-2.9a1.3 1.3 0 0 0-2.6.3l.3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.2 8.4l.7-1.5a1.3 1.3 0 0 1 2.3 1.3l-2.4 5c-1 2-2.7 3.3-4.9 3.3-3 0-5.3-1.6-6.4-3.8l-1.4-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 4.8L4 5.7M4.3 2l.6 1.6M7.2 1.6L6.7 3.2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M21.5 4.8L20 5.7M19.7 2l-.6 1.6M16.8 1.6l.5 1.6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

/* ─── Avatar helper ───────────────────────────────────────── */
function Ava({ person, size = 54 }) {
  if (person.imgKey && IMGS[person.imgKey]) {
    return (
      <img
        src={IMGS[person.imgKey]}
        alt={person.name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      />
    )
  }
  const initials = (person.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: person.color || '#555',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

/* ─── Stat Card ──────────────────────────────────────────── */
const STAT_ICONS = {
  clock:    <ClockIcon />,
  reaction: <ReactionStatIcon />,
  message:  <MessageStatIcon />,
  trophy:   <TrophyIcon />,
}

function StatCard({ stat }) {
  return (
    <div className="sw-stat-card">
      <div className="sw-stat-top">
        {STAT_ICONS[stat.icon]}
        <span className="sw-stat-label">{stat.label}</span>
      </div>
      {stat.isAvatar ? (
        <img src={IMGS.trailblazer} alt="Trailblazer" className="sw-stat-avatar" />
      ) : (
        <div className="sw-stat-bottom">
          <span className="sw-stat-value">{stat.value}</span>
          <span className="sw-stat-sub">{stat.sub}</span>
        </div>
      )}
    </div>
  )
}

/* ─── Crew Tile ──────────────────────────────────────────── */
function CrewTile({ m }) {
  return (
    <div className={`sw-crew-tile${m.isYou ? ' sw-crew-you' : ''}`}>
      {m.isYou && <span className="sw-host-badge"><CrewCrownIcon /></span>}
      {!m.isYou && (
        <span className="sw-mic-badge">
          {m.micMuted ? <MicOffIcon /> : <MicOnIcon />}
        </span>
      )}
      <Ava person={m} size={64} />
      <span className="sw-crew-name">{m.name}</span>
    </div>
  )
}

/* ─── Main ────────────────────────────────────────────────── */
export default function SessionWrapUp({ onBack }) {
  const [added, setAdded] = useState({})
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES)

  const handleSendMessage = (text) => {
    setChatMessages(prev => [
      ...prev,
      { id: prev.length + 1, isYou: true, name: 'You(Khushboo)', avatar: IMGS.you, text },
    ])
  }

  return (
    <div className="sw-root">

      {/* Navbar */}
      <nav className="sw-navbar">
        <div className="sw-nav-left">
          <div className="sw-netflix-logo">NETFLIX</div>
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
          <BellIcon />
          <div className="sw-profile-sq" />
          <ChevronIcon />
          {onBack && <button className="sw-back-btn" onClick={onBack}>← Back</button>}
        </div>
      </nav>

      {/* Body */}
      <div className="sw-body">

        {/* ── Main ── */}
        <main className="sw-main">

          {/* Breadcrumb */}
          <div className="sw-breadcrumb">
            <span className="sw-bc-n">N</span>
            <span className="sw-bc-title">Watch Party</span>
            <span className="sw-bc-crew">The crew</span>
            <span className="sw-bc-dot">·</span>
            <PeopleIcon />
            <span className="sw-bc-count">8</span>
          </div>

          {/* Heading */}
          <h1 className="sw-page-title">Party ended <span>🎉</span></h1>

          {/* Summary row */}
          <div className="sw-summary-row">

            {/* Movie card */}
            <div className="sw-movie-card">
              <img src={IMGS.friends} alt="Friends" className="sw-movie-img" />
              <div className="sw-movie-inner">
                <div className="sw-movie-logo-area">
                  <div className="sw-movie-title-txt">F R I E N D S</div>
                </div>
                <div className="sw-movie-info">
                  <div className="sw-movie-watched">Watched together</div>
                  <div className="sw-movie-ep">S1:E1 Pilot</div>
                </div>
              </div>
            </div>

            {/* Stats + reactions */}
            <div className="sw-stats-col">
              <p className="sw-section-title">How it went</p>
              <div className="sw-stats-row">
                {STATS.map((s, i) => <StatCard key={i} stat={s} />)}
              </div>

              <p className="sw-section-title sw-section-title--gap">Top reactions</p>
              <div className="sw-reactions-row">
                {TOP_REACTIONS.map((r, i) => (
                  <div key={i} className="sw-reaction-chip">
                    <span className="sw-chip-emoji">{r.emoji}</span>
                    <span className="sw-chip-count">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crew */}
          <h2 className="sw-crew-title">The crew</h2>
          <div className="sw-crew-row">
            {CREW.map(m => <CrewTile key={m.id} m={m} />)}
          </div>

          {/* Toolbar */}
          <div className="sw-toolbar">
            <button className="sw-tool-btn"><MicToolIcon /></button>
            <button className="sw-tool-btn"><CamToolIcon /></button>
            <button className="sw-tool-btn"><EmojiToolIcon /></button>
            <button className="sw-tool-btn"><CastToolIcon /></button>
            <button className="sw-tool-btn sw-tool-exit"><ExitToolIcon /></button>
          </div>

          {/* Action buttons */}
          <div className="sw-action-row">
            <button className="sw-action-btn sw-btn-dark" onClick={() => setChatOpen(true)}>
              <ChatIcon /><span>Chat</span>
            </button>
            <button className="sw-action-btn sw-btn-dark">
              <DownloadRecapIcon /><span>Download recap</span>
            </button>
            <button className="sw-action-btn sw-btn-red">
              <PlayIcon /><span>Play Next Voted</span>
            </button>
          </div>

        </main>

        {/* ── Sidebar ── */}
        {chatOpen ? (
          <div className="sw-sidebar-wrap">
            <WatchPartySidebar
              isOpen
              initialTab="chat"
              people={SIDEBAR_PEOPLE}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onClose={() => setChatOpen(false)}
            />
          </div>
        ) : (
          <aside className="sw-sidebar">

            {/* Thanks */}
            <div className="sw-thanks">
              <div className="sw-clap"><ClapIcon /></div>
              <p className="sw-thanks-title">Thanks for watching together!</p>
              <p className="sw-thanks-sub">Until next time</p>
            </div>

            {/* End session */}
            <button className="sw-end-btn">
              <DownloadRecapIcon />
              <span>End session for everyone</span>
            </button>

            <div className="sw-divider" />

            {/* What's next */}
            <div className="sw-next-header">
              <p className="sw-next-title">What's next?</p>
              <p className="sw-next-sub">Add to the queue or start a new vote</p>
            </div>

            <div className="sw-next-list">
              {WHATS_NEXT.map(item => (
                <div key={item.id} className="sw-next-item">
                  <div className="sw-next-thumb-wrap">
                    <div className="sw-next-n-badge">N</div>
                    <img src={IMGS[item.imgKey]} alt={item.title} className="sw-next-thumb" />
                  </div>
                  <div className="sw-next-info">
                    <span className="sw-next-show-title">{item.title}</span>
                    <span className="sw-next-episode">{item.episode}</span>
                  </div>
                  <button
                    className={`sw-add-btn${added[item.id] ? ' sw-added' : ''}`}
                    onClick={() => setAdded(p => ({ ...p, [item.id]: true }))}
                    aria-label={`Add ${item.title}`}
                  >
                    {added[item.id] ? '✓' : <PlusIcon />}
                  </button>
                </div>
              ))}
            </div>

            {/* Start a new vote */}
            <div className="sw-vote-wrap">
              <button className="sw-vote-btn">Start a new vote</button>
            </div>

          </aside>
        )}
      </div>
    </div>
  )
}