const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const paths = {
  // 1 Physical: kabel + konektor
  1: (
    <>
      <path d="M7 3v5M12 3v5M17 3v5" />
      <rect x="4" y="8" width="16" height="6" rx="2" />
      <path d="M9 14v3a3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3" />
    </>
  ),
  // 2 Data link: switch
  2: (
    <>
      <rect x="2.5" y="8" width="19" height="8" rx="2" />
      <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" strokeWidth="2.6" />
      <path d="M7 8V5M17 8V5M7 16v3M17 16v3" />
    </>
  ),
  // 3 Network: router/globe
  3: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  // 4 Transport: panah dua arah
  4: (
    <>
      <path d="M4 8h14l-3-3M20 16H6l3 3" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  // 5 Session: link / handshake
  5: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  // 6 Presentation: gembok
  6: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15.5" r="1.3" fill="currentColor" />
    </>
  ),
  // 7 Application: jendela
  7: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" strokeWidth="2.4" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  home: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v10h13V10" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowL: <path d="M15 5l-7 7 7 7" />,
  arrowR: <path d="M9 5l7 7-7 7" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  play: <path d="M7 4.5v15l12-7.5z" fill="currentColor" />,
  reset: (
    <>
      <path d="M4 12a8 8 0 1 0 3-6.2" />
      <path d="M4 4v4.5h4.5" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
}

export default function Icon({ name, className = '', style }) {
  return (
    <svg {...base} className={`icon ${className}`} style={style}>
      {paths[name]}
    </svg>
  )
}
