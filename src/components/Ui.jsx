import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-in' : ''} ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export function SectionTitle({ eyebrow, title, icon }) {
  return (
    <div className="section-title">
      <span className="eyebrow">
        {icon && <Icon name={icon} />} {eyebrow}
      </span>
      <h2>{title}</h2>
    </div>
  )
}

function lineClass(line) {
  const t = line.trimStart()
  if (t.startsWith('$ ') || t.startsWith('C:\\>') || t.startsWith('PS>')) return 'cb-cmd'
  if (t.startsWith('#') || t.startsWith('//') || t.startsWith(';')) return 'cb-cmt'
  if (t.startsWith('>>') || t.startsWith('<<') || t.startsWith('→')) return 'cb-arrow'
  return ''
}

export function CodeBlock({ title = 'terminal', text }) {
  const [copied, setCopied] = useState(false)
  const lines = text.replace(/\n$/, '').split('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard tidak tersedia */
    }
  }

  return (
    <div className="codeblock">
      <div className="cb-bar">
        <span className="cb-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="cb-title">{title}</span>
        <button type="button" className="cb-copy" onClick={copy} aria-label="Salin kode">
          <Icon name={copied ? 'check' : 'copy'} />
          <span>{copied ? 'Tersalin' : 'Salin'}</span>
        </button>
      </div>
      <pre>
        <code>
          {lines.map((l, i) => (
            <span key={i} className={`cb-line ${lineClass(l)}`}>
              {l || ' '}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
