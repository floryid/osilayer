import { useEffect, useState } from 'react'
import { LAYERS } from '../data/layersMeta.js'
import Icon from './Icons.jsx'

export default function Simulator() {
  const [msg, setMsg] = useState('GET /index.html')
  const [step, setStep] = useState(-1) // -1 idle, 0-6 enkapsulasi, 7 kabel, 8-14 dekapsulasi
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return undefined
    const id = setTimeout(() => {
      setStep((s) => {
        if (s >= 14) {
          setPlaying(false)
          return s
        }
        return s + 1
      })
    }, 1500)
    return () => clearTimeout(id)
  }, [playing, step])

  const phase = step < 0 ? 'idle' : step <= 6 ? 'send' : step === 7 ? 'wire' : 'recv'
  const activeLayer = phase === 'send' ? 7 - step : phase === 'recv' ? step - 7 : phase === 'wire' ? 1 : 0
  // lapisan terluar (nomor terkecil) yang sedang membungkus data
  const lowest = phase === 'send' ? 7 - step : phase === 'wire' ? 1 : phase === 'recv' ? step - 6 : 8
  const current = LAYERS[activeLayer - 1]

  const start = () => {
    if (step >= 14 || step < 0) setStep(0)
    setPlaying(true)
  }
  const next = () => {
    setPlaying(false)
    setStep((s) => Math.min(s + 1, 14))
  }
  const reset = () => {
    setPlaying(false)
    setStep(-1)
  }

  let packet = <div className="sim-core">{msg || '(kosong)'}</div>
  for (let n = 7; n >= lowest && n >= 1; n -= 1) {
    const L = LAYERS[n - 1]
    packet = (
      <div className={`sim-shell ${n === activeLayer ? 'is-active' : ''}`} style={{ '--c': L.color }}>
        <span className="sim-shell-label">
          L{n} · {L.header}
        </span>
        {packet}
      </div>
    )
  }

  const status =
    phase === 'idle'
      ? 'Tekan Mulai untuk melihat bagaimana pesan dibungkus (enkapsulasi) di pengirim dan dibuka (dekapsulasi) di penerima.'
      : phase === 'send'
        ? `Pengirim • Layer ${activeLayer} (${current.name}): ${current.encap}`
        : phase === 'wire'
          ? 'Media transmisi: bit dikirim melalui kabel / serat optik / udara menuju penerima.'
          : `Penerima • Layer ${activeLayer} (${current.name}): ${current.decap}`

  const renderColumn = (side) => (
    <ol className={`sim-col ${side}`}>
      {[7, 6, 5, 4, 3, 2, 1].map((n) => {
        const L = LAYERS[n - 1]
        const isActive = activeLayer === n && ((side === 'send' && phase === 'send') || (side === 'recv' && phase === 'recv'))
        const done =
          side === 'send'
            ? phase === 'wire' || phase === 'recv' || (phase === 'send' && n > activeLayer)
            : phase === 'recv' && n < activeLayer
        return (
          <li key={n} className={`${isActive ? 'on' : ''} ${done ? 'done' : ''}`} style={{ '--c': L.color }}>
            <b>{n}</b>
            <span>{L.name}</span>
            <small>{L.pdu}</small>
          </li>
        )
      })}
    </ol>
  )

  return (
    <div className="sim">
      <div className="sim-controls">
        <label className="sim-input">
          <span>Pesan</span>
          <input value={msg} onChange={(e) => setMsg(e.target.value.slice(0, 28))} maxLength={28} disabled={playing} spellCheck="false" />
        </label>
        <div className="sim-btns">
          <button type="button" className="btn primary" onClick={start} disabled={playing}>
            <Icon name="play" /> {step >= 14 ? 'Ulangi' : 'Mulai'}
          </button>
          <button type="button" className="btn ghost" onClick={next} disabled={step >= 14}>
            <Icon name="arrowR" /> Langkah
          </button>
          <button type="button" className="btn ghost" onClick={reset}>
            <Icon name="reset" /> Reset
          </button>
        </div>
      </div>

      <div className="sim-stage">
        <div className="sim-side">
          <h4>Pengirim</h4>
          {renderColumn('send')}
        </div>
        <div className="sim-mid">
          <div className={`sim-packet phase-${phase}`}>{packet}</div>
          <div className={`sim-wire ${phase === 'wire' ? 'live' : ''}`} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="sim-side">
          <h4>Penerima</h4>
          {renderColumn('recv')}
        </div>
      </div>

      <p className="sim-status" key={step} style={current ? { '--c': current.color } : undefined}>
        {status}
      </p>
      <div className="sim-progress" aria-hidden="true">
        <span style={{ width: `${((step + 1) / 15) * 100}%` }} />
      </div>
    </div>
  )
}

