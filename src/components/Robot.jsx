export default function Robot({ className = '' }) {
  return (
    <svg className={`robot ${className}`} viewBox="0 0 200 220" role="img" aria-label="Maskot robot OSI">
      <defs>
        <linearGradient id="rb-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2540" />
          <stop offset="1" stopColor="#0a0f1c" />
        </linearGradient>
        <linearGradient id="rb-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset=".5" stopColor="#4d7cff" />
          <stop offset="1" stopColor="#c05cff" />
        </linearGradient>
        <filter id="rb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="robot-float">
        {/* antena */}
        <path d="M100 38V16" stroke="url(#rb-edge)" strokeWidth="4" strokeLinecap="round" />
        <circle className="robot-ant" cx="100" cy="12" r="6" fill="#ffd60a" filter="url(#rb-glow)" />

        {/* telinga */}
        <rect x="22" y="76" width="14" height="38" rx="6" fill="url(#rb-edge)" opacity=".85" />
        <rect x="164" y="76" width="14" height="38" rx="6" fill="url(#rb-edge)" opacity=".85" />

        {/* kepala */}
        <rect x="34" y="38" width="132" height="102" rx="30" fill="url(#rb-body)" stroke="url(#rb-edge)" strokeWidth="3" />
        <rect x="48" y="54" width="104" height="66" rx="20" fill="#05070d" stroke="rgba(120,160,255,.25)" />

        {/* mata */}
        <g className="robot-eyes" filter="url(#rb-glow)">
          <rect x="66" y="74" width="26" height="26" rx="9" fill="#22d3ee" />
          <rect x="108" y="74" width="26" height="26" rx="9" fill="#c05cff" />
        </g>

        {/* mulut: bar sinyal */}
        <g className="robot-mouth" fill="#2bff88">
          <rect x="78" y="108" width="6" height="6" rx="2" />
          <rect x="88" y="106" width="6" height="10" rx="2" />
          <rect x="98" y="104" width="6" height="14" rx="2" />
          <rect x="108" y="106" width="6" height="10" rx="2" />
          <rect x="118" y="108" width="6" height="6" rx="2" />
        </g>

        {/* leher + badan */}
        <rect x="88" y="140" width="24" height="12" rx="3" fill="#1b2540" />
        <rect x="52" y="152" width="96" height="56" rx="22" fill="url(#rb-body)" stroke="url(#rb-edge)" strokeWidth="3" />
        <g className="robot-core">
          <circle cx="100" cy="180" r="12" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
          <circle cx="100" cy="180" r="5" fill="#22d3ee" filter="url(#rb-glow)" />
        </g>
        <path d="M66 168h14M120 168h14M66 192h14M120 192h14" stroke="rgba(120,160,255,.45)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}
