import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { LAYERS } from './data/layersMeta.js'
import Icon from './components/Icons.jsx'
import Home from './pages/Home.jsx'

const pages = {
  1: lazy(() => import('./layers/Layer1Physical.jsx')),
  2: lazy(() => import('./layers/Layer2DataLink.jsx')),
  3: lazy(() => import('./layers/Layer3Network.jsx')),
  4: lazy(() => import('./layers/Layer4Transport.jsx')),
  5: lazy(() => import('./layers/Layer5Session.jsx')),
  6: lazy(() => import('./layers/Layer6Presentation.jsx')),
  7: lazy(() => import('./layers/Layer7Application.jsx')),
}

function parseHash() {
  const m = window.location.hash.match(/^#\/layer\/([1-7])$/)
  return m ? Number(m[1]) : 0
}

function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span />
      <span />
      <span />
      <p>Memuat modul…</p>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash())
      setOpen(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
  }, [open])

  const go = useCallback((n) => {
    window.location.hash = n ? `#/layer/${n}` : '#/'
  }, [])

  const Page = route ? pages[route] : null
  const prev = route > 1 ? LAYERS[route - 2] : null
  const next = route && route < 7 ? LAYERS[route] : null
  const cur = route ? LAYERS[route - 1] : null

  return (
    <div className="app" style={cur ? { '--accent': cur.color } : undefined}>
      <div className="bg" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-orb o1" />
        <div className="bg-orb o2" />
        <div className="bg-orb o3" />
        <div className="bg-scan" />
      </div>

      <header className="topbar">
        <button type="button" className="icon-btn" onClick={() => setOpen(true)} aria-label="Buka menu">
          <Icon name="menu" />
        </button>
        <a className="brand-mini" href="#/">
          <span className="brand-dot" /> OSI Pixel_Detective Lab
        </a>
        {cur ? (
          <span className="topbar-layer" style={{ '--c': cur.color }}>
            L{cur.n}
            <span className="hide-xs"> · {cur.name}</span>
          </span>
        ) : (
          <span />
        )}
      </header>

      <div className={`scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />

      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Menu utama">
        <div className="sidebar-head">
          <a className="brand" href="#/">
            <span className="brand-logo">
              <Icon name="chip" />
            </span>
            <span>
              <b>OSI Pixel_Detective Lab</b>
              <small>7 Layer Model</small>
            </span>
          </a>
          <button type="button" className="icon-btn close" onClick={() => setOpen(false)} aria-label="Tutup menu">
            <Icon name="close" />
          </button>
        </div>

        <nav className="nav">
          <a href="#/" className={`nav-item home ${route === 0 ? 'active' : ''}`} style={{ '--c': '34 211 238' }}>
            <span className="nav-ico">
              <Icon name="home" />
            </span>
            <span className="nav-text">
              <b>Beranda</b>
              <small>Ringkasan & simulator</small>
            </span>
          </a>
          <p className="nav-label">Layer OSI</p>
          {[...LAYERS].reverse().map((l) => (
            <a
              key={l.n}
              href={`#/layer/${l.n}`}
              className={`nav-item ${route === l.n ? 'active' : ''}`}
              style={{ '--c': l.color }}
              aria-current={route === l.n ? 'page' : undefined}
            >
              <span className="nav-ico">
                <Icon name={String(l.n)} />
              </span>
              <span className="nav-text">
                <b>
                  {l.n}. {l.name}
                </b>
                <small>{l.id}</small>
              </span>
              <span className="nav-pdu">{l.pdu.split(' ')[0]}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-foot">
          <span className="dot" /> Mode gelap · Robot Theme
        </div>
      </aside>

      <main className="main">
        <Suspense fallback={<Loader />}>
          <div key={route} className="page-enter">
            {Page ? <Page /> : <Home go={go} />}
          </div>
        </Suspense>

        {cur && (
          <nav className="pager" aria-label="Navigasi layer">
            {prev ? (
              <a href={`#/layer/${prev.n}`} className="pager-link" style={{ '--c': prev.color }}>
                <Icon name="arrowL" />
                <span>
                  <small>Sebelumnya</small>
                  Layer {prev.n} · {prev.name}
                </span>
              </a>
            ) : (
              <a href="#/" className="pager-link" style={{ '--c': '34 211 238' }}>
                <Icon name="arrowL" />
                <span>
                  <small>Kembali</small>
                  Beranda
                </span>
              </a>
            )}
            {next ? (
              <a href={`#/layer/${next.n}`} className="pager-link right" style={{ '--c': next.color }}>
                <span>
                  <small>Selanjutnya</small>
                  Layer {next.n} · {next.name}
                </span>
                <Icon name="arrowR" />
              </a>
            ) : (
              <a href="#/" className="pager-link right" style={{ '--c': '34 211 238' }}>
                <span>
                  <small>Selesai</small>
                  Kembali ke Beranda
                </span>
                <Icon name="arrowR" />
              </a>
            )}
          </nav>
        )}

        <footer className="footer">© {new Date().getFullYear()} OSI Pixel_Detective Lab — belajar jaringan dengan cara yang menyenangkan.</footer>
      </main>
    </div>
  )
}
